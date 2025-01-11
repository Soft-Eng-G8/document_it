import manager from "@/app/manager";


export async function POST(req: Request) {
  const { username, email, password, provider } = await req.json()

  if (!username || !password) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  try {
    const token = await manager.addUser(username, email, password, provider)
    return new Response(JSON.stringify({ token }), {status: 200})
  } catch (error) {
    return new Response(error as string, {status: 500})
  }
}