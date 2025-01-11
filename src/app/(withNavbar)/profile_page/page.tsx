import { options } from '@/app/api/auth/[...nextauth]/options';
import Unauthorized from '@/components/ui/multiple_uses/Unauthorized';
import DocumentItCartd from '@/components/ui/single_use/dashboard/Cards/DocumentItCartd';
import Header from '@/components/ui/single_use/dashboard/header'
import Badge from '@/components/ui/single_use/profile_page/badge';
import PFP from '@/components/ui/single_use/profile_page/PFP'
import prisma from '@/lib/db';
import { ChevronRight } from 'lucide-react';
import { getServerSession } from 'next-auth';
import React from 'react'
import { date } from 'zod';

async function ProfilePage() {
  const session = await getServerSession(options)
  if(!session) return <Unauthorized />
  const user = await prisma.user.findUnique({
    where: { id: session.user!.id },
    include: {
      contributions: true,
      roles: true
    }
  })
  // const full_name = "Arabet Hakim";
  // const join_date = "2021-10-12";
  // const role = "Admin";
  // const contributions = 36;
  // const reviews = 12;
  // const about = `
  // - diplômé de l'école supérieure de droit 
  // - 12 ans d'expérience
  // `
  // const badges = [
  //   {
  //     text: "You Have Reviewed 20 Documents",
  //     date: "2024-12-25"
  //   },
  //   {
  //     text: "You Have Contributed 30 Documents",
  //     date: "2024-12-20"
  //   },
  //   {
  //     text: "You Have Been Active for 1 Year",
  //     date: "2024-12-15"
  //   },
  // ]
  
  return (
    <div  >
        <div className='flex flex-row'>
          <div>
            <div className='flex justify-start  mt-10 ml-20 items-center'>
            <PFP/>
            <div className='ml-10 flex flex-col'>
              <div className='text-[25px] font-bold text-black'>{user!.name}</div>
              {/* <div className='text-[15px] text-neutral-400'>Joined at {user.}</div> */}
              <div className='text-[15px] text-black font-semibold'>{'aa'}</div>
            </div>
            </div>

            <div>
            <div className='w-[500px] h-full bg-white shadow-inner-custom rounded-lg flex  bg-myLightBlue justify-center mt-10 ml-20 p-4'>
                <div className='flex-1'>
                  <div className="flex items-end text-[25px] font-bold">
                    <span className="text-foreground mr-3">Contribution count: {user?.contributions.length}</span>
                    <span className="ml-4 font-medium text-[16px] text-blue-500 hover:cursor-pointer">see all</span>
                    <span className="text-[1px] text-blue-500 hover:cursor-pointer">
                      <ChevronRight />
                    </span>
                  </div>

                  <div className='text-[25px] font-bold mb-10'>
                    
                  </div>
                  <div className='text-[20px] font-bold text-black'>About</div>
                  <div>did you ever hear the tragedy of darth plagueis the wise?</div>
                </div> 
              </div>
              <div className='w-[500px] ml-20 mt-10'>
              <DocumentItCartd/>
              </div>
              
          </div>
          </div>
          <div className='flex-1 flex mt-10  items-center flex-col'>
          {/* <div className='text-[25px] font-bold text-black mb-5'>Badges</div> */}
          {/* {badges.map((badge, index) =>
          <div className='m-4'>
                 <Badge key={index} text={badge.text} date={badge.date}/>
          </div>
       )} */}
          
          </div>
        </div>
   

    </div>
  )
}

export default ProfilePage
