export interface ModuleProgress {
  lessons: Lesson[];
  moduleId: string;
  moduleName: string;
  started?: any;
  userId: string;
  moduleProgressPercentage?: number; // um número de 0 a 100 que representa a porcentagem de conclusão do módulo
}

export interface Lesson {
  complete: boolean;
  lessonName: string;
  // TODO: adicionar outros tipos de lição
  lessonType: 'QUESTIONARY' | 'TEXT';
  questionary?: string; // questionary reference ou questionary id? -> por enquanto está sendo usado o Id
}
