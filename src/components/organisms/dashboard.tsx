import prisma from "@/lib/db"
import DashboardWidget from "../molecules/dashboardWidget"
import { migrateDocument, structureCategories, structureDocuments } from "@/scripts/util"


const DashboardView = async () => {
  const categories_data = await prisma.category.findMany()
  const categories_without_docs = structureCategories(categories_data)

  const document_data = await prisma.document.findMany()
  const documents = document_data.map(doc => migrateDocument(doc))
  const categories = structureDocuments(document_data, categories_without_docs)

  // console.log(categories)
  return (
    <div className="
    grid grid-cols-3 gap-12
    ">
      <DashboardWidget type="category" data={categories}/>
      <DashboardWidget type="document" data={documents}/>
    </div>
  )
}


export default DashboardView