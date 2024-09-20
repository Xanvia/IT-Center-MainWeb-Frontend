import NextAuth from "next-auth";

export enum Role {
  STUDENT = "STUDENT",
  STAFF = "STAFF",
  ADMIN = "ADMIN",
  S_ADMIN = "S_ADMIN",
  USER = "USER",
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: Role;
      image: string;
      createdDate: string;
    };
    access_token: string;
    refresh_token: string;
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      email: string;
      name: string;
      role: Role;
      image: string;
      createdDate: string;
    };
    access_token: string;
    refresh_token: string;
  }
}
