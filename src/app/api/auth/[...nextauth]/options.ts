//? Don't ask why I went with JWTokens, that's what worked and am content with it, and so should you, dear reader
//? Currently only username/password login is supported, but foundation is there for OAuth, edit as needed

import prisma from "@/lib/db";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import { verify, hash } from 'argon2'
import { PrismaAdapter } from '@next-auth/prisma-adapter'


export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: "Username: ",
          type: 'text',
          placeholder: 'John Doe'
        },
        password: {
          label: 'Password: ',
          type: 'password',
          placeholder: '*****'
        }
      },
      async authorize(credentials) {
        const username = credentials?.username || ''
        const password = credentials?.password || ''
        
        const user = await prisma.user.findUnique({
          where: {name: username},
          include: { roles: true }
        })
        if(!user) return null

        const isPasswordValid = await verify(user.hashedPassword, password)
        if(!isPasswordValid) return null
        
        return user
      },
    })
  ],
  pages: {
    //TODO: Add signup, error pages
    signIn: '/login'
  },
  session: {
    //? Shhh, it works
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7,
  },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.roles = user.roles
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        //? Why not use the commented code? because of caching. If roles were updated and a user was alr logged in, changes wont be reflected to him. This in combination with refreshing on page view assures users to always be up-to-date
        // session.user.id = token.id as string
        // session.user.email = token.email as string
        // session.user.roles = token.roles as {id: string, name: string}[]
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          include: { roles: true },
        });

        if(dbUser) {
          session.user = {
            id: dbUser.id,
            email: dbUser.email || '',
            roles: dbUser.roles.map((role) => ({ id: role.id, name: role.name })),
          };
        }
      }
      return session
    }
  }
}