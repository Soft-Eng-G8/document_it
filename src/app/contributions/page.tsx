'use client'
import Button from "@/components/atom/button"
import { ChevronRight, FileCheck2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"



const Contributions = () => {
  const cont_categories = ['All', 'Accepted', 'Pending', 'Rejected']
  const [selectedCat, setSelectedCat] = useState(0)
  
  return (
    <div className="w-[90vw] m-auto pt-20">
      <div className="w-full grid grid-cols-3">
        <div className="col-span-2">
          <div className="flex justify-between px-10">
            <h1 className="text-5xl text-black font-bold ">My Contributions</h1>
            <Button rounded>New Contribution</Button>
          </div>

          <div className="mt-10">
            {/* Contribution Nav */}
            <div className="
              border-[#2292E2] border-b-4
              flex 
            ">
            {cont_categories.map((cat, i) => 
              <button key={i} className={`
                p-3
                ${i == selectedCat ? 'font-bold text-black ': ''}
                hover:scale-110 transition-transform 
              `}
              onClick={() => setSelectedCat(i)}
              >
                {cat}
              </button> 
            )}
            </div>
            {/* Contribution List */}
            <div className="overflow-y-scroll h-[60vh] ">
              <ContributionCard/>
              <ContributionCard/>
              <ContributionCard/>
              <ContributionCard/>
              <ContributionCard/>
              <ContributionCard/>
              <ContributionCard/>
              <ContributionCard/>
              <ContributionCard/>
              <ContributionCard/>
              <ContributionCard/>
              <ContributionCard/>
              <ContributionCard/>
              <ContributionCard/>
            </div>
          </div>


        </div>
        <div className="px-16">
          <h1 className="text-black text-2xl font-bold">Helpful info</h1>
          <p className="text-gray-500 my-8">
            To Increase the chances of your submission 
            to be accepted you have to understand the system
            of ranks and badges that make our site operational
            and encourage more qualified people to contribute
            and even review contributions.
          </p>
          <Button rounded>Learn more</Button>
        </div>
      </div>
    </div>
  )
}

const ContributionCard = () => {


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



export default Contributions