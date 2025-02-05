import { Input } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaBars, FaSearch } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import { useLocationParams } from '../../hooks/use-location-params'
import { useRouterPush } from '../../hooks/use-router-push'
import { useSidebar } from '../../providers/sidebar-context-provider'
import Icon from './icon'
import Languages from './languages'
import Search from './search'

const Header = () => {
  const { t } = useTranslation()
  const { open, setOpen } = useSidebar()
  const { push } = useRouterPush()
  const { query } = useLocationParams()
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const [search, setSearch] = useState<string>((query.search as string) || '')

  useEffect(() => {
    setSearch(query.search as string)
  }, [query.search])

  return (
    <div className="flex justify-between items-center gap-4 lg:gap-36 bg-whit shadow-sm px-4 lg:px-10 w-full h-[80px] lg:h-[100px] transition-all">
      {isCollapsed && (
        <>
          <div className="flex justify-center items-center gap-3 lg:gap-5">
            <FaBars
              className={`cursor-pointer text-gray-600 hover:text-gray-900 transition-transform ${
                !open && 'lg:rotate-180'
              } size-6`}
              onClick={() => setOpen(!open)}
            />
            <Icon />
          </div>
          <div className="md:flex items-center hidden w-1/3">
            <Search />
          </div>
        </>
      )}

      <div
        className={`flex md:hidden ${
          isSearchOpen ? 'w-full px-5' : 'w-auto'
        } justify-center items-center transition-all duration-500 ease-in-out`}
      >
        {isCollapsed && !isSearchOpen && (
          <button
            onClick={() => {
              setIsSearchOpen(true)
              setIsCollapsed(false)
            }}
            className="flex justify-center items-center shadow-md p-3 rounded-full transition-all size-11"
          >
            <FaSearch />
          </button>
        )}

        {isSearchOpen && (
          <Input
            prefix={
              <IoMdClose
                className="mr-2 text-xl"
                onClick={() => {
                  setIsCollapsed(true)
                  setIsSearchOpen(false)
                }}
              />
            }
            defaultValue={search}
            onChange={(event) =>
              push({ query: { ...query, search: event?.target?.value } })
            }
            autoFocus
            className="px-4 py-2 rounded-full w-full transition-all duration-500 ease-in-out"
            placeholder={t('form.search')}
            onBlur={() => {
              setIsSearchOpen(false)
              setIsCollapsed(true)
            }}
          />
        )}
      </div>

      {isCollapsed && <Languages />}
    </div>
  )
}

export default Header
