'use client'

import { useRef } from 'react';
import HomeTop from '@/components/ui/single_use/home/home_top';
import TopContributors from '@/components/ui/single_use/home/top_contributors';
import ContributePrompt from '@/components/ui/single_use/home/contibute__prompt';
import Categories from '@/components/ui/single_use/home/categories';
import LearnMoreContributions from '@/components/ui/single_use/home/learn_more_contributions';
import Footer from '@/components/ui/single_use/home/footer';

interface ClientRefsProps {
  numberOfDocuments: number;
  numOfContributions: number;
  categories: any;
}

export function ClientRefs({ numberOfDocuments, numOfContributions, categories }: ClientRefsProps) {
  const homeTopRef = useRef(null);
  const categoriesRef = useRef(null);
  const learnTarget = useRef(null);

  return (
    <>
{      <HomeTop numberOfDocuments={numberOfDocuments} targetRef={categoriesRef} />}
      
      <div className='h-[70px]' />
      
      <div className='flex flex-row justify-start'>
        <TopContributors 
          numOfContributions={numOfContributions} 
          categoriesRef={categoriesRef}
        />
        <ContributePrompt targetRef={learnTarget} />
      </div>
      
      <Categories categories={categories}/>
      
      <div className='h-[100px]' />
      
      <LearnMoreContributions ownReference={learnTarget} />
      
      <div className='h-[50px]' />
      
      <Footer />
    </>
  );
}

