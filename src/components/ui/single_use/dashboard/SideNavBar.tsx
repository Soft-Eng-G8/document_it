"use client";
import React from "react";
import {
  BetweenHorizontalEnd,
  LayoutDashboard,
  LogOut,
  Settings,
  Shield,
  User,
} from "lucide-react";
import UserItem from "./user_item";
import { useRouter } from 'next/navigation'


function SideNavBar() {
    const router = useRouter();
  const menuList = [
    {
      group: "Dashboard",
      items: [
        { id: "overview", text: "Overview", icon: <LayoutDashboard />, link: '/overview'},
        { id: "users", text: "Users", icon: <User />, link: '/otherUserDisplay' },
        { id: "contributions", text: "Contributions", icon: <BetweenHorizontalEnd />, link: '/contributions_panel'},
        { id: "adminPanel", text: "Admin Panel", icon: <Shield />, link: '/admin_panel' },
      ],
    },
    {
      group: "Menu",
      items: [
        { id: "settings", text: "Settings", icon: <Settings /> , link: '/overview'},
        { id: "logout", text: "Logout", icon: <LogOut />, link: '/overview' },
      ],
    },
  ];

  return (
    <div className="absoulte flex flex-col w-[300px] min-w-[300px] border-r h-screen p-4 gap-2 bg-mywhite overflow-y-auto">
      <div>
      </div>
      <div className="flex justify-start flex-col h-screen">
        <UserItem/>
        {menuList.map((menu, key) => (
          <div key={key}>
            <h3 className="text-sm font-semibold text-gray-700 uppercase mb-4 mt-6">
              {menu.group}
            </h3>
            <ul className="mt-2 space-y-2">
              {menu.items.map((item) => ( 
                <li key={item.id}>
                  <button 
                    onClick={() => router.push(item.link)}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-200 text-gray-700 w-full text-left"
                  >
                    <span className="w-5 h-5">{item.icon}</span>
                    <span className="text-sm font-medium">{item.text}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideNavBar;