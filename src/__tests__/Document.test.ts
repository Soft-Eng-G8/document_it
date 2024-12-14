import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { POST, PUT, DELETE } from '@/app/api/documents/route';

jest.mock('@/lib/db', () => ({
  document: {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  requirement: {
    create: jest.fn(),
    deleteMany: jest.fn(),
  },
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

describe('Document API Endpoints', () => {
  const mockRequest = (body: any) => ({
    json: jest.fn().mockResolvedValue(body),
  }) as unknown as NextRequest;

  const addedBy = 'cm4mkotqd00007k64f5vgoss3';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a document', async () => {
    const requestBody = {
      title: 'Test Document',
      description: 'Test Description',
      categoryId: 1,
      content: 'Test Content',
      additional: 'Test Additional',
      imageUrl: 'http://example.com/image.png',
      pdfUrl: 'http://example.com/document.pdf',
      addedBy,
      requirements: [
        {
          title: 'Requirement 1',
          description: 'Test Requirement',
          status: 'in-progress',
          type: 'type1',
        },
      ],
    };

    const mockCreate = prisma.document.create as jest.Mock;
    const mockRequirementCreate = prisma.requirement.create as jest.Mock;
    mockCreate.mockResolvedValueOnce({ id: 1, ...requestBody });
    mockRequirementCreate.mockResolvedValueOnce({});

    const response = await POST(mockRequest(requestBody));
    const responseBody = await response.json();

    expect(mockCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({
        title: 'Test Document',
        description: 'Test Description',
        categoryId: 1,
        content: 'Test Content',
        additional: 'Test Additional',
        imageUrl: 'http://example.com/image.png',
        pdfUrl: 'http://example.com/document.pdf',
        userId: addedBy,
      }),
    });

    expect(mockRequirementCreate).toHaveBeenCalledTimes(1);

    expect(response.status).toBe(200);
    expect(responseBody).toBe('Document created successfully'); // Ensure no extra spaces
  });

  it('should update a document', async () => {
    const requestBody = {
      docId: 1,
      title: 'Updated Test Document',
      description: 'Updated Test Description',
      categoryId: 1,
      content: 'Updated Content',
      additional: 'Updated Additional',
      imageUrl: 'http://example.com/updated-image.png',
      pdfUrl: 'http://example.com/updated-document.pdf',
      addedBy,
      requirements: [
        {
          title: 'Updated Requirement',
          description: 'Updated Requirement Description',
          status: 'completed',
          type: 'type2',
        },
      ],
    };

    const mockUpdate = prisma.document.update as jest.Mock;
    const mockDeleteRequirements = prisma.requirement.deleteMany as jest.Mock;
    const mockCreateRequirement = prisma.requirement.create as jest.Mock;

    mockUpdate.mockResolvedValueOnce({ id: requestBody.docId, ...requestBody });
    mockDeleteRequirements.mockResolvedValueOnce({ count: 1 });
    mockCreateRequirement.mockResolvedValueOnce({});

    const response = await PUT(mockRequest(requestBody));
    const responseBody = await response.json();

    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: requestBody.docId },
      data: expect.objectContaining({
        title: 'Updated Test Document',
        description: 'Updated Test Description',
        categoryId: 1,
        content: 'Updated Content',
        additional: 'Updated Additional',
        imageUrl: 'http://example.com/updated-image.png',
        pdfUrl: 'http://example.com/updated-document.pdf',
        userId: addedBy,
      }),
    });

    expect(mockDeleteRequirements).toHaveBeenCalledTimes(1);
    expect(mockCreateRequirement).toHaveBeenCalledTimes(1); // Called exactly once

    expect(response.status).toBe(200);
    expect(responseBody).toBe('Document updated successfully');
  });

  it('should delete a document', async () => {
    const requestBody = { docId: 1 };

    const mockDelete = prisma.document.delete as jest.Mock;
    const mockDeleteRequirements = prisma.requirement.deleteMany as jest.Mock;

    mockDelete.mockResolvedValueOnce({ id: requestBody.docId });
    mockDeleteRequirements.mockResolvedValueOnce({ count: 1 });

    const response = await DELETE(mockRequest(requestBody));
    const responseBody = await response.json();

    expect(mockDelete).toHaveBeenCalledWith({
      where: { id: requestBody.docId },
    });

    expect(mockDeleteRequirements).toHaveBeenCalledWith({
      where: { documentId: requestBody.docId },
    });

    expect(response.status).toBe(200);
    expect(responseBody).toBe('Document deleted successfully');
  });
});
