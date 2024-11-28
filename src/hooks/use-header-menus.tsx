import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FaStarOfLife } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { GrTechnology } from "react-icons/gr";
import { LuContact2 } from "react-icons/lu";
import { MdOutlineCastForEducation } from "react-icons/md";

const useHeaderMenus = () => {
  const { t } = useTranslation();

  const menus = useMemo(
    () => [
      {
        id: 1,
        title: t("home"),
        link: "/",
        icon: <GoHomeFill />,
      },
      {
        id: 2,
        title: t("skills"),
        link: "/skills",
        icon: <FaStarOfLife />,
      },
      {
        id: 3,
        title: t("technologies"),
        link: "/technologies",
        icon: <GrTechnology />,
      },
      {
        id: 4,
        title: t("education"),
        link: "/education",
        icon: <MdOutlineCastForEducation />,
      },
      {
        id: 5,
        title: t("contacts"),
        link: "/contacts",
        icon: <LuContact2 />,
      },
    ],
    [t]
  );
  return { menus };
};

export default useHeaderMenus;
