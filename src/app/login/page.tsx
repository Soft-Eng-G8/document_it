import React from 'react';
import Login from '../../components/ui/single_use/login_form/Login';
import { Navbar } from '@/components/ui/multiple_uses/navbar';
  //first thing is if you wanna return navbar
function page() {

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
        
      <Login />
    </div>
    </div>
   
    
  </>
  );
}

export default page;