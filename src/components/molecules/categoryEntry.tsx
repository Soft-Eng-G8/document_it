"use client"

import { ICategory,  IDocument, widgetTypes } from "@/scripts/util"
import { ChartBarStacked, FileText, Folder, Pencil, Plus, Trash2 } from "lucide-react"
import { ReactNode, useState } from "react"
import { useRouter } from "next/navigation"; // Import useRouter


interface IItemEntry {
  item: ICategory | IDocument
  compact: boolean
  type: widgetTypes
}

const ItemEntry = ({item, compact, type}: IItemEntry) => {
  const [collapsed, setCollapsed] = useState(true)
  console.log(type, item)
  const router = useRouter(); // Use the router instance
  const handleDocumentClick = () => {
    if (type === "document") {
      router.push(`/doc_display/${item.id}`); // Navigate to a document-specific page
    }
  };
  return (
    <div className="item_entry mb">
      <div className={`
      w-full bg-foreground  border rounded-lg p-${['all', 'category'].includes(type) ? 5 : 2} 
      text-white text-xl ${['all', 'category'].includes(type) ? `font-bold` : ''} 
      flex items-center mt-3 ${!compact ? 'justify-between': ''}
      cursor-pointer
      `}
      onClick={() => {
        if (type === "category") setCollapsed(!collapsed); // Toggle collapse for categories
        if (type === "document") handleDocumentClick(); // Navigate for documents
      }}
      >
        <div>
          {type === 'category' ?
            (item as ICategory).categories.length ?
            <Folder className="inline-block mr-3"/> :
            <ChartBarStacked className="inline-block mr-3"/>
          :
          <FileText className="inline-block mr-3"/>
          }
          {item.title}
        </div>
        {!compact ? <div>
          <Plus className="inline-block mr-2"/>
          <Pencil className="inline-block mr-2"/>
          <Trash2 className="inline-block mr-2"/>

        </div> : ''}
      </div>
      <div className={`
        pl-10 space-y-3 overflow-hidden ${collapsed ? "max-h-0" : ""}
        transition-all duration-200
      `}>
      {type === 'category' ? (item as ICategory)?.categories?.map(item => (
        <ItemEntry key={item.id} item={item} compact type={'category'}/>
      )) : ''}
       {
        // @ts-ignore
       item.documents?.length ? (item as ICategory)?.documents?.map(item => (
        <ItemEntry key={item.id} item={item} compact type="document"/>
      )) : ''
      }
      </div>

    </div>
  )
}

export default ItemEntry