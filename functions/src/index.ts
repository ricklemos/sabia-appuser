import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { error } from 'firebase-functions/lib/logger';

admin.initializeApp();

import * as tests from './tests';

export const createMockupData = tests.createMockupData;
export const createClassroom = tests.createClassroom;

export const createEnrollmentWhenCreateOrUpdateClassroom = functions.firestore
  .document('classrooms/{classroomId}')
  .onWrite((change) => {
    const data = change.after.data();
    // Verifica se os dados existem
    if (data) {
      const students = data.students;
      const classroomId = data.classroomId;
      const classroom = data;
      // Cria o Ranking da turma com array vazio
      admin.firestore().doc(`/classRankings/${ classroomId }`)
        .create({
          courseId: classroom.courseId,
          courseName: classroom.courseName,
          classroomName: classroom.classroomName,
          schoolName: classroom.institutionName,
        }).then(() => console.log(`criou o ranking da turma ${ classroomId }`));
      // Itera no array de students dos dados para criar as matrículas de cada aluno
      students.map((studentEmail: any, index: number) => {
        admin.firestore().collection('userData')
          .where('email', '==', studentEmail).get()
          .then((querySnapshot: any) => {
            // Verifica se o usuário existe no userData
            if (!querySnapshot.empty) {
              querySnapshot.forEach((user: any) => {
                const userData = user.data();
                const userId = user.id;
                // Cria o enrollment do aluno
                admin.firestore().doc(`/enrollments/${ userId + '-' + classroomId }`)
                  .create({
                    courseId: classroom.courseId,
                    courseName: classroom.courseName,
                    classroomName: classroom.classroomName,
                    schoolName: classroom.institutionName,
                    score: 0,
                    classroomId,
                    userId,
                  })
                  .then(() => {
                    // Atualiza o ranking com o aluno novo
                    admin.firestore().doc(`/classRankings/${ classroomId }`)
                      .update({
                        ranking: admin.firestore.FieldValue.arrayUnion({
                          userId,
                          userName: userData.firstName + ' ' + userData.lastName,
                          userScore: 0
                        })
                      });
                  })
                  .catch((err) => console.log('erro:', err));
              });
            } else {
              // Aluno não é um usuário (adiciona em users sem conta com pre-enrollment: classroomId)
              admin.firestore().collection('users').doc(studentEmail).set(
                {
                  email: studentEmail,
                  preEnrollments: admin.firestore.FieldValue.arrayUnion(classroomId)
                }
              , {merge: true})
                .then(() => console.log('adicionou um novo usuário'))
                .catch((err) => console.log(err));
            }
          })
          .catch((err: any) => console.log(err));
      });
    } else {
      functions.logger
        .info('Dados da classe não existem', { structuredData: true });
    }
  });

export const createmoduleProgressWhenCreateEnrollment = functions.firestore
  .document('enrollments/{enrollmentId}')
  .onCreate((snap) => {
    const enrollment = snap.data();
    if (enrollment) {
      const userId = enrollment.userId;
      admin.firestore().doc(`courseTemplate/${ enrollment.courseId }`).get()
        .then((query) => {
          const course = query.data();
          if (course) {
            course.modules.forEach((moduleId: string) => {
              admin.firestore().doc(`moduleTemplate/${ moduleId }`).get()
                .then((module) => {
                  const moduleData = module.data();
                  if (moduleData) {
                    admin.firestore().doc(`moduleProgress/${ userId + '-' + moduleData.moduleId }`)
                      .create({
                        userId,
                        moduleId,
                        moduleName: moduleData.moduleName,
                        schoolName: enrollment.schoolName,
                        lessons: moduleData.lessons,
                        score: 0,
                        classroomId: enrollment.classroomId
                      });
                  } else {
                    throw Error('No Module Data');
                  }
                })
                .catch(err => console.log(err));
            });
          } else {
            throw Error('No Course Data');
          }
        })
        .catch(err => console.log(err));
    } else {
      functions.logger
        .info('Dados da matrícula não existem', { structuredData: true });
    }
  });

export const createQuestionnaireAnswerWhenCreateModuleProgress = functions.firestore
  .document('moduleProgress/{moduleProgressId}')
  .onCreate((snap) => {
    const moduleProgress = snap.data();
    if (moduleProgress) {
      const lessons = moduleProgress.lessons;
      lessons.forEach((lesson: any) => {
        if (lesson.lessonType === 'questionnaire') {
          const questionnaireId = lesson.questionnaireId;
          admin.firestore().doc(`questionnaireTemplate/${ questionnaireId }`).get()
            .then(doc => {
              const questionnaireTemplate = doc.data();
              if (questionnaireTemplate) {
                // O "in" limita a query a 10 objetos. Assim, um questionário não pode ter mais de 10 questões.
                admin.firestore().collection('questionTemplate')
                  .where('questionId', 'in', questionnaireTemplate.questions)
                  .get()
                  .then((questionsData) => {
                    const questions: any[] = [];
                    questionsData.docs.forEach(questionDoc => questions.push(questionDoc.data()));
                    admin.firestore().doc(`questionnaireAnswers/${ moduleProgress.userId + '-' + questionnaireId }`)
                      .create({
                        userId: moduleProgress.userId,
                        questionnaireId,
                        questionnaireName: questionnaireTemplate.questionnaireName,
                        questions,
                        classroomId: moduleProgress.classroomId,
                        moduleId: moduleProgress.moduleId
                      });
                  })
                  .catch(err => console.log('erro:', err));
              } else {
                throw error('questionnaire does not exist');
              }
            }).catch((err) => console.log('erro:', err));
        }
      });
    } else {
      functions.logger
        .info('Dados do moduleProgress não existem', { structuredData: true });
    }
  });

// Atualiza o Score do enrollment e do moduleProgress quando termina de responder o questionário pela primeira vez
export const questionnaireUpdated = functions.firestore.document('/questionnaireAnswers/{questionnaireId}')
  .onUpdate((snap) => {
    const data = snap.after.data();
    if (data) {
      const userId = data.userId;
      const classroomId = data.classroomId;
      const moduleId = data.moduleId;
      const score = data.score;
      if (data.tentatives === 1) {
        // Incrementa o valor do score tanto em enrollments quanto no moduleProgress
        admin.firestore().doc(`/enrollments/${ userId + '-' + classroomId }`)
          .update({score: admin.firestore.FieldValue.increment(score)})
          .catch((err) => console.log(err));
        admin.firestore().doc(`/moduleProgress/${ userId + '-' + moduleId }`)
          .update({score: admin.firestore.FieldValue.increment(score)})
          .catch((err) => console.log(err));
      } else {
        console.log('não foi a primeira tentativa');
      }
    } else {
      console.log('data does not exist');
    }
  });

// Atualiza o Score do Ranking quando atualiza o enrollment
export const updateRanking = functions.firestore.document('/enrollments/{enrollmentId}')
  .onUpdate((snap) => {
    const data = snap.after.data();
    if (data) {
      const userId = data.userId;
      const score = data.score;
      const classroomId = data.classroomId;
      admin.firestore().doc(`/classRankings/${ classroomId }`).get()
        .then((doc) => {
          const classRankingData = doc.data();
          if (classRankingData) {
            classRankingData.ranking.map((user: any) => {
              if (user.userId === userId) {
                user.userScore = score;
              }
            });
            return admin.firestore().doc(`/classRankings/${ classroomId }`).update({ ranking: classRankingData.ranking });
          } else {
            console.log('data does not exist');
            return null;
          }
        })
        .catch(err => console.log(err));
    } else {
      console.log('data does not exist');
    }
  });

