import { FileText } from "lucide-react"
import Link from "next/link"


interface IDocumentButton {
  title: string
  link: string
}

const DocumentButton = (props: IDocumentButton) => {


  return (
    <Link href={props.link}>
      <div className="px-2 py-1">
        <FileText className="inline-block mr-3"/>
        {props.title}
      </div>
    </Link>
  )
}