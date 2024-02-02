import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"

/** Example on how to extend the built-in session types */
declare module "next-auth" {
  interface User {
    id?: number
    name?: string
    email?: string
    image?: string
    sub?: string; 
  }
  interface Session {
    /** This is an example. You can find me in types/next-auth.d.ts */
    user?: User 
  }
}

/** Example on how to extend the built-in types for JWT */
declare module "next-auth/jwt" {
  interface JWT {
    /** This is an example. You can find me in types/next-auth.d.ts */
    sub?: string;
  }
}