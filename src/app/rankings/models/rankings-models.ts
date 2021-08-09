export interface ClassRanking {
  classroomID: string;
  courseID: string;
  courseName: string;
  classroomName: string;
  schoolName: string;
  ranking: [{
    userID: string,
    userName: string,
    userScore: number
  }];
}
