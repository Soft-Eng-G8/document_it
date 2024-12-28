import DocumentItCartd from '@/components/ui/single_use/dashboard/Cards/DocumentItCartd';
import Header from '@/components/ui/single_use/dashboard/header'
import Badge from '@/components/ui/single_use/profile_page/badge';
import PFP from '@/components/ui/single_use/profile_page/PFP'
import prisma from '@/lib/db';
import { ChevronRight } from 'lucide-react';
import React from 'react'
import { date } from 'zod';

async function ProfilePage({params}: { params: { id: string } })  {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
    include:{
      role: true
    }
  
  });

  const full_name = "Arabet Hakim";
  const join_date = "2021-10-12";
  const role = user?.role.name;
  const contributions = 36;
  const reviews = 12;
  const about = `
  - diplômé de l'école supérieure de droit 
  - 12 ans d'expérience
  `
  const badges = [
    {
      text: "You Have Reviewed 20 Documents",
      date: "2024-12-25"
    },
    {
      text: "You Have Contributed 30 Documents",
      date: "2024-12-20"
    },
    {
      text: "You Have Been Active for 1 Year",
      date: "2024-12-15"
    },
  ]
  
  return (
    <div  >
      <Header/>
        <div className='flex flex-row'>
          <div>
            <div className='flex justify-start  mt-10 ml-20 items-center'>
            <PFP/>
            <div className='ml-10 flex flex-col'>
              <div className='text-[25px] font-bold text-black'>{full_name}</div>
              <div className='text-[15px] text-neutral-400'>Joined at {join_date}</div>
              <div className='text-[15px] text-black font-semibold'>{role}</div>
            </div>
            </div>

            <div>
            <div className='w-[500px] h-full bg-white shadow-inner-custom rounded-lg flex  bg-myLightBlue justify-center mt-10 ml-20 p-4'>
                <div className='flex-1'>
                  <div className="flex items-end text-[25px] font-bold">
                    <span className="text-foreground mr-3">{contributions}</span>
                    <span className="text-black">Contributions</span>
                    <span className="ml-4 font-medium text-[16px] text-blue-500 hover:cursor-pointer">see all</span>
                    <span className="text-[1px] text-blue-500 hover:cursor-pointer">
                      <ChevronRight />
                    </span>
                  </div>

                  <div className='text-[25px] font-bold mb-10'>
                    <span className='text-foreground mr-3'>{reviews}</span>
                    <span className='text-black'>Reviews</span>
                  </div>
                  <div className='text-[20px] font-bold text-black'>About</div>
                  <div className='text-[17px] font-medium text-neutral-400 whitespace-pre-line'>{about}</div>
                </div> 
              </div>
              <div className='w-[500px] ml-20 mt-10'>
              <DocumentItCartd/>
              </div>
              
          </div>
          </div>
          <div className='flex-1 flex mt-10  items-center flex-col'>
          <div className='text-[25px] font-bold text-black mb-5'>Badges</div>
          {badges.map((badge, index) =>
          <div className='m-4'>
                 <Badge key={index} text={badge.text} date={badge.date}/>
          </div>
       )}
          
          </div>
        </div>
   

    </div>
  )
}

export default ProfilePage
