import { ReactNode, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FaUserTie } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";
import { IoMdWallet } from "react-icons/io";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdGroups } from "react-icons/md";
import { PiStudent } from "react-icons/pi";

export interface IMenu {
  id: number;
  title: string;
  link: string;
  icon: ReactNode;
}

const useHeaderMenus = () => {
  const { t } = useTranslation();

  const menus: IMenu[] = useMemo(
    () => [
      {
        id: 1,
        title: t("dashboard.title"),
        link: "/",
        icon: <LuLayoutDashboard />,
      },
      {
        id: 2,
        title: t("groups.title"),
        link: "/groups",
        icon: <MdGroups />,
      },
      {
        id: 3,
        title: t("employees.title"),
        link: "/employees",
        icon: <FaUserTie />,
      },

      {
        id: 4,
        title: t("rooms.title"),
        link: "/rooms",
        icon: <GiTeacher />,
      },
      {
        id: 5,
        title: t("students.title"),
        link: "/students",
        icon: <PiStudent />,
      },
      {
        id: 6,
        title: t("finance.title"),
        link: "/finance",
        icon: <IoMdWallet />,
      },
      {
        id: 7,
        title: t("settings.title"),
        link: "/settings",
        icon: <FaGear />,
      },
    ],
    [t],
  );
  return { menus };
};

export default useHeaderMenus;
