import { ReactNode } from "react";

export interface UserCardForUser {
  phoneNumber: string;
  followers: any;
  following: any;
  posts: Post[];
  id: number;
  name: string;
  userName: string
  email: string;
  picture: string;
  sub: string;
  role: string;
  position: string;
  images: Media[];
  videos: Media[];
  bio: string;
  technologies: string
}