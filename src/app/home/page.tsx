import { Button } from '@/components/ui/multiple_uses/button';
import Header from '@/components/ui/single_use/dashboard/header';
import Video from 'next-video';

export default function CompareCard() {
  return (
    <div className="min-h-screen flex bg-background flex-col " style={{  }}>
      <Header/>
      <div className='flex flex-row bg-foreground justify-start h-[500px] w-full rounded-b-3xl shadow-lg p-4'>

      <div className=''>
        <div className='h-[50px] '></div>
        <img src="/float_docit.png" alt="" className='h-[600px]'/>
      </div>
        <div className='p-4 flex justify-center items-start flex-col'>
          <h1 className='font-bold text-[40px] text-white '>Find</h1>
          <h1 className='font-bold text-[40px] text-white '>Your</h1>
          <h1 className='font-bold text-[40px] text-white '>Documents</h1>

        </div>
      </div>


    </div>
  )
}