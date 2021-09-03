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

export interface UserData {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface PreEnrollment {
  courseId: string;
  courseName: string;
  classroomName: string;
  institutionName: string;
  classroomId: string;
}
