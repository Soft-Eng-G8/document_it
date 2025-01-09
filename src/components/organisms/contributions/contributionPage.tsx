'use client'
import Button from "@/components/atom/button"
import { useState } from "react"
import { ContributionCard } from "./contributionCard"



export const ContributionPage = () => {
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