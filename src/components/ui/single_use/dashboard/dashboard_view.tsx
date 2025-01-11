"use client"
import React, { useState } from "react";
import SideNavBar from "./SideNavBar";
import Header from "./header";
import UsersDisplay from "@/app/(adminPanel)/otherUserDisplay/page";
import ContributionsComponent from "@/app/(adminPanel)/contributions_panel/page";
import { useRouter } from 'next/navigation'

function DashboardView() {
  const [selectedMenu, setSelectedMenu] = useState("overview");
  const router = useRouter();



  return (
    <div className="flex items-start min-h-screen">
      <SideNavBar/>
      <div className="flex-1">
        
      </div>
    </div>
  );
}

export default DashboardView;