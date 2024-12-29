'use client'
import React from 'react';
import Login from '../../components/ui/single_use/Login';
import { Navbar } from '@/components/ui/multiple_uses/navbar';
import { useParams, useSearchParams } from 'next/navigation';
  //first thing is if you wanna return navbar
function page() {
  const params = useSearchParams()
  const callbackUrl = params.get('callbackUrl') || '/'
  return (  
    <>
    <div className='flex flex-col bg-mygrey'>
        <div className="sticky top-0 w-full z-50  p-4">
                <div className="flex justify-center">
                  <div></div>
                </div>
              </div>
         <div 
      className="relative h-screen w-screen bg-cover bg-center flex items-center justify-center bg-mygrey">
        
      <Login callbackUrl={callbackUrl}/>
    </div>
    </div>
   
    
  </>
  );
}

export default page;