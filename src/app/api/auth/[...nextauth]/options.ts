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
        // const user = {id: '30', username: 'galunga', password: 'bomba'}
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
    signIn: '/login'
  },
  session: {
    strategy: 'jwt'
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