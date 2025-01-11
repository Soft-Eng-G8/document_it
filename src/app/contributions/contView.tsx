'use client'

import { ContributionCard } from "@/components/organisms/contributions/contributionCard"
import { Contribution } from "@prisma/client"
import { useState } from "react"

export type ProperContribution = {
  user: {
        id: string;
        createdAt: Date;
        name: string;
        username: string;
        email: string | null;
        hashedPassword: string;
        accountId: string | null;
    };
  } & Contribution

const ContributionView = ({contributions}: { contributions : ProperContribution[] }) => {
  const cont_categories = ['All', 'Accepted', 'Pending', 'Rejected']
  const [selectedCat, setSelectedCat] = useState(0)


return <div className="mt-10">
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
        contribution={cont}
        />
      )}
    </div>
  </div>
}

export default ContributionView