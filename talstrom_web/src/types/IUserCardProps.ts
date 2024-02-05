import { ReactNode } from "react";
import { Post } from "./Posts";

export interface UserCardForUser {
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
  videos: Video[];
}
