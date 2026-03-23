
import NextAuth, { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string; 
    user: {
      id?: string;
      username?: string; // github login
      name?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string
        username: string
    }
}