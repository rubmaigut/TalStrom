import { ReactNode } from 'react';

export interface UserCardForUser {
  phoneNumber: string;
  followers: any;
  posts: any;
  dateAdded: ReactNode;
  id: number;
  name: string;
  email: string;
  picture: string;
  sub: string;
  role: string;
}
