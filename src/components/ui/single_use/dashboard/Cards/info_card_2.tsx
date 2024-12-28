import { FileClock } from 'lucide-react';
import React from 'react';

function InfoCard2({
  date,
  number,
  docName,
  user
}: {
  date: string;
  number: number;
  docName: string;
  user: string;
}) {

  return (
    <div className="p-4 w-full h-[150px] bg-foreground shadow-lg rounded-lg flex flex-col justify-around">
        <div>
            <div className='flex flex-row gap-2 items-center'>
            <FileClock className='text-mywhite' />
            <p className='text-mywhite'> Pending</p>
            </div>

        </div>
        <div>
        <p className="text-[12px] text-neutral-300 self-start">{date}</p>
        <p className="font-bold text-[20px] text-mywhite self-start">{docName}</p>
        </div>
     
      <div className='flex flex-row gap-2 items-center'>
        <p className='text-[14px] text-black '>from</p>
      <p className="font-bold text-[14px] text-black self-start">{user}</p>
      </div>

    </div>
  );
}

export default InfoCard2;