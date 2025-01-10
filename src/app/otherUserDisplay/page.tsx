"use client";
import Header from '@/components/ui/single_use/dashboard/header';
import SideNavBar from '@/components/ui/single_use/dashboard/SideNavBar';
import UserRow from '@/components/ui/single_use/dashboard/user_row';
import dynamic from 'next/dynamic';
import React, { useState } from 'react'

interface  User{
  email: string;
  name: string;
  imageUrl?: string;
  roles: string[];
}

function UsersDisplay() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const users: User[] =[
    {
      email: "arabethakim@gmail.com",
      name: "Arabet Hakim",
      roles: [
        "Admin",
        "Viewer",
        "Contributor-S"
      ],
      imageUrl: "https://www.lingoda.com/wp-content/uploads/2021/11/french-speaking-countries-bis-1.jpg"
    },
    {
      email: "arabethkarim@gmail.com",
      name: "Arabet Karim",
      roles: [
        "Admin",
        "Viewer",
        "Contributor"
      ],
      imageUrl: "https://www.lingoda.com/wp-content/uploads/2021/11/french-speaking-countries-bis-1.jpg"
    },
  ]

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.roles.some((role) =>
        role.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="flex items-start min-h-screen">
      <SideNavBar/>
      <div className="flex-1">
        <Header />
        <div className="p-4">
      <div>
        <h2 className="text-[20px] font-bold text-black">Users</h2>
        <h3 className="text-[16px] text-medium text-neutral-400">
          A List Displaying all the Users
        </h3>
      </div>

      <div className="my-4">
        <input
          type="text"
          className="w-full text-black p-2 border bg-neutral-300 rounded-lg focus:outline-none placeholder:text-black"
          placeholder="Search by name, email, or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user: User, key: number) => (
            <div key={key} className='m-2'>
              <UserRow
                title={user.name}
                email={user.email}
                imageUrl={user.imageUrl}
                roles={user.roles}
              />
            </div>
          ))
        ) : (
          <div className="text-neutral-500 text-center mt-4">
            No users found.
          </div>
        )}
      </div>
    </div>
      </div>
    </div>
   
  
  )
}

export default UsersDisplay
