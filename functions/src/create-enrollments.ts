import * as functions from 'firebase-functions';
import { PreEnrollment, UserData } from './models';
import * as admin from 'firebase-admin';
import { firestore } from 'firebase-admin';
import WriteResult = firestore.WriteResult;

// const region = 'southamerica-east1';
const region = 'us-central1';

async function createEnrollmentFromPreEnrollment(preEnrollment: PreEnrollment, userId: string): Promise<WriteResult> {
  return admin.firestore().doc(`/enrollments/${ userId + '-' + preEnrollment.classroomId }`)
    .create({
      courseId: preEnrollment.courseId,
      courseName: preEnrollment.courseName,
      courseDescription: preEnrollment.courseDescription,
      courseLink: preEnrollment.courseLink,
      classroomName: preEnrollment.classroomName,
      institutionName: preEnrollment.institutionName,
      score: 0,
      classroomId: preEnrollment.classroomId,
      userId
    });
}

async function updateRanking(classroomId: string, userData: UserData): Promise<any> {
  const classRankingDoc = await admin.firestore().doc(`/classRankings/${ classroomId }`).get();
  const classRankingData = classRankingDoc?.data() ?? null;
  if (classRankingData) {
    const ranking = classRankingData.ranking;
    const [isInArray] = ranking.filter((user: any) => user.userId === userData.userId);
    if (isInArray) {
      return null;
    } else {
      return admin.firestore().doc(`/classRankings/${ classroomId }`)
        .update({
          ranking: admin.firestore.FieldValue.arrayUnion({
            userId: userData.userId,
            userName: userData.firstName + ' ' + userData.lastName,
            userScore: 0
          })
        });
    }
  } else {
    return null;
  }
}

async function createModuleProgress(moduleTemplate: any, userId: string, enrollment: any): Promise<WriteResult> {
  return admin.firestore().doc(`moduleProgress/${ userId + '-' + moduleTemplate.moduleId }`)
    .create({
      userId,
      moduleId: moduleTemplate.moduleId,
      moduleName: moduleTemplate.moduleName,
      institutionName: enrollment.institutionName,
      lessons: moduleTemplate.lessons,
      score: 0,
      classroomId: enrollment.classroomId,
      moduleProgressPercentage: 0,
      courseId: enrollment.courseId,
    });
}

async function createEnrollmentFromClassroom(classroom: any, userId: string): Promise<WriteResult> {
  return admin.firestore().doc(`/enrollments/${ userId + '-' + classroom.classroomId }`)
    .create({
      courseId: classroom.courseId,
      courseName: classroom.courseName,
      classroomName: classroom.classroomName,
      institutionName: classroom.institutionName,
      courseDescription: classroom.courseDescription,
      courseLink: classroom.courseLink,
      score: 0,
      classroomId: classroom.classroomId,
      userId,
    });
}

async function createQuestionnaire(
  userId: string,
  questionnaireTemplate: any,
  classroomId: string,
  moduleId: string
): Promise<WriteResult> {
  return admin.firestore().doc(`questionnaireAnswers/${ userId + '-' + questionnaireTemplate.questionnaireId }`)
    .create({
      userId,
      questionnaireId: questionnaireTemplate.questionnaireId,
      questionnaireName: questionnaireTemplate.questionnaireName,
      questions: questionnaireTemplate.questions,
      classroomId,
      moduleId
    });
}

export const createEnrollmentWhenCreateUserData = functions.region(region).firestore
  .document('userData/{userId}')
  .onCreate(async (snap) => {
    const userData: UserData = {
      userId: snap.data().userId,
      email: snap.data().email,
      firstName: snap.data().firstName,
      lastName: snap.data().lastName
    };
    const userDoc = await admin.firestore().doc(`users/${ userData.email }`).get();
    const data = userDoc?.data() ?? null;
    if (data !== null) {
      const preEnrollments: PreEnrollment[] = data.preEnrollments;
      const promises: Promise<WriteResult>[] = [];
      preEnrollments.forEach(preEnrollment => {
        const p1 = createEnrollmentFromPreEnrollment(preEnrollment, userData.userId);
        const p2 = updateRanking(preEnrollment.classroomId, userData);
        promises.push(p1, p2);
      });
      const p3 = admin.firestore().doc(`users/${ userData.email }`).delete();
      promises.push(p3);
      return Promise.all(promises);
    } else {
      return null;
    }
  });

export const createEnrollmentsWhenCreateClassroom = functions.region(region).firestore
  .document('classrooms/{classroomId}')
  .onCreate(async (snap) => {
    const data = snap.data();
    // Verifica se os dados existem
    if (data) {
      const students = data.students;
      const classroomId = data.classroomId;
      const classroom = data;
      const promises = [];
      // Cria o Ranking da turma com array vazio
      const createClassRanking = await admin.firestore().doc(`/classRankings/${ classroomId }`)
        .create({
          classroomId,
          courseId: classroom.courseId,
          courseName: classroom.courseName,
          classroomName: classroom.classroomName,
          institutionName: classroom.institutionName,
          ranking: []
        }).then(() => console.log(`criou o ranking da turma ${ classroomId }`));
      promises.push(createClassRanking);
      // Itera no array de students dos dados para criar as matrículas de cada aluno
      students.map((studentEmail: string) => {
        admin.firestore().collection('userData')
          .where('email', '==', studentEmail).get()
          .then((querySnapshot: any) => {
            // Verifica se o usuário existe no userData
            if (!querySnapshot.empty) {
              querySnapshot.forEach((user: any) => {
                const userData = user.data();
                const userId = user.id;
                // Cria o enrollment do aluno
                const p1 = createEnrollmentFromClassroom(classroom, userId);
                const p2 = updateRanking(classroom.classroomId, userData);
                promises.push(p1, p2);
              });
            } else {
              // Aluno não é um usuário (adiciona em users sem conta com pre-enrollment: classroomId)
              const createNewUser = admin.firestore().collection('users').doc(studentEmail).set(
                {
                  email: studentEmail,
                  preEnrollments: admin.firestore.FieldValue.arrayUnion({
                    courseId: classroom.courseId,
                    courseName: classroom.courseName,
                    classroomName: classroom.classroomName,
                    institutionName: classroom.institutionName,
                    courseDescription: classroom.courseDescription,
                    courseLink: classroom.courseLink,
                    classroomId
                  })
                }
                , { merge: true })
                .then(() => console.log('adicionou um novo usuário'))
                .catch((err) => console.log(err));
              promises.push(createNewUser);
            }
          })
          .catch((err: any) => console.log(err));
      });
      return Promise.all(promises);
    } else {
      functions.logger
        .info('Dados da classe não existem', { structuredData: true });
      return null;
    }
  });

