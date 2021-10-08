import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Lesson } from './models';

export const updateModuleProgressPercentageWhenUpdateModuleProgress = functions.region('southamerica-east1').firestore
  .document('moduleProgress/{moduleProgressId}')
  .onUpdate((snap) => {
    const moduleProgressId = snap.after.id;
    const moduleProgress = snap.after.data();
    const lessons = moduleProgress.lessons;
    const completedLessons = lessons.filter((lesson: Lesson) => lesson.complete);
    const newModuleProgressPercentage = Number((Math.round((completedLessons.length / lessons.length) * 100)).toFixed(0));
    admin.firestore().doc(`moduleProgress/${ moduleProgressId }`).update({ moduleProgressPercentage: newModuleProgressPercentage })
      .then(() => {
        return true;
      }).catch((error) => {
        return error;
      });
  });
