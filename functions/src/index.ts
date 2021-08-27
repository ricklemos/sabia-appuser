import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { error } from 'firebase-functions/lib/logger';
import { UserRanking } from './models';

admin.initializeApp();

import * as tests from './tests';

export const createMockupData = tests.createMockupData;
export const createClassroom = tests.createClassroom;


export const createSingleEnrollment = functions.firestore
  .document('classrooms/{classroomId}')
  .onUpdate((change) => {
    const after = change.after.data();
    const before = change.before.data();
    console.log('after', after);
    console.log('before', before);
  });

export const createEnrollmentWhenCreateClassroom = functions.firestore
  .document('classrooms/{classroomId}')
  .onCreate((snap) => {
    const data = snap.data();
    // Verifica se os dados existem
    if (data) {
      const students = data.students;
      const classroomId = data.classroomId;
      const classroom = data;
      const ranking: UserRanking[] = [];
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
                    // Adiciona os dados desse usuário no vetor do ranking
                    ranking.push({
                      userId,
                      userName: userData.firstName + ' ' + userData.lastName,
                      userScore: 0
                    });
                    return ranking;
                  })
                  .then((userRanking) => {
                    // Se for o último aluno para cadastro, cria-se o ranking
                    if (index === students.length - 1) {
                      console.log('ranking final:', userRanking);
                      admin.firestore().doc(`/classRankings/${ classroomId }`)
                        .create({
                          courseId: classroom.courseId,
                          courseName: classroom.courseName,
                          classroomName: classroom.classroomName,
                          schoolName: classroom.institutionName,
                          userRanking
                        }).then(() => console.log('criou o ranking'));
                    }
                  })
                  .catch((err) => console.log('erro:', err));
              });
            } else {
              // Aluno não é um usuário (adiciona em users sem conta)
              admin.firestore().collection('users').add({ email: studentEmail })
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
  })
;

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
                        score: 0
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
                        questions
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

export const questionaryUpdated = functions.firestore.document('/questionnaireAnswers/{questionnaireId}')
  .onUpdate((snap) => {
    const data = snap.after.data();
    if (data) {
      const userId = data.userId;
      const classroomId = data.classroomId;
      const score = data.score;
      if (data.tentatives === 1) {
        admin.firestore().doc(`/enrollments/${ userId + '-' + classroomId }`).get()
          .then((enrollment) => {
            const enrollmentData = enrollment.data();
            if (enrollmentData) {
              const actualScore = enrollmentData.score;
              const newScore = actualScore + score;
              return admin.firestore().doc(`/enrollments/${ userId + '-' + classroomId }`).update({ score: newScore });
            } else {
              return Promise.reject('não há dados');
            }
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      } else {
        console.log('não foi a primeira tentativa');
      }
    } else {
      console.log('data does not exist');
    }
  });

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

