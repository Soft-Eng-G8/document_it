import NextAuth, { DefaultSession } from "next-auth";
import { User as PrismaUser } from "@prisma/client";

// extending to add roles
//? This stuff is for the providers to recognize roles. Its a mess am not 100% sure I understand but it fixes it so hey
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