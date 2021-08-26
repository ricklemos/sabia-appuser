export interface ModuleProgress {
  moduleId: string;
  moduleName: string;
  moduleProgressPercentage: number;
  schoolName: string;
  courseId: string;
  userId: string;
  started?: Date;
  lessons: Lesson[];
}

export interface Lesson {
  complete: boolean;
  lessonId?: string;
  lessonName: string;
  lessonType: string;
  questionaryId?: string;
}
