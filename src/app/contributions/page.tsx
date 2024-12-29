import Button from "@/components/atom/button"
import { ContributionPage } from "@/components/organisms/contributions/contributionPage"
import { ChevronRight, FileCheck2 } from "lucide-react"
import { getServerSession } from "next-auth"
import Image from "next/image"
import { useState } from "react"



const Contributions = async() => {
  const session = await getServerSession()
  
  return (
    <ContributionPage/>
  )
}





export default Contributions