import manager, { IDocumentData } from '@/app/manager';
import prisma from '@/lib/db'
import { Prisma } from '@prisma/client';
import { decode } from 'next-auth/jwt';
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod';
import { JWT_SECRET } from '../../config';

// a testing json
/* 
{
    "title": "test",
    "description": "test",
    "categoryId": 1,
    "content": "test",
    "additional": "test",
    "imageUrl": "image",
    "addedBy": "cm4mkotqd00007k64f5vgoss3",
    "requirements": [
        {
            "title": "test",
            "description": "test",
            "status": "test",
            "type": "test"
        }
    ]
}

 */


/* interface CreateDocumentRequestBody {
    title: string;
    description: string;
    categoryId: number;
    content: string| null;
    additional : string | null;
    imageUrl: string | null;
    addedBy: string;
    requirements: Requirements[];
}

interface Requirements {
    title: string;
    description: string;
    status: string;
    type: string;
} */


const createDocumentSchema = z.object({
    title: z.string(),
    description: z.string(),
    categoryId: z.string(),
    content: z.string().nullable(),
    additional: z.string().nullable(),
    image: z.string().nullable(),
    pdfUrl: z.string().nullable(),
    userId: z.string(),
    requirements: z.array(z.object({
        title: z.string(),
        description: z.string(),
        // status: z.string(),
        // type: z.string(),
    })),
});

type CreateDocumentRequestBody = z.infer<typeof createDocumentSchema>;

export async function POST(request: NextRequest) {
    try {
        const token = (await cookies()).get('next-auth.session-token')
        // const { decodedToken, error } = manager.
        const decodedToken = await decode({
            token: token!.value,
            secret: JWT_SECRET!
            
        })
        const myobj = await request.formData();
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
        // const { title, description, categoryId, content, additional, imageUrl, userId, requirements, pdfUrl } = myobj;
        // createDocumentSchema.parse(data);
        // const data = structuredClone(myobj)

        const contribution = await manager.addDocumentPending(data, {
            userId: myobj.get('userId') as string,
        })
        console.log("bazingen", contribution)
        
        // const contribution = manager.addDocumentPending(data, options)
        // const doc = await prisma.document.create({
        //     data: {
        //         title,
        //         description,
        //         categoryId,
        //         content,
        //         additional,
        //         imageUrl,
        //         userId,
        //         pdfUrl,
        //     },
        // });
        // for (const req of requirements) {
        //     await prisma.requirement.create({
        //  
        //             title: req.title,
        //             description: req.description,
        //             documentId: doc.id,
        //         },
        //     });
        // }
        
        
        return NextResponse.json("Document created  successfully", { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
}


const updateDocumentSchema = z.object({
    docId: z.string(),
    title: z.string(),
    description: z.string(),
    categoryId: z.number(),
    content: z.string().nullable(),
    additional: z.string().nullable(),
    imageUrl: z.string().nullable(),
    pdfUrl: z.string().nullable(),
    addedBy: z.string(),
    requirements: z.array(z.object({
        title: z.string(),
        description: z.string(),
        status: z.string(),
        type: z.string(),
    })),
});

// type UpdateDocumentRequestBody = z.infer<typeof updateDocumentSchema>;

// export async function PUT(request: NextRequest) {
//     try {
//         const myobj = await request.json() as UpdateDocumentRequestBody;
//         const { docId,title, description, categoryId, content, additional, imageUrl, addedBy, requirements } = myobj;
//         updateDocumentSchema.parse(myobj);
//         const doc = await prisma.document.update({
//             where: {
//                 id: docId,
//             },
//             data: {
//                 title: title,
//                 description: description,
//                 categoryId: categoryId,
//                 content: content,
//                 additional: additional,
//                 imageUrl: imageUrl,
//                 userId: addedBy,
//                 pdfUrl: myobj.pdfUrl,
//             },
//         });
//         await prisma.requirement.deleteMany({
//             where: {
//                 documentId: doc.id,
//             },
//         });
//         for (const req of requirements) {
//             await prisma.requirement.create({
//                 data: {
//                     title: req.title,
//                     description: req.description,
//                     status: req.status,
//                     type: req.type,
//                     documentId: doc.id,
//                 },
//             });
//         }
//         revalidatePath("/documents");
//         return NextResponse.json("Document updated successfully", { status: 200 });
//     } catch (error) {
//         if (error instanceof z.ZodError) {
//             console.error('Validation error:', error.errors);
//             return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
//         } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
//             console.error('Prisma known request error:', error);
//             return NextResponse.json({ error: 'Known request error occurred' }, { status: 400 });
//         } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
//             console.error('Prisma unknown request error:', error);
//             return NextResponse.json({ error: 'Unknown request error occurred' }, { status: 500 });
//         } else if (error instanceof Prisma.PrismaClientRustPanicError) {
//             console.error('Prisma Rust panic error:', error);
//             return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//         } else if (error instanceof Prisma.PrismaClientInitializationError) {
//             console.error('Prisma initialization error:', error);
//             return NextResponse.json({ error: 'Initialization error occurred' }, { status: 500 });
//         } else if (error instanceof Prisma.PrismaClientValidationError) {
//             console.error('Prisma validation error:', error);
//             return NextResponse.json({ error: 'Validation error occurred' }, { status: 400 });
//         }
//         console.error('Unexpected error:', error);
//         return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
//     }
// }

// const deleteDocumentSchema = z.object({
//     docId: z.string(),
// });

// type DeleteDocumentRequestBody = z.infer<typeof deleteDocumentSchema>;

// export async function DELETE(request: NextRequest) {
//     try {
//         const myobj = await request.json() as DeleteDocumentRequestBody;
//         const { docId } = myobj;
//         deleteDocumentSchema.parse(myobj);
//         await prisma.requirement.deleteMany({
//             where: {
//                 documentId: docId,
//             },
//         });
//         await prisma.document.delete({
//             where: {
//                 id: docId,
//             },
//         });
//         revalidatePath("/documents");
//         return NextResponse.json("Document deleted successfully", { status: 200 });
//     } catch (error) {
//         if (error instanceof z.ZodError) {
//             console.error('Validation error:', error.errors);
//             return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
//         } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
//             console.error('Prisma known request error:', error);
//             return NextResponse.json({ error: 'Known request error occurred' }, { status: 400 });
//         } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
//             console.error('Prisma unknown request error:', error);
//             return NextResponse.json({ error: 'Unknown request error occurred' }, { status: 500 });
//         } else if (error instanceof Prisma.PrismaClientRustPanicError) {
//             console.error('Prisma Rust panic error:', error);
//             return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//         } else if (error instanceof Prisma.PrismaClientInitializationError) {
//             console.error('Prisma initialization error:', error);
//             return NextResponse.json({ error: 'Initialization error occurred' }, { status: 500 });
//         } else if (error instanceof Prisma.PrismaClientValidationError) {
//             console.error('Prisma validation error:', error);
//             return NextResponse.json({ error: 'Validation error occurred' }, { status: 400 });
//         }
//         console.error('Unexpected error:', error);
//         return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
//     }
// }

