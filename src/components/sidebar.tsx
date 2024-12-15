import { IoClose } from "react-icons/io5";
import CurrentUser from "./sidebar/current-user";
import LogoutBtn from "./sidebar/logout-btn";
import Menu from "./sidebar/menu";
import { useSidebar } from "@/providers/sidebar-context-provider";

const Sidebar = () => {
  const { open, setOpen } = useSidebar();

  return (
    <div
      className={`fixed lg:relative top-0 left-0 z-40 flex flex-col justify-between gap-3 bg-white p-10 w-[300px] lg:w-[350px] h-screen transition-transform duration-300 ease-in-out shadow-lg lg:shadow-none ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col gap-3">
        <div className="flex justify-end items-center lg:hidden">
          <IoClose
            className="cursor-pointer size-8"
            onClick={() => setOpen(false)}
          />
        </div>
        <CurrentUser />
        <Menu />
      </div>
      <LogoutBtn />
    </div>
  );
};

export default Sidebar;
