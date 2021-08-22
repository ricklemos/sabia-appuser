export interface RankingsClassRanking {
  classroomId: string;
  courseId: string;
  courseName: string;
  classroomName: string;
  schoolName: string;
  ranking: [{
    userID: string,
    userName: string,
    userScore: number
  }];
}

export interface RankingsEnrollments {
  userId : string;
  classroomId : string;
  courseId : string;
  courseName : string;
  classroomName : string;
  courseDescription: string;
  schoolName : string;
  score?: string;
  courseLink : string;
}