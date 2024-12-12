import React from 'react';
import Login from '../components/ui/single_use/Login';
function page() {
  return (
    <>
    <div 
      className="relative h-screen w-screen bg-cover bg-center flex items-center justify-center bg-mygrey"
    >
      <Login />
    </div>
    
  </>
  );
}

export default page;