import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/multiple_uses/resizable";
import React from 'react'

interface MainInfoProps {
  docName: string;
  description: string;
  cardText: string;
  logo ?: string;
}

function MainInfoPannel({ docName, description, cardText, logo }: MainInfoProps) {
  const logoUrl = logo ? logo : "https://www.ensia.edu.dz/wp-content/uploads/2023/03/ensia-new-logo-1-e1677764094479.png"
  return (
    <div className="h-3/4">
  <ResizablePanelGroup
    direction="horizontal"
    className="
      max-w-screen-lg md:min-w-[450px] shadow-xl rounded-lg bg-mywhite
    "
  >
    <ResizablePanel defaultSize={75}>
      <div className="relative h-full min-h-80">
        <h1 className="font-bold text-2xl text-black ml-10 mt-20">{docName}</h1>
        <h1 className="font-thin text-md text-gray-400 ml-10 mt-2">{description}</h1>

        <div className="text-black absolute bottom-20 rounded-tr-3xl rounded-tl-3xl
        bg-foreground h-20 w-40 ml-20 flex justify-center items-center">
          <p className=" text-lg text-mywhite">{cardText}</p>
        </div>
        
      </div>
    </ResizablePanel>
    <ResizablePanel defaultSize={25} className="flex justify-center items-center ">
      <div className="h-40 w-60 bg-mygrey rounded-lg flex items-center justify-center">
        <img
          src={logoUrl}
          alt="Placeholder"
          className="h-32 w-32 object-cover rounded-full"
        />
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>
</div>
  )
}

export default MainInfoPannel
