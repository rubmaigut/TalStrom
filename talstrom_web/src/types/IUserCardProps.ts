import { ReactNode } from "react";

export interface UserCardForUser {
  technologies: string;
  phoneNumber: string;
  followers: any;
  following: any;
  posts: Post[];
  dateAdded: ReactNode;
  id: number;
  name: string;
  email: string;
  picture: string;
  sub: string;
  role: string;
  images: Media[];
  videos: Media[];
}