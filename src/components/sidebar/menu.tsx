import { Link, useMatches } from "react-router-dom";
import useHeaderMenus from "../../hooks/use-header-menus";

const Menu = () => {
  const { menus } = useHeaderMenus();
  const matches = useMatches();
  console.log(matches);

  return (
    <div className="flex flex-col gap-2 mt-7">
      {menus.map((menu: Record<string, any>) => (
        <Link
          to={menu.link}
          key={menu.id}
          className={`flex items-center gap-2 px-5 py-4 rounded-xl font-medium text-lg capitalize transition-all ${
            matches[1]?.pathname === menu.link
              ? "bg-primary-blue text-white"
              : "text-black hover:bg-[#f5f5f5]"
          }`}
        >
          <span className="text-xl">{menu.icon}</span>
          <p>{menu.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default Menu;

//     ? "bg-primary-blue text-white"
//     : "text-black hover:bg-[#f5f5f5]"
