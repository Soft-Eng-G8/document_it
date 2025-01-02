import { Roboto } from 'next/font/google';
import React from 'react'

const roboto = Roboto({ weight: '500' , subsets: ['cyrillic-ext', 'greek'] });

function Footer() {
  return (
    <div className='h-[300px] bg-foreground rounded-t-3xl'>
      <div className={`flex text-mywhite text-[25px] font-bold pr-10 pt-10 ${roboto.className} justify-end`}>
        <div>My Dad told me this site will make his life easier</div>
      </div>

      <div className='flex flex-row justify-between items-end'>
      <img src="/whiteLogo.png" alt="" className='w-[300px] ml-[100px]'/>
      <div className='text-black pr-10'>      Designed by Lazib Redwan and Arabet Abdelhakim
      </div>
      </div>

    </div>
  )
}

export default Footer
