
import { Landmark, MoveRight } from 'lucide-react';
import { Roboto } from 'next/font/google';
import React from 'react'

const lightRoboto = Roboto({ weight: '400' , subsets: ['cyrillic-ext', 'greek'] });
const roboto = Roboto({ weight: '500' , subsets: ['cyrillic-ext', 'greek'] });
const roboto700 = Roboto({ weight: '700' , subsets: ['cyrillic-ext', 'greek'] });
const robotoBold = Roboto({ weight: '900' , subsets: ['cyrillic-ext', 'greek'] });

interface MyCategory {
  category: string;
  symbol: string;
}

function CategoryCard({category, symbol}: MyCategory) {
  return (
    <div className='border h-[250px] w-[33] border-l-0 border-black/20 p-8'>
      <div className='flex flex-col justify-between h-full'>
      <div className='flex flex-row justify-between'>
        <div className={`text-[20px] font text-black ${roboto700.className}`}>{category}</div>
        <MoveRight className='text-black' />
      </div>

      <div>
      <Landmark className='text-black' size={50} />
      <div className='h-[20px]'></div>
      <div className={`text-[12px] font text-black ${lightRoboto.className}`}>Explore the documents obtained in the {category}</div>
      </div>
      </div>
    </div>
  )
}

export default CategoryCard
