export interface User {
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
export interface LoginProps {
  user: User
}
export interface IUserContext {
  user: User | null;
  role: string | null;
  updateUser: (user: User | null) => void;
}