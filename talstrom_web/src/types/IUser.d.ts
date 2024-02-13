type Role = "pending" | "admin" | "developer" | "customer";
export interface User {
  id: number;
  name: string;
  username?: string
  email: string;
  picture: string;
  sub: string;
  role: Role;
  technologies?: string
  phoneNumber: number | null;
  dateAdded: Date;
  lastLoggedIn: Date;
  lastModified: Date;
  bio?: string
  position?: string
  active: boolean;
  images: any[]
  videos: any[];
  favorites?: string[]
  posts?: Post[] ;
}
export interface LoginProps {
  user: User;
}
export interface IUserContext {
  userContextG: User | null | UserCardForUser;
  role: string | null;
  updateUser: (user: User | UserCardForUser) => void;
}
