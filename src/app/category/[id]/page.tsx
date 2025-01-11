import CategoryComponents from '@/components/ui/single_use/category/categoriesComponents'
import prisma from '@/lib/db';


export default async function category({params}: { params: { id: number } }) {

  const category = await prisma.category.findFirst({
          where: {
            id: parseInt(params.id.toString(), 10)
          }
        });
  
      const documents = await prisma.document.findMany({
          where: {
            categoryId: parseInt(params.id.toString(), 10)
          }
        });
  return (
    <div>
    <CategoryComponents documents={documents} category={category} />
    </div>
  )
}

