import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { pinata } from '@/app/utils/config';
import { IDocument, verifyToken } from '@/scripts/util';

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
    const { decodedToken, error } = await verifyToken(request)
    if(error) return new Response(error, {status: 403})
    
    try {
        const data = await request.formData();
        const origin = await request.headers.get('origin');
        const url = `${origin}/api/documents`;
        const files = data.getAll('files') as File[];
        const requirement = data.getAll('requirements') as string[]

        const formData: FormData = {
            title: data.get('title') as string,
            additionalOrg: data.get('additionalOrg') as string,
            categoryId: data.get('categoryId') as string,
            description: data.get('description') as string,
            requirements: requirement,
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
        console.log("logo uploaded!");
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
        console.log("pdf uploaded!");

        // Prepare data for principal document creation route
        const documentData = {
            title: formData.title,
            description: formData.description,
            categoryId: 1,
            content: formData.additionalContent,
            additional: formData.additionalOrg,
            imageUrl: logoUrl,
            
            pdfUrl: pdfUrl,
            userId: 'cm4mvzbo80000o508rtgb0x9s', // Replace with actual user ID
            requirements: formData.requirements.map((req) => ({
                title: req,
                description: req,
                status: 'pending', // Replace with actual status
                type: 'type',      // Replace with actual type
            })),
        };
        // Send data to principal document creation route
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(documentData),
        });
        console.log("data sent to principal document creation route!");
        if (!response.ok) {
            const detail = await response?.statusText;
            // console.error('Error:', error);
            return NextResponse.json({ error: 'Failed to create document', details: detail }, { status: 500 });
        }
        return NextResponse.json({ message: 'Document created successfully' }, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            //console.error('Validation error:', error.errors);
            return NextResponse.json(
                { error: 'Validation error', details: error.errors },
                { status: 400 }
            );
        } else {
            //console.error('Unexpected error:', error);
            return NextResponse.json({ error: 'Unexpected error occurred',details: error}, { status: 500 });
        }
    }
}