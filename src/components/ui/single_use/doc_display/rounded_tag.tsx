import React from 'react'

function RoundedTag({ imgSrc, text }: { imgSrc: string ; text: string }) {
  return (
      <div className='flex flex-col items-center'>
      <div className="bg-foreground w-16 aspect-square rounded-full flex justify-center items-center">
      <img
          src = {imgSrc}
          alt="Placeholder"
          className="h-8 w-8 object-cover rounded-full"
        />
      </div>
      <h1 className='font-bold text-sm text-black  '>{text}</h1>
      </div>
  )
}

export default RoundedTag
