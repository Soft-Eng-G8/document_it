import { Sparkle } from 'lucide-react'
import { Roboto } from 'next/font/google';
import React from 'react'
import { Button } from '../../multiple_uses/button';

const robotoBold = Roboto({ weight: '900' , subsets: ['cyrillic-ext', 'greek'] });
const roboto = Roboto({ weight: '500' , subsets: ['cyrillic-ext', 'greek'] });
const fillColor = '#2192e2';

function ContributePrompt({targetRef}: {targetRef: any}) {
  const handleScroll = () => {
    targetRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className=' flex flex-col p h-[400px] w-[400px] bg-foreground rounded-2xl shadow-md m-10 rounded-tr-3xl'>
      <div className='flex flex-row justify-end items-center'>
      <button className='rounded-full bg-foreground p-2 w-fit hover:bg-foreground/90 self-end'>
       <Sparkle fill="white" className='text-white' size={36} />
       </button>
      </div>

      <div className='p-8 flex flex-col justify-start items-start'>
        <div className={`text-mywhite ${robotoBold.className} text-2xl`}>
        You Can Contribute Yourself 
      </div>
      <div className={`text-neutral-300 text-[15px] mt-4  ${roboto.className} `}>
      Contributions are key to improving the site, allowing users to enhance its content collaboratively. Each contribution is reviewed by another user, and once accepted, it is published, ensuring all information is accurate and community-verified.    
        </div>
        <Button className='bg-black hover:bg-gray-800 text-white text-[17px] rounded-full p-6 w-fit mt-4' onClick={handleScroll}>
          Learn More
         </Button>
      </div>
     
    </div>
  )
}

export default ContributePrompt
