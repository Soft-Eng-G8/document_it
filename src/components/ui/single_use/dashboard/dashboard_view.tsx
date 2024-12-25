"use client";

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideNavBar from './SideNavBar';
import Header from './header';
import AdminPanel from '@/app/admin_panel/page';
import DashboardItem from './dashboard_item';
import UsersDisplay from '@/app/otherUserDisplay/page';

function DashboardView() {
  return (
    <Router>
      <div className="flex items-start justify-between">
        <SideNavBar />
        <div className="w-full h-full">
          <Header />
          <div className="p-4">
           {/* <Routes>
              <Route path="/dashboards" element={<DashboardItem />} />
              <Route path="/otherUserDisplay" element={<UsersDisplay />} />
              <Route path="/admin_panel" element={<AdminPanel />} />
            </Routes>*/}
            <AdminPanel/>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default DashboardView;