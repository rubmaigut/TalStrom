import { ReactNode } from "react";

export interface UserCardForUser {
  id: number;
  name: string;
  email: string;
  picture: string;
  sub: string;
  role: string;
  phoneNumber: string;
  followers: any;
  following: any;
  userName: string
  position: string;
  images: Media[];
  videos: Media[];
  bio: string;
  posts: Post[];
  technologies: string
}