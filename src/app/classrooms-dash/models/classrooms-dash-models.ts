export interface ClassroomsDashClassroom {
  classroomId: string;
  classroomName: string;
  courseId: string;
  institutionName: string;
  courseName: string;
  modules: string[];
  startDate: Date;
  endDate?: Date;
  instructors?: string[];
  students: string[];
  courseDescription: string;
  courseLink: string;
}
