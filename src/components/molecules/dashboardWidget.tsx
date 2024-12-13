import { Pencil } from "lucide-react"


const DashboardWidget = () => {


  return (
    <div className="
    p-6 rounded-xl bg-white
    ">
      <div className="flex justify-between">
        <p className="font-semibold">Current Categories</p>
        <Pencil />
      </div>
    </div>
  )
}


export default DashboardWidget