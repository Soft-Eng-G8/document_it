import React from 'react'

interface InfoDisplayProps {
  title: string;
  items?: string[];
  obsvs?: string;
}

function InfoDisplay({ title, items, obsvs }: InfoDisplayProps) {
  const itemsList = items ? items : [""]
    return (
      <div className="relative p-4 bg-white shadow-xl rounded-lg bg-mywhite lg:ml-20 lg:mr-20">
        <div className="absolute top-0 left-0 bg-foreground text-white px-10 py-4 rounded-tl-lg rounded-br-lg">
        </div>
        
        <div className="ml-10 mt-10 mb-10">
          <h1 className="font-bold text-2xl text-black">{title}</h1>
          <div className="h-5"></div>
          <ul className="font-semibold text-md text-black">
            {itemsList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <h1 className="font-semibold text-md text-black">{obsvs}</h1>
        </div>
      </div>
    );
  }

export default InfoDisplay
