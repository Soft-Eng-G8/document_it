import prisma from "@/lib/db";
import { formatPerms, verifyToken } from "@/scripts/util";
import { NextRequest } from "next/server";




export async function POST(req: NextRequest, { params } : {params: {id: string}}) {
  const { decodedToken, error } = await verifyToken(req)
  if(error) return new Response(error, {status: 403})
  const { id } = await params
  const perms = formatPerms(decodedToken?.perms)

  const contribution = await prisma.contribution.findUnique({where: {id}})
  if(!contribution) return new Response("Err: can't find contribution", {status: 404})

  const { status } = await req.json()

  if(!perms.has('verify:contribution')) return new Response(JSON.stringify({error: 'Error 403: Forbidden'}), {status: 403})
  
  try {
    await prisma.document.update({
      where: {
        id: contribution.documentId
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