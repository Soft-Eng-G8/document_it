import React from 'react';
import InfoCard2 from './Cards/info_card_2';
import InfoCard from './Cards/info_card';
import GeneralCard from './Cards/generalCard';
import DocumentsStatsCard from './Cards/documentsStatsCard';
import DocumentItCartd from './Cards/DocumentItCartd';

function DashboardItem() {
  const numberOfDocs = 600;
  const numberOfConts = 400;
  const dateOfLastCont = '20 Dec 2024';
  const nameOfLastDoc = 'Document 1';
  const nameOfContibutor = 'Not John Doe';

  return (
    <div className=" p-4 grid grid-cols-[2fr_1fr] gap-4 bg-mygrey h-[300px]">
      <div className="border rounded-lg shadow-lg bg-mygrey p-4 flex flex-col gap-4">
        <div className="flex flex-row justify-around gap-6">
          <InfoCard2
            date={dateOfLastCont}
            number={20}
            docName={nameOfLastDoc}
            user={nameOfContibutor}
          />
          <InfoCard
            text="The Number of Documents in the Site"
            number={numberOfDocs}
            increase={20}
          />
          <InfoCard
            text="The Number of Contributions"
            number={numberOfConts}
            increase={-20}
          />
        </div>
        <div className="p-4 flex-grow">
          <GeneralCard />
        </div>
      </div>

    <div>
      <div className="border rounded-lg shadow-lg bg-mygrey flex items-start justify-start ">
        <DocumentsStatsCard />
      </div>

      <div className="border rounded-lg shadow-lg bg-mygrey mt-4">
        <DocumentItCartd />
        </div>
    </div>
      
    </div>
  );
}

export default DashboardItem;