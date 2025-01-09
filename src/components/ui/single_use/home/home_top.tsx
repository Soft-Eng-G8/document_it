import React from 'react'
import { Button } from '../../multiple_uses/button'
import { Inter, Roboto } from 'next/font/google';

const roboto = Roboto({ weight: '500', subsets: ['cyrillic-ext', 'greek'] });


function HomeTop({numberOfDocuments, targetRef}: {numberOfDocuments: number, targetRef: any}) {
  const handleScroll = () => {
    targetRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div
    className={`flex flex-row justify-center h-[500px] w-full rounded-b-3xl shadow-lg p-4 ${roboto.className}`}
    style={{
      backgroundImage: `url('/topBG.png')`, // Correctly format the backgroundImage property
      backgroundSize: 'cover', // Optional: ensures the image covers the entire div
      backgroundPosition: 'center', // Optional: centers the image
      
    }} 
  >

      <div className=''>
        <div className='h-[50px] '>
        <img src="/pipes2.png" alt="" className='h-[400px]'/>
        </div>
        <img src="/float_docit.png" alt="" className='h-[600px]'/>
      </div>

        <div className='p-4 flex justify-start items-start flex-col flex-1 '>
          <div className='flex flex-row pl-10'>
          <div className={`font-bold text-[50px] text-white ${roboto.className} `}>
          <h1 >Navigate</h1>
          <h1 >Your</h1>
          <h1 >Documents</h1>
          </div>
          <div className='w-[100px]'></div>
          <div className='flex flex-col justify-between ml-20 mb-5'>
           <div className='flex flex-col justify-end'> 
            <h1 className='text-black font-semibold self-end'>currently in Algeria</h1>
            <h1 className='text-black font-semibold self-end'>Follow us for future updates</h1>
          </div>
          <Button className='bg-black hover:bg-gray-800 text-white text-[17px] rounded-full p-6' onClick={handleScroll}>
          View Categories
         </Button>
          </div>
          <img src="/liltriangle.png" alt="" className='h-[25px]'/>
          </div>
          
          <div className='h-[50px] '>
          </div>
          <div className='h-[30px]'></div>
          <img src="/bigpipe2.png" alt="" className='w-[300px]'/>
          <div className="flex flex-col items-center justify-center h-[100px] w-[200px] bg-gradient-to-b bg-mywhite shadow-md rounded-lg text-black font-bold text-[20px] ml-24">
            <h1>Over</h1> 
            <h1 className='text-[25px] text-foreground'>{numberOfDocuments}</h1>
            <h1>Documents</h1>
            </div>  

                 
             </div>
      </div>
  )
}

export default HomeTop
