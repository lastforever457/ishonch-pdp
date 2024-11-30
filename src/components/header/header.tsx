import Icon from "./icon";
import Languages from "./languages";
import Search from "./search";

const Header = () => {
  return (
    <div className="flex justify-between items-center gap-36 bg-white pr-20 pl-10 h-[100px]">
      <Icon />
      <div className="flex items-center w-1/3">
        <Search />
      </div>
      <Languages />
    </div>
  );
};

export default Header;
