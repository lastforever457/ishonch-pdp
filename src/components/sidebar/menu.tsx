import { Link, useMatches } from "react-router-dom";
import useHeaderMenus from "../../hooks/use-header-menus";

const Menu = () => {
  const { menus } = useHeaderMenus();
  const route = useMatches();

  return (
    <div className="flex flex-col gap-2 mt-7">
      {menus.map((menu: Record<string, any>) => (
        <Link
          to={menu.link}
          key={menu.id}
          className={`flex items-center font-medium transition-all rounded-xl text-lg py-4 px-5 gap-2 ${
            route[1].pathname === menu.link
              ? "bg-primary-blue text-white"
              : "text-black hover:bg-[#f5f5f5]"
          }`}
        >
          <span className="text-xl">{menu.icon}</span>
          <p className="capitalize">{menu.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default Menu;
