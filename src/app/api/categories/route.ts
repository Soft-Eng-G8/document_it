import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Prisma } from '@prisma/client';
import { z } from 'zod';

const createCategorySchema = z.object({
    imgUrl: z.string(),
    title: z.string(),
    description: z.string(),
    categoryParentId: z.number().nullable(),
});

const updateCategorySchema = z.object({
    id: z.number(),
    imgUrl: z.string(),
    title: z.string(),
    description: z.string(),
    categoryParentId: z.number().nullable(),
});

const deleteCategorySchema = z.object({
    id: z.number(),
});

type CreateCategoryRequestBody = z.infer<typeof createCategorySchema>;
type UpdateCategoryRequestBody = z.infer<typeof updateCategorySchema>;
type DeleteCategoryRequestBody = z.infer<typeof deleteCategorySchema>;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        createCategorySchema.parse(body);
        const { imgUrl, title, description, categoryParentId } = body as CreateCategoryRequestBody;

        await prisma.category.create({
            data: {
                title: title,
                description: description,
                imageUrl: imgUrl,
                categoryId: categoryParentId,
            },
        });

        revalidatePath("/categories");
        return NextResponse.json("Category created successfully", { status: 200 });
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
        } else {
            console.error('Unexpected error:', error);
            return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
        }
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        updateCategorySchema.parse(body);
        const { id, imgUrl, title, description, categoryParentId } = body as UpdateCategoryRequestBody;

        await prisma.category.update({
            where: { id: id },
            data: {
                title: title,
                description: description,
                imageUrl: imgUrl,
                categoryId: categoryParentId,
            },
        });

        revalidatePath("/categories");
        return NextResponse.json("Category updated successfully", { status: 200 });
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
        } else {
            console.error('Unexpected error:', error);
            return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
        }
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        deleteCategorySchema.parse(body);
        const { id } = body as DeleteCategoryRequestBody;

        await prisma.category.delete({
            where: { id: id },
        });

        revalidatePath("/categories");
        return NextResponse.json("Category deleted successfully", { status: 200 });
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
        } else {
            console.error('Unexpected error:', error);
            return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
        }
    }
}