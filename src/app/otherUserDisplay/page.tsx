"use client";
import Header from '@/components/ui/single_use/dashboard/header';
import SideNavBar from '@/components/ui/single_use/dashboard/SideNavBar';
import UserRow from '@/components/ui/single_use/dashboard/user_row';
import React, { useState } from 'react';

interface User {
  email: string;
  name: string;
  imageUrl?: string;
  roles: string[];
}

function UsersDisplay() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [users, setUsers] = useState<User[]>([
    {
      email: "arabethakim@gmail.com",
      name: "Arabet Hakim",
      roles: [
        "Admin",
        "Viewer",
        "Contributor"
      ],
      imageUrl: "https://www.lingoda.com/wp-content/uploads/2021/11/french-speaking-countries-bis-1.jpg"
    },
    {
      email: "arabethkarim@gmail.com",
      name: "Arabet Karim",
      roles: [
        "Viewer",
        "Contributor"
      ],
      imageUrl: "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
    },
    {
      email: "redwanlazib@gmail.com",
      name: "Redwan Lazib",
      roles: [
        "Admin",
        "Viewer",
        "Contributor"
      ],
      imageUrl: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/31/8365482/1.jpg?7007"
    },
    {
      email: "mouhannedderar@gmail.com",
      name: "Mouhanned Derar",
      roles: [
        "Admin",
      ],
      imageUrl: "https://www.adm.ee/wordpress/wp-content/uploads/2023/08/JAVA.png"
    },
    {
      email: "younesbarmaki@gmail.com",
      name: "Younes Bermaki",
      roles: [
       "Viewer",
       "Contributor"
      ],
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ_C-EwrzWXB8xtIyPN7KycgsX8-LVSz7ghQ&s"
    },
    {
      email: "oukilhamza@gmail.com",
      name: "Oukil Hamza",
      roles: [
       "Viewer",
      ],
      imageUrl: "https://wl-brightside.cf.tsp.li/resize/728x/jpg/6c2/a78/0e073555e185600dcbb8234809.jpg"
    },
  ]);

  const handleRemove = (email: string) => {
    setUsers(users.filter((user) => user.email !== email));
  };

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
      <SideNavBar />
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
              filteredUsers.map((user) => (
                <div key={user.email} className="m-2">
                  <UserRow
                    title={user.name}
                    email={user.email}
                    imageUrl={user.imageUrl}
                    roles={user.roles}
                    onRemove={handleRemove} // Pass the handler as a prop
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
  );
}

export default UsersDisplay;