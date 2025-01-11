import CategoryComponents from '@/components/ui/single_use/category/categoriesComponents'
import prisma from '@/lib/db';


export default async function category({params}: { params: { id: string } }) {

  const category = await prisma.category.findFirst({
          where: {
            id: params.id.toString()
          }
        });
  
      const documents = await prisma.document.findMany({
          where: {
            categoryId: params.id.toString()
          }
        });
  return (
    <div>
    <CategoryComponents documents={documents} category={category} />
    </div>
  )
}

