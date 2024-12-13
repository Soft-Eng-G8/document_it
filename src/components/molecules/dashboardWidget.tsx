import { ICategory, IDocument, widgetTypes } from "@/scripts/util"
import { Pencil } from "lucide-react"
import ItemTree from "../organisms/categories/categoryTree"

interface IDashboardWidget {
  type: widgetTypes
  data: ICategory[] | IDocument[]
}

const DashboardWidget = (props: IDashboardWidget) => {


  return (
    <div className="
    p-6 rounded-xl bg-white
    ">
      <div className="font-semibold">Current {props.type === "category" ? 'Documents' : 'Documents'}</div>
      <ItemTree type={props.type}items={props.data} compact={false}/>
    </div>
  )
}


export default DashboardWidget