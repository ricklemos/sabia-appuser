export interface StockDay {
  open: number;
  high: number;
  low: number;
  close: number;
}

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
  courseDescription?: string;
  courseLink?: string;
}

export interface Enrollment {
  courseId: string;
  courseName: string;
  courseDescription: string;
  courseLink: string;
  classroomName: string;
  institutionName: string;
  score: number;
  classroomId: string;
  userId: string;
}

export interface ModuleTemplate {
  moduleId: string;
  moduleName: string;
  lessons: Lesson[];
}

export interface Lesson {
  complete: boolean;
  lessonId: string;
  lessonName: string;
  lessonType: 'TEXT' | 'QUESTIONNAIRE';
}
