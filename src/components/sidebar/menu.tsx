import { Link, useLocation } from 'react-router-dom';
import useHeaderMenus, { IMenu } from '../../hooks/use-header-menus';

const Menu = () => {
  const { menus } = useHeaderMenus();
  const { pathname } = useLocation();

  const isActive = (link: string) => {
    if (link === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(link);
  };

  return (
    <div className="mt-7 flex flex-col gap-2">
      {menus.map((menu: IMenu) => {
        return (
          <Link
            to={menu.link}
            key={menu.id}
            className={`flex items-center gap-2 rounded-lg px-4 py-3 text-base font-medium capitalize tracking-wide transition-all md:rounded-xl md:px-5 md:py-4 md:text-lg ${
              isActive(menu.link) ? 'bg-primary-blue text-white shadow-lg' : 'text-black hover:bg-[#f5f5f5]'
            }`}
          >
            <span className="text-xl">{menu.icon}</span>
            <p>{menu.title}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Menu;
