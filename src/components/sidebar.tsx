import CurrentUser from "./sidebar/current-user";
import LogoutBtn from "./sidebar/logout-btn";
import Menu from "./sidebar/menu";

const Sidebar = () => {
  return (
    <div className="flex flex-col justify-between gap-3 bg-white p-10 w-[350px] h-screen">
      <div className="">
        <CurrentUser />
        <Menu />
      </div>
      <LogoutBtn />
    </div>
  );
};

export default Sidebar;
