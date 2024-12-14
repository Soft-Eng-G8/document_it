import DocsCreate from '@/components/ui/single_use/doc_create/create_doc'
import prisma from '@/lib/db'
import { structureCategories } from '@/scripts/util'
import React from 'react'

async function page()  {
  const categories = await prisma.category.findMany()
  const categoriesS = structureCategories(categories)
  return (
    <div>
      <DocsCreate categories={categoriesS}/>
    </div>
  )
}

export default page