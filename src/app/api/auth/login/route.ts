
//? This route is for API calls, so the client can make/auth users from outside sources. Actual in-app auth is in [...nextauth]
import { createAccount } from "@/lib/accountUtils";
import prisma from "@/lib/db";
import { hash, verify } from "argon2";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "@/app/api/config";
import { getPerms, issueToken } from "@/scripts/util";


if(!JWT_SECRET) throw new Error("No JWT_SECRET env var detected. Ask for one");


export async function POST(req: Request) {
  const { username, password } = await req.json()

  if (!username || !password) {
    return new Response(JSON.stringify({ error: "Missing credentials" }), {
      status: 400,
    });
  }

  const user = await prisma.user.findUnique({
    where: { name: username }, // Assuming email is used as the username
    include: { roles: {
      include: {permissions: true}
    }}
  });

  
  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  const perms = getPerms(user.roles)

  // Compare the password
  const isValidPassword = await verify(user.hashedPassword, password);
  if (!isValidPassword) {
    return new Response(JSON.stringify({ error: "Invalid password" }), {
      status: 401,
    });
  }

  // Return user information as asession token
  const token = issueToken("7d", ['id', user.id], ['name', user.name], ['perms', perms])
  
  return new Response(JSON.stringify({ token }), {status: 200})
}

