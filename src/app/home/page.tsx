"use client";
import Header from '@/components/ui/single_use/dashboard/header';
import Categories from '@/components/ui/single_use/home/categories';
import ContributePrompt from '@/components/ui/single_use/home/contibute__prompt';
import Footer from '@/components/ui/single_use/home/footer';
import HomeTop from '@/components/ui/single_use/home/home_top';
import LearnMoreContributions from '@/components/ui/single_use/home/learn_more_contributions';
import TopContributors from '@/components/ui/single_use/home/top_contributors';
import { useRef } from 'react';


export default function CompareCard() {



    // Create a ref for HomeTop
    const homeTopRef = useRef(null);

    const categoriesRef = useRef(null);

    const learnTarget = useRef(null);

  const numberOfDocuments = 150;
  const numOfContributions = 236; 

  return (
    <div className="min-h-screen flex bg-background flex-col ">
      <Header/>
      <HomeTop numberOfDocuments={numberOfDocuments} targetRef={categoriesRef}/>

      <div className='h-[70px]'>
      </div>

      <div className='flex flex-row justify-start'>
      <TopContributors numOfContributions={numOfContributions} categoriesRef={categoriesRef}/>
      
      <ContributePrompt targetRef={learnTarget}/>
      </div>
      <Categories/>
        <div className='h-[100px]'></div>
      <LearnMoreContributions ownReference={learnTarget}/>
      <div className='h-[50px]'></div>
      <Footer/>
    </div>
  )
}