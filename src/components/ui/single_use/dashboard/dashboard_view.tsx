"use client";
import React, { useState } from "react";
import SideNavBar from "./SideNavBar";
import Header from "./header";
import AdminPanel from "@/app/admin_panel/page";
import DashboardItem from "./dashboard_item";
import UsersDisplay from "@/app/otherUserDisplay/page";
import ContributionsComponent from "@/app/contributions_panel/page";

function DashboardView() {
  const [selectedMenu, setSelectedMenu] = useState("overview");

  const renderContent = () => {
    switch (selectedMenu) {
      case "overview":
        return <DashboardItem />;
      case "users":
        return <UsersDisplay />;
      case "contributions":
        return <ContributionsComponent/>; 
      case "adminPanel":
        return <AdminPanel />;
      case "settings":
        return <div>Settings Component</div>; 
      case "logout":
        return <div>Logout Component</div>; 
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <div className="flex items-start min-h-screen">
      <SideNavBar onMenuSelect={setSelectedMenu} />
      <div className="flex-1">
        <Header />
        <div className="p-4">{renderContent()}</div>
      </div>
    </div>
  );
}

export default DashboardView;