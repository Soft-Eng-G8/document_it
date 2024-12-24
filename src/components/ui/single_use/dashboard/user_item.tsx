import React from 'react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/multiple_uses/avatar"

interface User {
  name: string;
  email: string;
  initials: string;
}

function UserItem() {
  const user: User = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    initials: 'JD',
  };

  return (
    <div className='flex items-center gap-3 border rounded-[8px] p-4 shadow-lg'>
        <div className='avatar rounded-full min-w-12 min-h-12 bg-foreground flex items-center justify-center text-mywhite'>
            <p className=''>{user.initials}</p>
        </div>
    <div>
        <p className='text-black font-bold text-[16px]'>{user.name}</p>
        <p className='text-neutral-500 font-thin text-[14px]'>{user.email}</p>
    </div>
     
    </div>
  );
}

export default UserItem;