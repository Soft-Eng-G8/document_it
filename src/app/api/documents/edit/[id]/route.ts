import { JWT_SECRET } from "@/app/api/config";
import manager, { IDocumentData } from "@/app/manager";
import prisma from "@/lib/db";
import { verifyToken } from "@/scripts/util";
import { NextApiRequest } from "next";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest, { params } : {params: {id: string}}) {
  const token = (await cookies()).get('next-auth.session-token')
  // const { decodedToken, error } = manager.
  const decodedToken = await decode({
      token: token!.value,
      secret: JWT_SECRET!
      
  })
  decodedToken?.sub
  const myobj = await req.formData();

  const { id } = await params
  if(!params) return new Response("Err: no document attached")

  const document = await prisma.document.findUnique({
    where: {
      id: id as string
    }, include: {
      requirements: true
    }
  })

  if(!document) {
    return new Response("Error: document not found", {status: 404})
  }

  const data: IDocumentData = {
    title: myobj.get('title') as string,
    description: myobj.get("description") as string,
    content: myobj.get("content") as string,
    additional: myobj.get("additional") as string,
    categoryId: myobj.get("categoryId") as string,
    requirements: JSON.parse(myobj.get('requirements') as string),
    userId: myobj.get('userId') as string,
    logo: myobj.get("logo") as File,
    pdf: myobj.get("pdf") as File
  }
  console.log(data)
  try {
    await manager.editDocument(id, data, {userId: myobj.get('userId') as string})
    // await prisma.contribution.create({ data })
// 
    // return new Response("Contribution submitted", {status: 200})
    
  } catch(e) {
    
    return new Response(e as string, {status: 500})
  }
}
