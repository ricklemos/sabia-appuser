import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { error } from 'firebase-functions/lib/logger';

admin.initializeApp();

export interface UserRanking {
  userId: string;
  userName: string;
  userScore: number;
}

export interface QuestionnaireTemplate {
  questionnaireId: string;
  questionnaireName: string;
  questions: string[];
  score?: number;
  tentatives?: number;
}

export interface QuestionTemplate {
  questionId: string;
  questionText: string;
  alternatives: Alternative[];
}

export interface Alternative {
  alternativeText: string;
  isRight: boolean;
}

export const createMockupData = functions.https
  .onRequest((req, res) => {
    const users = [
      {
        userId: '01',
        email: 'gmduarte96@gmail.com',
        firstName: 'Gabriel',
        lastName: 'Duarte'
      },
      {
        userId: '02',
        email: 'rick1@teste.com',
        firstName: 'Rick',
        lastName: 'Lemos'
      },
      {
        userId: '03',
        email: 'rick2@teste.com',
        firstName: 'Rick',
        lastName: 'Lemos'
      },
      {
        userId: '04',
        email: 'rick3@teste.com',
        firstName: 'Rick',
        lastName: 'Lemos'
      },
      {
        userId: '05',
        email: 'rick4@teste.com',
        firstName: 'Rick',
        lastName: 'Lemos'
      }
    ];
    const questions = [
      {
        questionId: '01',
        questionText: 'O joão roubou pão?',
        alternatives: [
          {
            alternativeText: 'Sim',
            isRight: true,
          },
          {
            alternativeText: 'Não',
            isRight: false,
          }
        ]
      },
      {
        questionId: '02',
        questionText: 'O rick roubou pão?',
        alternatives: [
          {
            alternativeText: 'Sim',
            isRight: true,
          },
          {
            alternativeText: 'Não',
            isRight: false,
          }
        ]
      }
    ];
    const questionnaireTemplates: QuestionnaireTemplate[] = [
      {
        questionnaireId: '01',
        questionnaireName: 'Teste do Pão',
        questions: ['01', '02']
      },
      {
        questionnaireId: '02',
        questionnaireName: 'Teste do Pão 2',
        questions: ['02', '01']
      }
    ];
    const courseId = '02';
    users.forEach(user => {
      admin.firestore().doc(`/userData/${ user.userId }`)
        .create(user)
        .then(() => res.status(200).send('createUser Succesfully'))
        .catch(err => res.status(500).send(err));
    });
    questionnaireTemplates.forEach((questionnaire: QuestionnaireTemplate) => {
      admin.firestore().doc(`/questionnaireTemplate/${ questionnaire.questionnaireId }`)
        .create(questionnaire)
        .then(() => res.status(200).send('createQuestionnaire Succesfully'))
        .catch(err => res.status(500).send(err));
    });
    questions.forEach((question: QuestionTemplate) => {
      admin.firestore().doc(`/questionTemplate/${ question.questionId }`)
        .create(question)
        .then(() => res.status(200).send('createQuestionSuccesfully'))
        .catch(err => res.status(500).send(err));
    });
    admin.firestore().doc(`/courseTemplate/${ courseId }`)
      .create({
        courseId: '02',
        courseName: 'General Business Program',
        modules: ['01', '02'],
      })
      .then(() => res.send('createClassroom Succesfully'))
      .catch(err => console.log(err));
    admin.firestore().doc(`/moduleTemplate/01`)
      .create({
        moduleId: '01',
        moduleName: 'Renda Fixa',
        lessons: [
          {
            lessonType: 'lesson',
            complete: false,
            lessonId: '01'
          },
          {
            lessonType: 'lesson',
            complete: false,
            lessonId: '02'
          },
          {
            lessonType: 'questionnaire',
            complete: false,
            questionnaireId: '01'
          },
          {
            lessonType: 'questionnaire',
            complete: false,
            questionnaireId: '02'
          }
        ]
      })
      .then(() => res.send('createClassroom Succesfully'))
      .catch(err => console.log(err));
    admin.firestore().doc(`/moduleTemplate/02`)
      .create({
        moduleId: '02',
        moduleName: 'Renda Variável',
        lessons: [{
          lessonType: 'lesson',
          complete: false,
          lessonId: '03'
        },
          {
            lessonType: 'lesson',
            complete: false,
            lessonId: '04'
          }]
      })
      .then(() => res.send('createClassroom Succesfully'))
      .catch(err => console.log(err));
  });

export const createClassroom = functions.https
  .onRequest((req, res) => {
    const classroomId = '02';
    admin.firestore().doc(`/classrooms/${ classroomId }`)
      .create({
        courseId: '02',
        classroomId,
        courseName: 'Renda Fixa',
        classroomName: 'Turma 1',
        institutionName: 'BTC',
        modules: ['01', '02'],
        students: ['gmduarte96@gmail.com', 'rick1@teste.com', 'rick2@teste.com', 'rick3@teste.com', 'rick4@teste.com'],
      })
      .then(() => res.send('createClassroom Succesfully'))
      .catch(err => console.log(err));
  });

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
    if (data) {
      const students = data.students;
      const classroomId = data.classroomId;
      const classroom = data;
      const ranking: UserRanking[] = [];
      students.map((studentEmail: any, index: number) => {
        admin.firestore().collection('userData')
          .where('email', '==', studentEmail).get()
          .then((querySnapshot: any) => {
            querySnapshot.forEach(async (user: any) => {
              const userData = user.data();
              const userId = user.id;
              await admin.firestore().doc(`/enrollments/${ userId + '-' + classroomId }`)
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
                  // Se for o último aluno para cadastro, cria-se o ranking
                  if (index === students.length - 1) {
                    admin.firestore().doc(`/classRankings/${ classroomId }`)
                      .create({
                        courseId: classroom.courseId,
                        courseName: classroom.courseName,
                        classroomName: classroom.classroomName,
                        schoolName: classroom.institutionName,
                        ranking
                      }).then(() => console.log('criou o ranking'));
                  }
                });
            });
          })
          .catch((err: any) => console.log(err));
        return ranking;
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
                // const questions: any = [];
                // questionnaireTemplate.questions.forEach(async (question: any, index: number) => {
                //   await admin.firestore().doc(`questionTemplate/${ question.questionId }`).get()
                //     .then(questionDoc => {
                //       if (questionDoc) {
                //         const questionData = questionDoc.data();
                //         questions.push(questionData);
                //       }
                //       return index, questions;
                //     })
                //     .then((docSnap) => {
                //       console.log(docSnap.index, docSnap.questions);
                //       if (docSnap.index === questionnaireTemplate.questions.length - 1){
                //         admin.firestore().doc(`questionnaireAnswers/${ moduleProgress.userId + '-' + questionnaireId }`)
                //           .create({
                //             userId: moduleProgress.userId,
                //             questionnaireId,
                //             questionnaireName: questionnaireTemplate.questionnaireName,
                //             questions
                //           });
                //       }
                //     });
                // });
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
                  .catch(err => console.log(err));
              } else {
                throw error('questionnaire does not exist');
              }
            }).then((done) => console.log(done)).catch((err) => console.log(err));
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

