export interface QuestionnaireAnswer {
  userId: string;
  questionnaireId: string;
  questionnaireName: string;
  questions: Question[];
  score?: number;
  tentatives?: number;
  moduleId?: string;
  classroomId?: string;
  courseId?: string;
}

export interface Question {
  questionText: string;
  alternatives: Alternative[];
  gotRight?: boolean;
  explanationText: string;
  selectedAlternative?: Alternative;
}

export interface Alternative {
  alternativeText: string;
  isRight: boolean;
}
