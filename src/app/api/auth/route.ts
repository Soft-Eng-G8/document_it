
//? This route is for API calls, so the bouchrikians can make/auth users from outside sources. Actual in-app auth is in [...nextauth]
import { createAccount } from "@/lib/accountUtils";
import { PrismaClient } from "@prisma/client";
import { hash, verify } from "argon2";

const prisma = new PrismaClient()
export async function GET(req: Request) {
  const {searchParams} = new URL(req.url);
  const
    username = searchParams.get('username'),
    password = searchParams.get('password')

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
  return new Response(
    JSON.stringify({
      id: user.id,
      name: user.name,
      createdAt: user.createdAt
    }),
    { status: 200 }
  );
}

export async function POST(req: Request) {
  // if(req.method !== "POST") return res.status(405).json({error: 'Method not allowed'})

  console.log(req.body)
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

  // if (!role) {
  //   return res.status(500).json({ error: 'Default role not found' })
  // }

  try {
    const newUser = await prisma.user.create({
      data: {
        name: username,
        hashedPassword,
        roles: {
          connect: { id: role!.id }
        }
      }
    })
    const accountData = 
      provider === 'credentials' ? 
        {username, hashedPassword}:
        { accessToken: 'actionTokenReel', refreshToken: 'refreshTokenReel', providerAccountId: 'someOauthId' } 
    
    await createAccount(newUser.id, provider, 'someProviderId', accountData)
  
    return new Response(JSON.stringify({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        createdAt: newUser.createdAt,
    }), { status: 201 });
  } catch (error) {
    
  }
}