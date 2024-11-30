import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/header.tsx";
import Sidebar from "../components/sidebar";

const AppLayout: React.FC = () => {
  return (
    <div className="bg-primary-bg w-full">
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Header />
          <div className="custom-container overflow-y-scroll">
            <div className="p-10 w-full">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
