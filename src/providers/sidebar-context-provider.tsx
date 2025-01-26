import { createContext, useContext, useState } from "react";

export const SidebarContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(localStorage.getItem("open") === "open");

  const handleToggle = () => {
    setOpen(!open);
    localStorage.setItem("open", open ? "close" : "open");
  };

  return (
    <SidebarContext.Provider value={{ open, setOpen: handleToggle }}>
      {children}
    </SidebarContext.Provider>
  );
};
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
