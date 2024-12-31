import { createAccount } from "@/lib/accountUtils";
import prisma from "@/lib/db";
import { hash, verify } from "argon2";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "@/app/api/config";
import { issueToken } from "@/scripts/util";


export async function POST(req: Request) {
  const { username, password, provider } = await req.json()

  if (!username || !password) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

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
      }, include: {roles: true}
    })
    const accountData = 
      provider === 'credentials' ? 
        {username, hashedPassword}:
        { accessToken: 'actionTokenReel', refreshToken: 'refreshTokenReel', providerAccountId: 'someOAuthId' } 
    
    await createAccount(newUser.id, provider, 'someProviderId', accountData)
  
    const token = issueToken("7d", ['id', newUser.id], ['name', newUser.name], ['roles', newUser.roles])
    return new Response(JSON.stringify({ token }), {status: 200})
  } catch (error) {
    return new Response(error as string, {status: 500})
  }
}