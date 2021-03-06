import * as admin from 'firebase-admin';
import * as createEnrollments from './create-enrollments';
import * as updateRankingScore from './update-ranking-score';
import * as authentication from './authentication';
import * as updateModuleProgress from './update-module-progress';

admin.initializeApp();

// Funções de criar enrollment do aluno e documentos necessários para começar o curso.
export const createEnrollmentWhenCreateUserData = createEnrollments.createEnrollmentWhenCreateUserData;
export const createEnrollmentsWhenCreateClassroom = createEnrollments.createEnrollmentsWhenCreateClassroom;
export const createEnrollmentsWhenUpdateClassroom = createEnrollments.createEnrollmentsWhenUpdateClassroom;
export const createmoduleProgressWhenCreateEnrollment = createEnrollments.createmoduleProgressWhenCreateEnrollment;
export const createQuestionnaireAnswerWhenCreateModuleProgress = createEnrollments.createQuestionnaireAnswerWhenCreateModuleProgress;

// Funções de atualização do score do aluno nos documentos
export const questionnaireUpdated = updateRankingScore.questionnaireUpdated;
export const updateRanking = updateRankingScore.updateRanking;

// Funções de administração de papéis
export const setStudentRole = authentication.setStudentRoleOnCreate;
export const setRole = authentication.setRole;
export const setRoleOnUpdateUsers = authentication.setRoleOnUpdateUsers;

// Funções de atualização do module progress
export const updateModuleProgressPercentageWhenUpdateModuleProgress =
  updateModuleProgress.updateModuleProgressPercentageWhenUpdateModuleProgress;
