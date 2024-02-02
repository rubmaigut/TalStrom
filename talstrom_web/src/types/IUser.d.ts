type Role = "pending" | "admin" | "developer" | "customer";
export interface User {
    id: number;
    name: string;
    email: string;
    picture: string;
    sub: string;
    role: Role;
}
export interface LoginProps {
  user: User
}
export interface IUserContext {
  userContextG: User | null;
  role: string | null;
  updateUser: (user: User | null) => void;
}