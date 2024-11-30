import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  const users = [
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
  ];
  return (
    <div>
      <div className="py-4 px-10 text-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 justify-center items-center">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-[#635AD9] flex flex-col text-sm text-center rounded-lg shadow-md p-4"
          >
            <img
              src={user.img}
              alt={user.title}
              className="w-12 h-12 flex justify-center items-center mx-auto mb-2"
            />
            <div>
              <p className="text-white font-bold">{user.title}</p>
              <p className="text-lg font-semibold text-white">{user.percent}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
