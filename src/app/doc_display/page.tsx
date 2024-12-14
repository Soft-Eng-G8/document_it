import React from 'react'
import MainInfoPannel from '@/components/ui/single_use/doc_display/main_info_pannel'
import LittleTags from '@/components/ui/single_use/doc_display/little_tags'
import SideDescription from '@/components/ui/single_use/doc_display/side_description'
import { Info } from 'lucide-react'
import InfoPannel from '@/components/ui/single_use/doc_display/info_display'
import AttachedFiles from '@/components/ui/single_use/doc_display/attached_files'
import { Navbar } from '@/components/ui/multiple_uses/navbar'

function DocDisplay() {
  const reqs = ["Requirement 1", "Requirement 2", "Requirement 3"]
  const docName = "Document Name"
  const subHeader = "This is a subheader"
  const smallCardText = "Small"
  const logoUrl = "https://www.ensia.edu.dz/wp-content/uploads/2023/03/ensia-new-logo-1-e1677764094479.png"
  const tagsContent = ["Category", "Date", "File"]
  const description = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo saepe aliquid animi similique tempore, blanditiis vitae sapiente sint possimus maiores, eius id nobis, ex dolores. Accusamus blanditiis libero non iusto."
  const observations = "Observation 1"
  return (
    <div className="h-screen overflow-y-auto bg-mygrey">
      <div className="sticky top-0 w-full z-50  p-4">
        <div className="flex justify-center">
          <Navbar />
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
      
    </div>
    
  </div>
    
  )
}

export default DocDisplay
