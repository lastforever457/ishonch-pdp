import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  const users = useMemo(
    () => [
      {
        id: 1,
        img: "/public/images/user-1.svg",
        percent: "56",
        title: t("Hodimlar"),
      },
      {
        id: 2,
        img: "/public/images/user-2.svg",
        percent: "258",
        title: t("Faol talabalar"),
      },
      {
        id: 3,
        img: "/public/images/user-3.svg",
        percent: "135",
        title: t("Guruhlar"),
      },
      {
        id: 4,
        img: "/public/images/user-4.svg",
        percent: "56",
        title: t("Qarzdorlar"),
      },
      {
        id: 5,
        img: "/public/images/user-5.svg",
        percent: "246",
        title: t("Joriy oyda to'laganlar"),
      },
      {
        id: 6,
        img: "/public/images/user-6.svg",
        percent: "24",
        title: t("Faol guruhni tark etganlar"),
      },
    ],
    [t]
  );
  return (
    <div>
      <div className="justify-center items-center gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 px-10 py-4 text-sm">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex flex-col bg-[#635AD9] shadow-md p-4 rounded-lg text-center text-sm"
          >
            <img
              src={user.img}
              alt={user.title}
              className="flex justify-center items-center mx-auto mb-2 w-12 h-12"
            />
            <div>
              <p className="font-bold text-white">{user.title}</p>
              <p className="font-semibold text-lg text-white">{user.percent}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
