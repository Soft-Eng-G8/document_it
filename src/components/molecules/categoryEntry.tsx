"use client"

import { FileText, Folder } from "lucide-react"
import { ReactNode, useState } from "react"
import { Category } from "../organisms/categories/interfaces"

interface ICategoryEntry {
  category: Category
}

const CategoryEntry = ({category}: ICategoryEntry) => {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <div className="category_entry mb-5">
      <div className={`
      w-full bg-blue-600  border rounded-lg p-${category.Categories.length ? 5 : 2} 
      text-white text-xl ${category.Categories.length ? `font-bold` : ''} 
      flex items-center mt-3
      cursor-pointer
      `}
      onClick={() => setCollapsed(!collapsed)}
      >
        {category.Categories.length ?
        <Folder className="inline-block mr-3"/> :
        <FileText className="inline-block mr-3"/>
        }
        {category.Title}
      </div>
      <div className={`
        pl-10 space-y-3 overflow-hidden ${collapsed ? "max-h-0" : ""}
        transition-all duration-200
      `}>
      {category.Categories.map(category => (
        <CategoryEntry category={category}/>
      ))}
      </div>

    </div>
  )
}

export default CategoryEntry