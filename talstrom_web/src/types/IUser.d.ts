export interface User {
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