import { Link, useLocation } from 'react-router-dom'
import useHeaderMenus, { IMenu } from '../../hooks/use-header-menus'
import { TRole, useAuth } from '../../providers/auth-context-provider'

const Menu = () => {
  const { menus } = useHeaderMenus()
  const { pathname } = useLocation()
  const { user } = useAuth()

  const isActive = (link: string) => {
    if (link === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(link)
  }

  return (
    <div className="flex flex-col gap-2 mt-7">
      {menus.map((menu: IMenu) => {
        if (menu.role.includes(user?.role as TRole)) {
          return (
            <Link
              to={menu.link}
              key={menu.id}
              className={`flex items-center gap-2 tracking-wide py-3 px-4 md:px-5 md:py-4 rounded-lg md:rounded-xl font-medium text-base md:text-lg capitalize transition-all ${
                isActive(menu.link)
                  ? 'bg-primary-blue text-white shadow-lg'
                  : 'text-black hover:bg-[#f5f5f5]'
              }`}
            >
              <span className="text-xl">{menu.icon}</span>
              <p>{menu.title}</p>
            </Link>
          )
        }
      })}
    </div>
  )
}

export default Menu
