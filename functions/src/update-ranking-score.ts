// Atualiza o Score do enrollment e do moduleProgress quando termina de responder o questionário pela primeira vez
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
export const questionnaireUpdated = functions.region('southamerica-east1').firestore.document('/questionnaireAnswers/{questionnaireId}')
  .onUpdate((snap) => {
    const data = snap.after.data();
    if (data) {
      const userId = data.userId;
      const classroomId = data.classroomId;
      const moduleId = data.moduleId;
      const score = data.score;
      if (data.tentatives === 1) {
        // Incrementa o valor do score tanto em enrollments quanto no moduleProgress
        const p1 = admin.firestore().doc(`/enrollments/${ userId + '-' + classroomId }`)
          .update({ score: admin.firestore.FieldValue.increment(score) })
          .catch((err) => console.log(err));
        const p2 = admin.firestore().doc(`/moduleProgress/${ userId + '-' + moduleId }`)
          .update({ score: admin.firestore.FieldValue.increment(score) })
          .catch((err) => console.log(err));
        return Promise.all([p1, p2]);
      } else {
        console.log('Não foi a primeira tentativa');
        return null;
      }
    } else {
      console.log('data does not exist');
      return null;
    }
  });

// Atualiza o Score do Ranking quando atualiza o enrollment
export const updateRanking = functions.region('southamerica-east1').firestore.document('/enrollments/{enrollmentId}')
  .onUpdate(async (snap) => {
    const data = snap.after.data();
    if (data) {
      const userId = data.userId;
      const score = data.score;
      const classroomId = data.classroomId;
      const classRankingDoc = await admin.firestore().doc(`/classRankings/${ classroomId }`).get();
      const classRankingData = classRankingDoc.data();
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
    } else {
      console.log('data does not exist');
      return null;
    }
  });
