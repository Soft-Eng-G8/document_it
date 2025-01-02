import { BookUser } from 'lucide-react'
import { Roboto } from 'next/font/google';
import React from 'react'

const roboto = Roboto({ weight: '500' , subsets: ['cyrillic-ext', 'greek'] });
const roboto700 = Roboto({ weight: '700' , subsets: ['cyrillic-ext', 'greek'] });
const robotoBold = Roboto({ weight: '900' , subsets: ['cyrillic-ext', 'greek'] });

function TopContributors({numOfContributions, categoriesRef}: {numOfContributions: number, categoriesRef: any}) {
  return (
    
    <div className='m-10 flex flex-col justify-between'>
    <div className='flex flex-row w-[800px] h-[250px] bg-mywhite rounded-2xl shadow-md p-8'>
        <div className='flex flex-row items-center'>
        <div className='flex items-center justify-center h-[200px] bg-foreground w-[180px] rounded-lg shadow-md'>
          <BookUser className='text-white size-[100px]' />
        </div>
        <div className='h-[180px] w-[20px] bg-black rounded-br-2xl rounded-tr-2xl shadow-md '></div>
        </div>
        <div className='flex flex-row justify-between'>
        <div className='flex flex-col justify-between'>
        <div className={`text-[19px] text-black ml-10 ${roboto.className}`}>Explore</div>
        <div className={`text-[25px]  text-black ml-10 ${robotoBold.className}`}>Our Top Contributors</div>
        </div>
        <div className={`text-[17px] text-black ${roboto700.className}`}>Contributions on the site:  <span className='text-foreground text-[20px]'>{numOfContributions}</span> </div>
        </div>

    </div>

    <div ref={categoriesRef}>
    <p className={`text-black font-bold text-[30px] ${roboto700.className}` }>Categories</p>
    </div>

    </div>
  )
}

export default TopContributors
