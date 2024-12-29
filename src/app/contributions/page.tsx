'use client'
import {Button} from "@/components/ui/multiple_uses/button"
import { ChevronRight, FileCheck2 } from "lucide-react"
import { getServerSession } from "next-auth"
import Image from "next/image"
import { useState } from "react"



const Contributions = () => {
  const cont_categories = ['All', 'Accepted', 'Pending', 'Rejected']
  const [selectedCat, setSelectedCat] = useState(0)

  const contributions = [
    {
        documentName: "Visa Application",
        contributor: { name: "Arabet Hakim" },
        date: "2024-12-25",
        status: "Pending" as "Pending",
    },
    {
        documentName: "Visa Application",
        contributor: { name: "John Doe" },
        date: "2024-12-25",
        status: "Reviewed" as "Reviewed",
    },
    {
        documentName: "Visa Application",
        contributor: { name: "Arabet Hakim" },
        date: "2024-12-25",
        status: "Pending" as "Pending",
    },
    {
        documentName: "Visa Application",
        contributor: { name: "John Doe" },
        date: "2024-12-25",
        status: "Reviewed" as "Reviewed",
    },
    {
        documentName: "Visa Application",
        contributor: { name: "Arabet Hakim" },
        date: "2024-12-25",
        status: "Pending" as "Pending",
    },]
  
  return (
    <div className="w-[90vw] m-auto pt-20">
      <div className="w-full grid grid-cols-3">
        <div className="col-span-2">
          <div className="flex justify-between">
            <h1 className="text-3xl text-black font-bold ">My Contributions</h1>
            <Button className="rounded-full text-white pt-6 pb-6">New Contribution</Button>
            </div>

          <div className="mt-10">
            <div className="
              border-[#2292E2] border-b-2
              flex 
            ">
            {cont_categories.map((cat, i) => 
              <button key={i} className={`
                p-3
                ${i == selectedCat ? 'font-bold text-black text-[16px] ': 'text-[16px] '}
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
              {contributions.map((cont, index)=>
                <ContributionCard key={index} 
                documentName={cont.documentName}
                contributor={cont.contributor}
                date={cont.date}
                status={cont.status}
                />
              )}
            </div>
          </div>


        </div>
        <div className="px-16">
          <h1 className="text-black text-2xl font-bold">Helpful info</h1>
          <p className="text-neutral-500 my-8 text-[16px]">
            To Increase the chances of your submission 
            to be accepted you have to understand the system
            of ranks and badges that make our site operational
            and encourage more qualified people to contribute
            and even review contributions.
          </p>
          <Button className="rounded-full text-white pt-6 pb-6">Learn More</Button>
          </div>
      </div>
    </div>
  )
}

interface IContributionCard {
  documentName: string
  contributor: { name: string }
  date: string
  status: "Pending" | "Accepted" | "Rejected" | "Reviewed"
}

const ContributionCard = ({documentName, contributor, date, status}: IContributionCard ) => {


  return (
    <div className="flex justify-between h-20 my-4">
      <div className="flex items-center">
      <div className="bg-white relative h-full aspect-square mr-10 shadow-xl rounded-lg flex items-center justify-center">
        <Image 
          src={'/ensia.png'} 
          alt="contribution icon" 
          className="h-16 w-16 object-contain" 
          width={68} 
          height={68} 
        />
      </div>
        <div className="">
          <p className="text-black font-bold text-[16px] whitespace-nowrap">{documentName}</p>
          <p className="text-neutral-400 text-[14px] whitespace-nowrap">{date}</p>
        </div>
      </div>

      <div className="flex flex-row items-center
        text-black
      ">
        <ChevronRight className="" size={28}/>
      </div>
    </div>
  )
}



export default Contributions