import React from 'react'

interface FileIconProps {
    text: string;
    url?: string;
}

function FileIcon({text, url}: FileIconProps) {
    const imageUrl = url || "https://cdn-icons-png.flaticon.com/512/4726/4726010.png"
  return (
    <div className='flex flex-col items-center'>
    <div className='bg-mywhite w-24 aspect-square rounded-lg flex justify-center items-center'>
    
    <img
        src = {imageUrl}
        alt="Placeholder"
        className="h-10 w-10 object-cover rounded-lg"
      />
    </div>
      
      <div className='mb-2'></div>
      <h1 className='font-medium text-sm text-black  '>{text}</h1>
      </div>
  )
}

export default FileIcon
