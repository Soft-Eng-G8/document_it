"use server";

import prisma from "@/lib/db";
import { data } from "react-router-dom";

export async function createRoleTest(formData: FormData) {
    await prisma.role.create({
        data: {
            name: formData.get('name') as string
        }
    })
}