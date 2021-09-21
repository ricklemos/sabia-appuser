export interface ModuleProgress {
  lessons: ModuleLesson[];
  moduleId: string;
  moduleName: string;
  institutionName: string;
  started?: any;
  userId: string;
  moduleProgressPercentage?: number; // um número de 0 a 100 que representa a porcentagem de conclusão do módulo,
  score?: number;
  classroomId?: string;
  courseId?: string;
}

export interface ModuleLesson {
  complete: boolean;
  lessonName: string;
  lessonType: 'QUESTIONNAIRE' | 'TEXT';
  questionnaireId?: string; // usar o Id do questionário para acessá-lo
  lessonId?: string;
}

export interface ModuleTextLesson {
  lessonId: string;
  lessonDescription: string;
  lessonName: string;
  attachments?: Attachment[];
}

export interface Attachment {
  attachmentType: 'PDF' | 'VIDEO';
  attachmentLink: string;
  attachmentName: string;
}
