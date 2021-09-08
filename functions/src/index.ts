import * as admin from 'firebase-admin';
import * as tests from './tests';
import * as createEnrollments from './create-enrollments';
import * as updateRankingScore from './update-ranking-score';
import * as authentication from './authentication';

admin.initializeApp();

// Funções de Teste
export const createMockupData = tests.createMockupData;
export const createClassroom = tests.createClassroom;

// Funções de criar enrollment do aluno e documentos necessários para começar o curso.
export const createEnrollmentWhenCreateUserData = createEnrollments.createEnrollmentWhenCreateUserData;
export const createEnrollmentWhenCreateOrUpdateClassroom = createEnrollments.createEnrollmentWhenCreateOrUpdateClassroom;
export const createmoduleProgressWhenCreateEnrollment = createEnrollments.createmoduleProgressWhenCreateEnrollment;
export const createQuestionnaireAnswerWhenCreateModuleProgress = createEnrollments.createQuestionnaireAnswerWhenCreateModuleProgress;

// Funções de atualização do score do aluno nos documentos
export const questionnaireUpdated = updateRankingScore.questionnaireUpdated;
export const updateRanking = updateRankingScore.updateRanking;

// Funções de administração de papéis
export const setStudentRole = authentication.setStudentRoleOnCreate;
export const setRole = authentication.setRole;

