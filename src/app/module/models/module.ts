export interface ModuleProgress {
  lessons: Lesson[];
  moduleId: string;
  moduleName: string;
  schoolName?: string;
  started?: any;
  userId: string;
  moduleProgressPercentage?: number; // um número de 0 a 100 que representa a porcentagem de conclusão do módulo
}

export interface Lesson {
  complete: boolean;
  lessonName: string;
  lessonType: 'QUESTIONARY' | 'TEXT';
  questionaryId?: string; // usar o Id do questionário para acessá-lo
  lessonId?: string;
}
