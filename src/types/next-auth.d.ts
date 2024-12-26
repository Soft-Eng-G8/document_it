import NextAuth, { DefaultSession } from "next-auth";
import { User as PrismaUser } from "@prisma/client";

// extending to add roles
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email?: string
      roles: {
        id: string, name: string
      }[]
    } & DefaultSession['user']
  }

  interface JWT {
    id: string
    email?: string
    roles: {
      id: string, name: string
    }[]
  }

  interface User extends PrismaUser {
    roles: {
      id: string, name: string
    }[]
  }
}