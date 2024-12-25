import React from 'react'
import UserItem from './user_item'
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/multiple_uses/command"
import { BetweenHorizontalEnd, LayoutDashboard, LogOut, Settings, Shield, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'

function SideNavBar() {
  const menuList = [
    {
      group: 'Dashboard',
      items: [
        { link: '/dashboards', text: 'Overview', icon: <LayoutDashboard /> },
        { link: '/otherUserDisplay', text: 'Users', icon: <User /> },
        { link: '/all_contributions', text: 'Contributions', icon: <BetweenHorizontalEnd /> },
        { link: '/admin_panel', text: 'Admin Panel', icon: <Shield /> },
      ],
    },
    {
      group: '',
      items: [
        { link: '/settings', text: 'Settings', icon: <Settings /> },
        { link: '/logout', text: 'Logout', icon: <LogOut /> },
      ],
    },
  ]

  return (
    <div className='absoulte flex flex-col w-[300px] min-w-[300px] border-r min-h-screen p-4 gap-2 bg-mywhite'>
      <div>
        <UserItem />
      </div>
          <div className='flex justify-between flex-col h-[700px] '>
            {menuList.map((menu, key) => (
              <div key={key}>
              <h3 className="text-sm font-semibold text-gray-700 uppercase mb-4 mt-6">{menu.group}</h3>
              <ul className="mt-2 space-y-2">
                {menu.items.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.link}
                      className={({ isActive }) =>
                        `flex items-center gap-2 p-2 rounded-md ${
                          isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 text-gray-700'
                        }`
                      }
                    >
                      <span className="w-5 h-5">{item.icon}</span>
                      <span className="text-sm font-medium">{item.text}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            ))}
          </div>
 
    
    </div>
  )
}

export default SideNavBar