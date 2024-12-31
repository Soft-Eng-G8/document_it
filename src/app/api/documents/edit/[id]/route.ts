import prisma from "@/lib/db";
import { verifyToken } from "@/scripts/util";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest, { params } : {params: {id: string}}) {
  const { decodedToken, error } = await verifyToken(req)
  if(error) {
    console.log(error)
    return new Response(error, {status: 401})
  }

  console.log(decodedToken)
  const { id: user_id } = decodedToken!
  const { id } = await params
  const { newTitle, newDescription, newContent, newAdditional, newImageURL, newPdfURL, newRequirements } = await req.json()  


  if(!id) return new Response("Err: no document attached")

  const document = await prisma.document.findUnique({
    where: {
      id: id as string
    }
  })

  if(!document) {
    return new Response("Error: document not found", {status: 404})
  }

  const data = {
    type: "EDIT",
    user: {
      connect: {id: user_id}
    },
    document: {
      connect: {id}
    },
    oldTitle: document.title,
    oldDescription: document.description,
    oldContent: document.content,
    oldAdditional: document.additional,
    oldImageURL: document.imageUrl,
    oldPdfURL: document.pdfUrl,

    newTitle: newTitle || document.title,
    newDescription: newDescription || document.description,
    newContent: newContent || document.content,
    newAdditional: newAdditional || document.additional,  
    newImageURL: newImageURL || document.imageUrl,
    newPdfURL: newPdfURL || document.pdfUrl
  } 
  console.log(data)
  try {
    await prisma.contribution.create({ data })

    return new Response("Contribution submitted", {status: 200})
    
  } catch(e) {
    
    return new Response(e as string, {status: 500})
  }
}
