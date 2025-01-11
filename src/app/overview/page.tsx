import DocumentItCartd from '@/components/ui/single_use/dashboard/Cards/DocumentItCartd';
import DocumentsStatsCard from '@/components/ui/single_use/dashboard/Cards/documentsStatsCard';
import GeneralCard from '@/components/ui/single_use/dashboard/Cards/generalCard';
import InfoCard from '@/components/ui/single_use/dashboard/Cards/info_card';
import InfoCard2 from '@/components/ui/single_use/dashboard/Cards/info_card_2';
import Header from '@/components/ui/single_use/dashboard/header';
import SideNavBar from '@/components/ui/single_use/dashboard/SideNavBar';
import prisma from '@/lib/db';
import React from 'react';


async function DashboardItem() {
  const { subMonths, startOfMonth, endOfMonth } = require('date-fns');
  const numberOfDocs =  await prisma.document.count();
  const numberOfConts =  await prisma.contribution.count();
  const latestContribution = await prisma.contribution.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      document: true,
      user: true,
    }
  });
  const dateOfLastCont = '10 Jan 2025';
  const nameOfLastDoc = 'Document 1';
  const nameOfContibutor = 'Hamza Oukil';
  const MonthStart = startOfMonth(new Date);
  const MonthEnd = endOfMonth(new Date());

  const docsIncrease = await prisma.document.count({
    where: {
      createdAt: {
        gte: MonthStart,
        lte: MonthEnd,
      },
    },
  });

  const contsIncrease = await prisma.contribution.count({
    where: {
      createdAt: {
        gte: MonthStart,
        lte: MonthEnd,
      },
    },
  });

  const visasNumber = await prisma.category.count({
    where:{
      title: "Visa"
    }
  })
  const civilNumber = await prisma.category.count({
    where:{
      title: "Etat Civil"
    }
  })
  const otherNumber = await prisma.category.count({
    where:{
      title: {
        not: {
          in: ["Etat Civil", "Visa"],
        },
      }
    }
  })


  return (
    <div className="flex items-start min-h-screen">
      <SideNavBar/>
      <div className="flex-1">
        <div className=" p-4 grid grid-cols-[2fr_1fr] gap-4 bg-mygrey h-[300px]">
      <div className="border rounded-lg shadow-lg bg-mygrey p-4 flex flex-col gap-4">
        <div className="flex flex-row justify-around gap-6">
          <InfoCard2
            date={latestContribution?.createdAt.toDateString()?? dateOfLastCont}
            docName={latestContribution?.oldTitle ?? nameOfLastDoc}
            user={latestContribution?.user.name ?? nameOfContibutor}
          />
          <InfoCard
            text="The Number of Documents in the Site"
            number={numberOfDocs}
            increase={docsIncrease}
          />
          <InfoCard
            text="The Number of Contributions"
            number={numberOfConts}
            increase={contsIncrease}
          />
        </div>
        <div className="p-4 flex-grow">
          <GeneralCard />
        </div>
      </div>

    <div>
      <div className="border rounded-lg shadow-lg bg-mygrey flex items-start justify-start ">
        <DocumentsStatsCard visasNumber={visasNumber} civilNumber={civilNumber} otherNumber = {otherNumber}/>
      </div>

      <div className="border rounded-lg shadow-lg bg-mygrey mt-4">
        <DocumentItCartd />
        </div>
    </div>
      
    </div>
      </div>
    </div>
    
  );
}

export default DashboardItem;