export const createEnrollmentsWhenUpdateClassroom = functions.region(region).firestore
  .document('classrooms/{classroomId}')
  .onUpdate(async (change) => {
    const data = change.after.data();
    // Verifica se os dados existem
    if (data) {
      const students = data.students;
      const classroomId = data.classroomId;
      const classroom = data;
      const promises: Promise<any>[] = [];
      // Itera no array de students dos dados para criar as matrículas de cada aluno
      students.map((studentEmail: string) => {
        admin.firestore().collection('userData')
          .where('email', '==', studentEmail).get()
          .then((querySnapshot: any) => {
            // Verifica se o usuário existe no userData
            if (!querySnapshot.empty) {
              querySnapshot.forEach((user: any) => {
                const userData = user.data();
                const userId = user.id;
                // Cria o enrollment do aluno
                const p1 = createEnrollmentFromClassroom(classroom, userId);
                const p2 = updateRanking(classroom.classroomId, userData);
                promises.push(p1, p2);
              });
            } else {
              // Aluno não é um usuário (adiciona em users sem conta com pre-enrollment: classroomId)
              const createNewUser = admin.firestore().collection('users').doc(studentEmail).set(
                {
                  email: studentEmail,
                  preEnrollments: admin.firestore.FieldValue.arrayUnion({
                    courseId: classroom.courseId,
                    courseName: classroom.courseName,
                    classroomName: classroom.classroomName,
                    institutionName: classroom.institutionName,
                    courseDescription: classroom.courseDescription,
                    courseLink: classroom.courseLink,
                    classroomId
                  })
                }
                , { merge: true })
                .then(() => console.log('adicionou um novo usuário'))
                .catch((err) => console.log(err));
              promises.push(createNewUser);
            }
          })
          .catch((err: any) => console.log(err));
      });
      return Promise.all(promises);
    } else {
      functions.logger
        .info('Dados da classe não existem', { structuredData: true });
      return null;
    }
  });

export const createmoduleProgressWhenCreateEnrollment = functions.region(region).firestore
  .document('enrollments/{enrollmentId}')
  .onCreate(async (snap) => {
    const enrollment = snap.data();
    if (enrollment) {
      const userId = enrollment.userId;
      const courseQuery = await admin.firestore().doc(`courseTemplate/${ enrollment.courseId }`).get();
      const course = courseQuery.data();
      if (course) {
        const promises: Promise<WriteResult>[] = [];
        course.modules.forEach((moduleId: string) => {
          admin.firestore().doc(`moduleTemplate/${ moduleId }`).get()
            .then((module) => {
              const moduleData = module?.data() ?? null;
              if (moduleData) {
                const p = createModuleProgress(moduleData, userId, enrollment);
                promises.push(p);
              } else {
                throw Error('No Module Data');
              }
            })
            .catch(err => console.log(err));
        });
        return Promise.all(promises);
      } else {
        throw Error('No Course Data');
        return null;
      }
    } else {
      functions.logger
        .info('Dados da matrícula não existem', { structuredData: true });
      return null;
    }
  });

export const createQuestionnaireAnswerWhenCreateModuleProgress = functions.region(region).firestore
  .document('moduleProgress/{moduleProgressId}')
  .onCreate(async (snap) => {
    const promises = [];
    const moduleProgress = snap.data();
    if (moduleProgress) {
      const lessons = moduleProgress.lessons;
      const questionnaires = lessons.filter((lesson: any) => lesson.lessonType === 'QUESTIONNAIRE');
      for (const questionnaire of questionnaires) {
        const questionnaireId = questionnaire.questionnaireId;
        const questionnaireTemplateQuery = await admin.firestore().doc(`questionnaireTemplate/${ questionnaireId }`).get();
        const questionnaireTemplate = questionnaireTemplateQuery?.data() ?? null;
        if (questionnaireTemplate) {
          // O "in" limita a query a 10 objetos. Assim, um questionário não pode ter mais de 10 questões.
          const questionsData = await admin.firestore().collection('questionTemplate')
            .where('questionId', 'in', questionnaireTemplate.questions).get();
          const questions: any[] = [];
          questionsData.docs.forEach(questionDoc => questions.push(questionDoc.data()));
          questionnaireTemplate.questions = questions;
          const p = createQuestionnaire(moduleProgress.userId, questionnaireTemplate, moduleProgress.classroomId, moduleProgress.moduleId);
          promises.push(p);
        } else {
          functions.logger
            .info('Questionnaire não existe', { structuredData: true });
          return null;
        }
      }
      return Promise.all(promises);
    } else {
      functions.logger
        .info('Dados do moduleProgress não existem', { structuredData: true });
      return null;
    }
  });
