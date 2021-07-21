export interface QuestionaryAnswer {
  userId: string;
  questionaryId: string;
  questionaryName: string;
  questions: Question[];
  score?: number;
  tentatives?: number;
}

export interface Question {
  questionText: string;
  alternatives: Alternative[];
  gotRight: boolean;
  explanationText: string;
}

export interface Alternative {
  alternativeText: string;
  isRight: boolean;
}
