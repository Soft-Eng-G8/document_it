import manager from "@/app/manager";


export async function POST(req: Request) {
  const { username, password, provider } = await req.json()

  if (!username || !password) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  try {
    const token = await manager.addUser(username, password, provider)
    return new Response(JSON.stringify({ token }), {status: 200})
  } catch (error) {
    return new Response(error as string, {status: 500})
  }
}