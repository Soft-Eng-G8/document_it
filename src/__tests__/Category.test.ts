import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { POST, PUT, DELETE } from '@/app/api/categories/route';


jest.mock('@/lib/db', () => ({
  category: {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));


jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

describe('Category API Endpoints', () => {
  const mockRequest = (body: any) => ({
    json: jest.fn().mockResolvedValue(body),
  }) as unknown as NextRequest;

  it('should create a category', async () => {
    const requestBody = {
      imgUrl: 'http://example.com/image.jpg',
      title: 'New Category',
      description: 'Description of the category',
      categoryParentId: null,
    };

    const mockCreate = prisma.category.create as jest.Mock;
    mockCreate.mockResolvedValueOnce({ ...requestBody, id: 1 });

    const response = await POST(mockRequest(requestBody));

    
    const responseBody = await response.json(); 

    expect(mockCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({
        title: 'New Category',
        description: 'Description of the category',
        imageUrl: 'http://example.com/image.jpg',
        categoryId: null,
      }),
    });

    expect(response.status).toBe(200);
    expect(responseBody).toBe('Category created successfully');
  });

  it('should update a category', async () => {
    const requestBody = {
      id: 1,
      imgUrl: 'http://example.com/image-updated.jpg',
      title: 'Updated Category',
      description: 'Updated description',
      categoryParentId: null,
    };

    const mockUpdate = prisma.category.update as jest.Mock;
    mockUpdate.mockResolvedValueOnce({ ...requestBody });

    const response = await PUT(mockRequest(requestBody));

   
    const responseBody = await response.json(); 

    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: 1 },
      data: expect.objectContaining({
        title: 'Updated Category',
        description: 'Updated description',
        imageUrl: 'http://example.com/image-updated.jpg',
        categoryId: null,
      }),
    });

    expect(response.status).toBe(200);
    expect(responseBody).toBe('Category updated successfully');
  });

  it('should delete a category', async () => {
    const requestBody = { id: 1 };

    const mockDelete = prisma.category.delete as jest.Mock;
    mockDelete.mockResolvedValueOnce({ id: 1 });

    const response = await DELETE(mockRequest(requestBody));

  
    const responseBody = await response.json();

    expect(mockDelete).toHaveBeenCalledWith({ where: { id: 1 } });

    expect(response.status).toBe(200);
    expect(responseBody).toBe('Category deleted successfully');
  });
});
