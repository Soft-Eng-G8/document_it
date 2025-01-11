import React from 'react'
import MainInfoPannel from '@/components/ui/single_use/doc_display/main_info_pannel'
import LittleTags from '@/components/ui/single_use/doc_display/little_tags'
import SideDescription from '@/components/ui/single_use/doc_display/side_description'
import { Info } from 'lucide-react'
import InfoPannel from '@/components/ui/single_use/doc_display/info_display'
import AttachedFiles from '@/components/ui/single_use/doc_display/attached_files'
import { Navbar } from '@/components/ui/multiple_uses/navbar'
import DisplayEdit from '@/components/ui/single_use/doc_display/display_edit'
import Header from '@/components/ui/single_use/dashboard/header'
import prisma from '@/lib/db'

async function DocDisplay({params}: { params: { id: number } }) {
const document = await prisma.document.findFirst({
    where:{
        id: params.id.toString()
    },
    include:{
        category: true,
        requirements: true
    }
})

  const reqs = document?.requirements.map(req => req.description) ?? ["Requirement 1", "Requirement 2", "Requirement 3"]
  const docName = document?.title ?? "Residence"
  const subHeader = document?.category?.title ?? "APC"
  const smallCardText = ""
  const logoUrl = document?.imageUrl ?? "https://i.ibb.co/VLjJjLg/ljomhorya.png"
  const tagsContent = ["Category", "Date", "File"]
  const description = document?.description ?? "Le Certificat de Résidence est un document officiel attestant du lieu de résidence habituelle d’une personne. Il est délivré par les autorités locales (comme la mairie ou l’administration compétente) et sert de preuve de domicile pour diverses démarches administratives."
 // const observations = document?.description ?? "Observation 1"

  

  return (
    <div className="h-screen overflow-y-auto bg-mygrey">
      <div className="sticky top-0 w-full z-50  p-4">
        <div className="flex justify-center">
          <div></div>
        </div>
      </div>
      
    <div className="flex flex-col lg:flex-row  bg-mygrey">
      <div className="flex flex-col flex-1 p-4 space-y-10 bg-mygrey lg:ml-20 lg:mr-10">
        <MainInfoPannel docName={docName} description={subHeader} cardText={smallCardText} logo={logoUrl}/>
  
        <LittleTags items={tagsContent}/>
      </div>
  
      <div className="w-full lg:mr-20 lg:w-1/3 bg-grey flex flex-col p-4 lg">
        <SideDescription text={description}/>
      </div>
    </div>
  
    <div className='p-4'>
      <div className='mb-5'>
        <InfoPannel title={"Requirements"} items={reqs} />
      </div>
      
      <div className='mb-5'>
        <InfoPannel title={"Observations"} />
      </div>
      <div className='mb-5'>
        <AttachedFiles/>
      </div>
      <div>
        <DisplayEdit/>
      </div>
    </div>
    
  </div>
    
  )
}

export default DocDisplay
