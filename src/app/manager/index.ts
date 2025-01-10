import { createAccount } from "@/lib/accountUtils";
import prisma from "@/lib/db";
import { getPermsFromRole, issueToken } from "@/scripts/util";
import { Prisma, User } from "@prisma/client";
import { hash } from "argon2";

interface IUserOptions {
  id?: string
  name?: string
  perms?: boolean
  roles?: boolean
  documents?: boolean
  badges?: boolean
}





class DBManager {
  constructor() {}

  public async fetchUser(options: IUserOptions) {
    const { id, name, perms, roles, documents, badges } = options
    const whereClauses = {
      ...(id && {id}),
      ...(name && {name})
    }
    const includeClauses = {
      ...(roles && { roles: perms? {
          permissions: true
      } : true }),
      ...(documents && { document: true})
    }
    try {
      const user = prisma.user.findUnique({
        where: whereClauses as Prisma.UserWhereUniqueInput, include: includeClauses as Prisma.UserInclude
      })
      const perms = getPermsFromRole(user.roles)
      return [user, )]
    } catch(err) {
      throw new Error(err as string)
    }
  }

  public async addUser(username: string, password: string, provider: string) {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { name: username } })
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 });
    }

    const hashedPassword = await hash(password)

    const role = await prisma.role.findFirst({
      where: { name: 'USER' }
    })

    try {
      const newUser = await prisma.user.create({
        data: {
          name: username,
          username,
          hashedPassword,
          roles: {
            connect: { id: role!.id }
          }
        }, 
        include: {
          roles: {
            include: {
              permissions: true
            }
        }}
      })
      const perms = getPermsFromRole(newUser.roles)
      const accountData = 
        provider === 'credentials' ? 
          {username, hashedPassword}:
          { accessToken: 'actionTokenReel', refreshToken: 'refreshTokenReel', providerAccountId: 'someOAuthId' } 
      
      await createAccount(newUser.id, provider, 'someProviderId', accountData)
    
      const token = issueToken("7d", ['id', newUser.id], ['name', newUser.name], ['permissions', perms])

      return token
    } catch(error) {
      return new Error(error as string)
    }
  }
}


export default new DBManager()