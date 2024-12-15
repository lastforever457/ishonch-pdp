import { FaBars } from "react-icons/fa";
import Icon from "./icon";
import Languages from "./languages";
import Search from "./search";
import { useSidebar } from "@/providers/sidebar-context-provider";

const Header = () => {
  const { open, setOpen } = useSidebar();
  return (
    <div className="flex justify-between items-center gap-4 lg:gap-36 bg-white px-4 lg:px-10 h-[80px] lg:h-[100px] shadow-sm">
      <div className="flex justify-center items-center gap-3 lg:gap-5">
        <FaBars
          className={`cursor-pointer text-gray-600 hover:text-gray-900 transition-colors ${
            !open && "lg:rotate-180"
          } size-6`}
          onClick={() => setOpen(!open)}
        />
        <Icon />
      </div>
      <div className="hidden md:flex items-center w-1/3">
        <Search />
      </div>
      <Languages />
    </div>
  );
};

export default Header;
