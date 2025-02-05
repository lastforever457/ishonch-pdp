import { IoClose } from 'react-icons/io5'
import { useSidebar } from '../../providers/sidebar-context-provider'
import Menu from './menu'

const Sidebar = () => {
  const { open, setOpen } = useSidebar()

  return (
    <div
      className={`fixed lg:relative top-0 left-0 z-40 flex flex-col justify-start gap-3 bg-white text-black   p-5 md:p-10 w-[340px] lg:w-[350px] min-h-screen transition-transform duration-300 ease-in-out shadow-lg lg:shadow-none ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center lg:hidden">
        <IoClose
          className="cursor-pointer size-8"
          onClick={() => setOpen(false)}
        />
      </div>
      <Menu />
    </div>
  )
}

export default Sidebar
