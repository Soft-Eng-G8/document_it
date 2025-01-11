import { JWT_SECRET } from "@/app/api/config";
import prisma from "@/lib/db";
import { formatPerms, verifyToken } from "@/scripts/util";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";




export async function POST(req: NextRequest, { params } : {params: {id: string}}) {
  const token = (await cookies()).get('next-auth.session-token')
  // const { decodedToken, error } = manager.
  const decodedToken = await decode({
      token: token!.value,
      secret: JWT_SECRET!
      
  })
  const { id } = await params

  const contribution = await prisma.contribution.findUnique({where: {id}})
  if(!contribution) return new Response("Err: can't find contribution", {status: 404})

  if(!decodedToken?.permissions || !decodedToken.permissions.find(el => el.name === 'verify:contribution')) return new Response(JSON.stringify({error: 'Error 403: Forbidden'}), {status: 403})

  const { status } = await req.json()

  
  try {
    await prisma.document.update({
      where: {
        id: contribution.documentId!
      }, 
      data: {
        title: contribution.newTitle,
        description: contribution.newDescription,
        content: contribution.newContent,
        additional: contribution.newAdditional,
        imageUrl: contribution.newImageURL,
        pdfUrl: contribution.newPdfURL
      }
    })
    await prisma.contribution.update({
      where: { id: contribution.id },
      data: {
        status: 'VERIFIED'
      }
    })
    return new Response(JSON.stringify("Contribution verified, and content updated"), {status: 200})
  } catch (error) {
    return new Response(error as string, {status: 500})
  }
}