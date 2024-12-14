import prisma from '@/lib/db'
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod';

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

type CreateDocumentRequestBody = z.infer<typeof createDocumentSchema>;

export async function POST(request: NextRequest) {
    try {
        const myobj = await request.json() as CreateDocumentRequestBody;
        const { title, description, categoryId, content, additional, imageUrl, addedBy, requirements,pdfUrl } = myobj;
        createDocumentSchema.parse(myobj);
        const doc = await prisma.document.create({
            data: {
                title: title,
                description: description,
                categoryId: categoryId,
                content: content,
                additional: additional,
                imageUrl: imageUrl,
                userId: addedBy,
                pdfUrl: pdfUrl,
            },
        });
        for (const req of requirements) {
            await prisma.requirement.create({
                data: {
                    title: req.title,
                    description: req.description,
                    status: req.status,
                    type: req.type,
                    documentId: doc.id,
                },
            });
        }
        revalidatePath("/documents");
        return NextResponse.json("Document created  successfully", { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            //console.error('Validation error:', error.errors);
            return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
        } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
            //console.error('Prisma known request error:', error);
            return NextResponse.json({ error: 'Known request error occurred', 
                details: error.message
            }, { status: 400 });
        } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
            //console.error('Prisma unknown request error:', error);
            return NextResponse.json({ error: 'Unknown request error occurred'}, { status: 500 });
        } else if (error instanceof Prisma.PrismaClientRustPanicError) {
            //console.error('Prisma Rust panic error:', error);
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        } else if (error instanceof Prisma.PrismaClientInitializationError) {
            //console.error('Prisma initialization error:', error);
            return NextResponse.json({ error: 'Initialization error occurred' }, { status: 500 });
        } else if (error instanceof Prisma.PrismaClientValidationError) {
            //console.error('Prisma validation error:', error);
            return NextResponse.json({ error: 'Validation error occurred',details: error.message}, { status: 400 });
        } else {
            //console.error('Unexpected error:', error);
            return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
        }
    }
}


const updateDocumentSchema = z.object({
    docId: z.number(),
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

type UpdateDocumentRequestBody = z.infer<typeof updateDocumentSchema>;

export async function PUT(request: NextRequest) {
    try {
        const myobj = await request.json() as UpdateDocumentRequestBody;
        const { docId,title, description, categoryId, content, additional, imageUrl, addedBy, requirements } = myobj;
        updateDocumentSchema.parse(myobj);
        const doc = await prisma.document.update({
            where: {
                id: docId,
            },
            data: {
                title: title,
                description: description,
                categoryId: categoryId,
                content: content,
                additional: additional,
                imageUrl: imageUrl,
                userId: addedBy,
                pdfUrl: myobj.pdfUrl,
            },
        });
        await prisma.requirement.deleteMany({
            where: {
                documentId: doc.id,
            },
        });
        for (const req of requirements) {
            await prisma.requirement.create({
                data: {
                    title: req.title,
                    description: req.description,
                    status: req.status,
                    type: req.type,
                    documentId: doc.id,
                },
            });
        }
        revalidatePath("/documents");
        return NextResponse.json("Document updated successfully", { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Validation error:', error.errors);
            return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
        } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.error('Prisma known request error:', error);
            return NextResponse.json({ error: 'Known request error occurred' }, { status: 400 });
        } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
            console.error('Prisma unknown request error:', error);
            return NextResponse.json({ error: 'Unknown request error occurred' }, { status: 500 });
        } else if (error instanceof Prisma.PrismaClientRustPanicError) {
            console.error('Prisma Rust panic error:', error);
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        } else if (error instanceof Prisma.PrismaClientInitializationError) {
            console.error('Prisma initialization error:', error);
            return NextResponse.json({ error: 'Initialization error occurred' }, { status: 500 });
        } else if (error instanceof Prisma.PrismaClientValidationError) {
            console.error('Prisma validation error:', error);
            return NextResponse.json({ error: 'Validation error occurred' }, { status: 400 });
        }
        console.error('Unexpected error:', error);
        return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
    }
}

const deleteDocumentSchema = z.object({
    docId: z.number(),
});

type DeleteDocumentRequestBody = z.infer<typeof deleteDocumentSchema>;

export async function DELETE(request: NextRequest) {
    try {
        const myobj = await request.json() as DeleteDocumentRequestBody;
        const { docId } = myobj;
        deleteDocumentSchema.parse(myobj);
        await prisma.requirement.deleteMany({
            where: {
                documentId: docId,
            },
        });
        await prisma.document.delete({
            where: {
                id: docId,
            },
        });
        revalidatePath("/documents");
        return NextResponse.json("Document deleted successfully", { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Validation error:', error.errors);
            return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
        } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.error('Prisma known request error:', error);
            return NextResponse.json({ error: 'Known request error occurred' }, { status: 400 });
        } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
            console.error('Prisma unknown request error:', error);
            return NextResponse.json({ error: 'Unknown request error occurred' }, { status: 500 });
        } else if (error instanceof Prisma.PrismaClientRustPanicError) {
            console.error('Prisma Rust panic error:', error);
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        } else if (error instanceof Prisma.PrismaClientInitializationError) {
            console.error('Prisma initialization error:', error);
            return NextResponse.json({ error: 'Initialization error occurred' }, { status: 500 });
        } else if (error instanceof Prisma.PrismaClientValidationError) {
            console.error('Prisma validation error:', error);
            return NextResponse.json({ error: 'Validation error occurred' }, { status: 400 });
        }
        console.error('Unexpected error:', error);
        return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
    }
}

