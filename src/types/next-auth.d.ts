import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
  interface User {
    id: string;
    username: string;
    name: string;
    bio: string | null;
    token: string;
    followers: number;
    following: number;
  }
}

declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface User {
    id: string;
    username: string;
    name: string;
    bio: string | null;
    token: string;
    followers: number;
    following: number;
  }
}
