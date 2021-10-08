export interface CoursesModuleProgress {
  lessons: CoursesLesson[];
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

export interface CoursesLesson {
  complete: boolean;
  lessonId?: string;
  lessonName: string;
  lessonType: string;
  questionnaireId?: string;
}
