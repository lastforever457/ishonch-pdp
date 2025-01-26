import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/header.tsx";
import Sidebar from "../components/sidebar/sidebar.tsx";
import { useSidebar } from "../providers/sidebar-context-provider.tsx";

const MainLayout: React.FC = () => {
  const { open, setOpen } = useSidebar();

  return (
    <div className="relative bg-primary-bg min-h-screen">
      <div
        className={`fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      <div className="flex">
        <Sidebar />
        <div
          className={`w-[calc(100%-350px)] flex-1 transition-all duration-300 ${
            open ? "" : "lg:ml-[-350px]"
          }`}
        >
          <Header />
          <div className="h-[calc(100vh-80px)] lg:h-[calc(100vh-100px)] overflow-y-auto">
            <div className="mx-auto p-6 lg:p-10 w-full">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
