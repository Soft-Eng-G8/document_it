import ItemTree from '@/components/organisms/categories/categoryTree'
import Header from '@/components/ui/single_use/dashboard/header'
import Footer from '@/components/ui/single_use/home/footer'
import prisma from '@/lib/db'
import { structureCategories, structureDocuments } from '@/scripts/util'


export default async () => {
  const categories_data = await prisma.category.findMany()
  const categories_without_docs = structureCategories(categories_data)

  const document_data = await prisma.document.findMany()
  const categories = structureDocuments(document_data, categories_without_docs)

  return (
  <div className='bg-gray-300'>
    <Header/>
    <header id="heading" className="py-28"> 
      <h1 className="
      text-center text-8xl 
    ">Categories</h1>
    </header>
    <section className="w-[80vw] m-auto p-5 bg-slate-100 rounded-lg mb-32 shadow-lg">
      <ItemTree items={categories} compact type='category'/>
    </section>

    <Footer/>
  </div>
  )
}