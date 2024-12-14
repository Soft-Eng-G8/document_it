import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { pinata } from '@/app/utils/config';

const formDataSchema = z.object({
    title: z.string(),
    additionalOrg: z.string(),
    categoryId: z.string(),
    description: z.string(),
    requirements: z.array(z.string()),
    additionalContent: z.string(),
    logo: z.instanceof(File).nullable(),
    files: z.array(z.instanceof(File)).optional(), // Updated to optional array
});

type FormData = z.infer<typeof formDataSchema>;

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        console.log(data);

        // Get the files array, which might be empty
        const files = data.getAll('files') as File[];

        const formData: FormData = {
            title: data.get('title') as string,
            additionalOrg: data.get('additionalOrg') as string,
            categoryId: data.get('categoryId') as string,
            description: data.get('description') as string,
            requirements: JSON.parse(data.get('requirements') as string),
            additionalContent: data.get('additionalContent') as string,
            logo: data.get('logo') as File,
            files: files.length > 0 ? files : undefined, // Assign if not empty
        };

        formDataSchema.parse(formData);

        // Upload logo if present
        let logoUrl: string | null = null;
        if (formData.logo) {
            const logoUploadData = await pinata.upload.file(formData.logo);
            logoUrl = await pinata.gateways.createSignedURL({
                cid: logoUploadData.cid,
                expires: 3600 * 24 * 14,
            });
        }

        // Upload first file if files array is not empty
        let pdfUrl: string | null = null;
        if (formData.files && formData.files.length > 0) {
            const firstFile = formData.files[0];
            const fileUploadData = await pinata.upload.file(firstFile);
            pdfUrl = await pinata.gateways.createSignedURL({
                cid: fileUploadData.cid,
                expires: 3600 * 24 * 14,
            });
        }

        // Prepare data for principal document creation route
        const documentData = {
            title: formData.title,
            description: formData.description,
            categoryId: parseInt(formData.categoryId, 10),
            content: formData.additionalContent,
            additional: formData.additionalOrg,
            imageUrl: logoUrl,
            pdfUrl: pdfUrl,
            addedBy: 'user-id', // Replace with actual user ID
            requirements: formData.requirements.map((req) => ({
                title: req,
                description: req,
                status: 'pending', // Replace with actual status
                type: 'type',      // Replace with actual type
            })),
        };

        // Send data to principal document creation route
        const response = await fetch('/api/documents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(documentData),
        });

        if (!response.ok) {
            throw new Error('Failed to create document');
        }

        return NextResponse.json({ message: 'Document created successfully' }, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Validation error:', error.errors);
            return NextResponse.json(
                { error: 'Validation error', details: error.errors },
                { status: 400 }
            );
        } else {
            console.error('Unexpected error:', error);
            return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
        }
    }
}