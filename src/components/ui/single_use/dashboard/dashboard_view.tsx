"use client";

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideNavBar from './SideNavBar';
import Header from './header';
import AdminPanel from '@/app/admin_panel/page';
import UsersDisplay from '@/app/users_display/pages';
import DashboardItem from './dashboard_item';

function DashboardView() {
  return (
    <Router>
      <div className="flex items-start justify-between">
        <SideNavBar />
        <div className="w-full h-full">
          <Header />
          <div className="p-4">
            <Routes>
              <Route path="/dashboards" element={<DashboardItem />} />
              <Route path="/users_display" element={<UsersDisplay />} />
              <Route path="/admin_panel" element={<AdminPanel />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default DashboardView;