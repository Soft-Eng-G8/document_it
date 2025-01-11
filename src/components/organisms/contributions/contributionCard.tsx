import { ProperContribution } from "@/app/contributions/contView"
import { FileCheck2, ChevronRight } from "lucide-react"
import Image from "next/image"


export const ContributionCard = ({ contribution }: { contribution: ProperContribution }) => {


  return (
    <div className="flex justify-between h-32 my-4">
      <div className="flex items-center">
        <div className="bg-white relative h-full aspect-square mr-10 shadow-xl rounded-lg">
          <Image src={contribution.newImageURL!} alt="contribution icon" fill/>
        </div>
        <div className="">
          <p className="text-black">{contribution.newTitle}</p>
          <p className="text-gray-400">{contribution.createdAt.toDateString()}</p>
        </div>
      </div>

      <div className="flex flex-row items-center
        text-yellow-400
      ">
        <span className="text-xl first-letter:uppercase">{contribution.status.toLowerCase()}</span>
        <FileCheck2 className="mx-4" size={64}/>
        <ChevronRight className="" size={32}/>
      </div>
    </div>
  )
}