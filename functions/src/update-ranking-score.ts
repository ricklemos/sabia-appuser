// Atualiza o Score do enrollment e do moduleProgress quando termina de responder o questionário pela primeira vez
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// ToDo: Refatorar com return
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
          .update({ score: admin.firestore.FieldValue.increment(score) })
          .catch((err) => console.log(err));
        admin.firestore().doc(`/moduleProgress/${ userId + '-' + moduleId }`)
          .update({ score: admin.firestore.FieldValue.increment(score) })
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
