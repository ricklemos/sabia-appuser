export interface SessionsUser {
  email: string;
  firstLogin?: Date;
}

export interface SessionsUserData {
  email: string;
  firstName: string;
  lastName: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  userId: string;
}

export type SessionsRole = 'SCHOOL_ADMIN' | 'INSTRUCTOR' | 'STUDENT' | 'MASTER';

