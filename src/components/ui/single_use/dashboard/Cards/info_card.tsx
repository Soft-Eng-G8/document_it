import { TrendingUp, TrendingDown } from 'lucide-react'; // Ensure you import the relevant icons
import React from 'react';

function InfoCard({
  text,
  number,
  increase,
}: {
  text: string;
  number: number;
  increase: number;
}) {
  const isPositive = increase >= 0;

  return (
    <div className="p-4 w-full h-[150px] bg-mywhite shadow-lg rounded-lg flex flex-col justify-around">
      <p className="text-[14px] text-black self-start">{text}</p>
      <p className="font-bold text-[40px] text-foreground self-center">{number}</p>
      <div className="flex flex-row gap-2 items-center">
        {isPositive ? (
          <TrendingUp className="text-green-500" />
        ) : (
          <TrendingDown className="text-red-500" />
        )}
        <p
          className={`text-[13px] ${
            isPositive ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {isPositive ? `+${increase}` : `${increase}`}
        </p>
        <p className="text-black text-[13px]">from last month</p>
      </div>
    </div>
  );
}

export default InfoCard;