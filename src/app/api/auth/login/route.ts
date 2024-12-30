
//? This route is for API calls, so the client can make/auth users from outside sources. Actual in-app auth is in [...nextauth]
import { createAccount } from "@/lib/accountUtils";
import prisma from "@/lib/db";
import { hash, verify } from "argon2";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "@/app/api/config";


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
  });

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  // Compare the password
  const isValidPassword = await verify(user.hashedPassword, password);
  if (!isValidPassword) {
    return new Response(JSON.stringify({ error: "Invalid password" }), {
      status: 401,
    });
  }

  // Return user information, e.g., as a session token
  const token = jwt.sign({
    id: user.id,
    name: user.name
  }, JWT_SECRET!, {expiresIn: '7d'})
  return new Response(JSON.stringify({ token }), {status: 200})
  // return new Response(
  //   JSON.stringify({
  //     id: user.id,
  //     name: user.name,
  //     createdAt: user.createdAt
  //   }),
  //   { status: 200 }
  // );
}

