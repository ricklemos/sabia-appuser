export interface SessionsUser {
  email: string;
  firstLogin?: Date;
  isAdmin?: boolean;
}

export interface SessionsUserData {
  email: string;
  firstName: string;
  lastName: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
}
