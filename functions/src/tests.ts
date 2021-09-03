import * as functions from 'firebase-functions';
import { QuestionnaireTemplate, QuestionTemplate } from './models';
import * as admin from 'firebase-admin';

export const createMockupData = functions.https
  .onRequest((req, res) => {
    const users = [
      // {
      //   userId: '01',
      //   email: 'gmduarte96@gmail.com',
      //   firstName: 'Gabriel',
      //   lastName: 'Duarte'
      // },
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
        // students: [ 'teste4@teste.com', 'teste@teste.com', 'teste2@teste.com', 'teste3@teste.com',],
        // students: ['gmduarte96@gmail.com', 'rick1@teste.com', 'teste@teste.com', 'rick2@teste.com', 'rick3@teste.com', 'teste2@teste.com', 'rick4@teste.com'],
        students: ['teste4@teste.com', 'rick1@teste.com', 'rick2@teste.com', 'rick3@teste.com', 'rick4@teste.com', 'teste5@teste.com'],
      })
      .then(() => res.send('createClassroom Succesfully'))
      .catch(err => console.log(err));
  });
