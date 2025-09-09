import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    email: string;
    name: string;
    role: string;
    image?: string;
    token: string;
  }

  interface Session {
    user: {
      email: string;
      name: string;
      role: string;
      image?: string;
      token: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    email: string;
    name: string;
    role: string;
    image?: string;
    token: string;
    idToken?: string;
  }
}
