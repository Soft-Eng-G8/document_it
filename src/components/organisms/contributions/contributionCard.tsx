import { FileCheck2, ChevronRight } from "lucide-react"
import Image from "next/image"


export const ContributionCard = () => {


  return (
    <div className="flex justify-between h-32 my-4">
      <div className="flex items-center">
        <div className="bg-white relative h-full aspect-square mr-10 shadow-xl rounded-lg">
          <Image src={'/ensia.png'} alt="contribution icon" fill/>
        </div>
        <div className="">
          <p className="text-black">Sample doc 1</p>
          <p className="text-gray-400">23 Dec 2024</p>
        </div>
      </div>

      <div className="flex flex-row items-center
        text-yellow-400
      ">
        <span className="text-xl">Pending</span>
        <FileCheck2 className="mx-4" size={64}/>
        <ChevronRight className="" size={32}/>
      </div>
    </div>
  )
}