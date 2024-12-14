import { Folder } from "lucide-react"
import Link from "next/link"

interface ICategoryButton {
  title: string
  link: string
}

const CategoryButton = (props: ICategoryButton) => {


  return (
    <Link href={props.link}>
      <div className="px-2 py-1">
        <Folder className="inline-block mr-3"/>
        {props.title}
      </div>
    </Link>
  )
}