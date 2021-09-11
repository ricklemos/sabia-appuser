export interface HomeModuleProgress {
  lessons: HomeLesson[] | string[];
  moduleId: string;
  moduleName: string;
  courseId?: string;
  classroomId?: string;
  institutionName?: string;
  started?: any;
  score?: number;
  userId: string;
  moduleProgressPercentage?: number; // um número de 0 a 100 que representa a porcentagem de conclusão do módulo
}

export interface HomeLesson {
  complete: boolean;
  lessonName: string;
  lessonType: 'QUESTIONARY' | 'TEXT';
  questionaryId?: string; // usar o Id do questionário para acessá-lo
  lessonId?: string;
}