import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

const AppLayout: React.FC = () => {
  return (
    <div className="bg-primary-bg w-full">
      <div className="flex">
        <Sidebar />
        <div className="">
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
