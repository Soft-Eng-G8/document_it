
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from 'next/server';

interface CreateCategoryRequestBody {
    imgUrl: string;
    title: string;
    description: string;
    categoryParentId: number | null;
}

export async function POST(request: NextRequest) {
    try {
        const myobj = await request.json() as CreateCategoryRequestBody;
        const { imgUrl, title, description, categoryParentId } = myobj;
        await prisma.category.create({
            data: {
                title: title,
                description: description,
                imageUrl: imgUrl,
                categoryId: categoryParentId,
            },
        });
        revalidatePath("/categories");
        return NextResponse.json("Category created  successfully", { status: 200 });
    } catch (error) {
        console.error('Error creating category:', error);
        return NextResponse.json({ error: 'Error creating category' }, { status: 500 });
    }
}


interface UpdateCategoryRequestBody {
    categoryId: number;
    imgUrl: string;
    title: string;
    description: string;
    categoryParentId: number | null;
}

export async function PUT(request: NextRequest) {
    try {
        const myobj = await request.json() as UpdateCategoryRequestBody;
        const { categoryId, imgUrl, title, description, categoryParentId } = myobj;
        await prisma.category.update({
            where: {
                id: categoryId,
            },
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
        console.error('Error updating category:', error);
        return NextResponse.json({ error: 'Error updating category' }, { status: 500 });
    }
}

interface DeleteCategoryRequestBody {
    categoryId: number;
}

export async function DELETE(request: NextRequest) {
    try {
        const myobj = await request.json() as DeleteCategoryRequestBody;
        const { categoryId } = myobj;
        await prisma.category.delete({
            where: {
                id: categoryId,
            },
        });
        revalidatePath("/categories");
        return NextResponse.json("Category deleted successfully", { status: 200 });
    } catch (error) {
        console.error('Error deleting category:', error);
        return NextResponse.json({ error: 'Error deleting category' }, { status: 500 });
    }
}