import React from 'react'

interface SideDescriptionProps {
  text?: string;
}

function SideDescription({text}: SideDescriptionProps ) {
  const description = text ? text : "a Widely used in the industry."
  return (
    <div className="flex-1 bg-mywhite rounded-xl shadow-md relative">
  <div className="ml-10 mt-20 mr-5 mb-10">
    <h1 className="font-bold text-2xl text-black">Description</h1>
    <div className="mb-5"></div>
    <h5 className="font-semibold text-md text-black">{description}</h5>
  </div>

  <div className="absolute bottom-0 left-0 w-full bg-foreground p-4 text-center rounded-b-xl">
    <p className="text-sm font-medium text-black"></p>
  </div>
</div>
  )
}

export default SideDescription
