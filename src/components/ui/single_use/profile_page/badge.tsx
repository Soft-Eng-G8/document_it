import React from 'react'

function Badge({text, date}: {text: string, date: string}) {
  return (
    <div className='flex flex-row border-[10px] w-[350px] bg-white h-[200px] shadow-md rounded-lg  border-foreground justify-between'>
      <div className='flex flex-col justify-center items-start'>
        <img src="/docitBlue.png" alt="" className='h-12 self-center' />
        <div className='text-[20px] font-bold text-black ml-2'>{text}</div>
        <div className='text-[15px] font-medium text-neutral-400 ml-2'>{date}</div>
      </div>
        <div className='h-[50px] bg-foreground w-[30px] rounded-bl-full'></div>
    </div>
  )
}

export default Badge
