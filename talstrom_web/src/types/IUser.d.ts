type Role = "pending" | "admin" | "developer" | "customer";
export interface User {
    id: number;
    name: string;
    email: string;
    picture: string;
    sub: string;
    role: Role;
    phoneNumber: null
    dateAdded: Date
    lastLoggedIn: Date
    lastModified: Date
    active: boolean
    videos: null
    followers: null
    following: null,
    posts: null
}
export interface LoginProps {
  user: User
}
export interface IUserContext {
  userContextG: User | null;
  role: string | null;
  updateUser: (user: User | null) => void;
}