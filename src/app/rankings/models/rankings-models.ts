export interface RankingsClassRanking {
  classroomId: string;
  courseId: string;
  courseName: string;
  classroomName: string;
  institutionName: string;
  ranking: RankingsUser[];
}

export interface RankingsUser {
  userId: string;
  userName: string;
  userScore: number;
}

export interface RankingsEnrollments {
  userId: string;
  classroomId: string;
  courseId: string;
  courseName: string;
  classroomName: string;
  courseDescription: string;
  institutionName: string;
  score?: string;
  courseLink: string;
}
