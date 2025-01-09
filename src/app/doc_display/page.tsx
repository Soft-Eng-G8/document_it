import React from 'react'
import MainInfoPannel from '@/components/ui/single_use/doc_display/main_info_pannel'
import LittleTags from '@/components/ui/single_use/doc_display/little_tags'
import SideDescription from '@/components/ui/single_use/doc_display/side_description'
import { Info } from 'lucide-react'
import InfoPannel from '@/components/ui/single_use/doc_display/info_display'
import AttachedFiles from '@/components/ui/single_use/doc_display/attached_files'
import { Navbar } from '@/components/ui/multiple_uses/navbar'
import DisplayEdit from '@/components/ui/single_use/doc_display/display_edit'

function DocDisplay() {
  const reqs = ["Copie du titre proprietaire en vigueur",
     "Ou Contrat de Location ou la dernier quittance de loyer",
      "ou Coupie de d'affectation pour le logement de fonction ou de service ",
    "ou Derniere quittance des services de la SOZELGAZ",
  "ou Derniere quittance des services des EAUX et de TELEPHONE",
    "ou Carte d'eleceteur",
    "ou Certificat d'hebergement",
    "Autre document officiel justifiant l'occuption de logement"
]
  const docName = "Residence"
  const subHeader = "APC"
  const smallCardText = ""
  const logoUrl = "https://i.ibb.co/VLjJjLg/ljomhorya.png"
  const tagsContent = ["Category", "Date", "File"]
  const description = "Le Certificat de Résidence est un document officiel attestant du lieu de résidence habituelle d’une personne. Il est délivré par les autorités locales (comme la mairie ou l’administration compétente) et sert de preuve de domicile pour diverses démarches administratives."
  const observations = "Observation 1"
  return (
    //fix navbar later
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
