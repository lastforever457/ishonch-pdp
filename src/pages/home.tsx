import { Col, Row } from "antd";
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
        title: t("employees"),
      },
      {
        id: 2,
        img: "/public/images/user-2.svg",
        percent: "258",
        title: t("active-students"),
      },
      {
        id: 3,
        img: "/public/images/user-3.svg",
        percent: "135",
        title: t("groups"),
      },
      {
        id: 4,
        img: "/public/images/user-4.svg",
        percent: "56",
        title: t("debtors"),
      },
      {
        id: 5,
        img: "/public/images/user-5.svg",
        percent: "246",
        title: t("pay-month"),
      },
      {
        id: 6,
        img: "/public/images/user-6.svg",
        percent: "24",
        title: t("left-students"),
      },
    ],
    [t]
  );
  return (
    <div>
      <Row gutter={[16, 16]} className="px-10 py-4 text-sm">
        {users.map((user) => (
          <Col key={user.id} xs={24} sm={12} md={8} lg={6} xl={4}>
            <div className="flex flex-col bg-[#635AD9] shadow-md p-4 rounded-lg h-full text-center text-sm">
              <img
                src={user.img}
                alt={user.title}
                className="flex justify-center items-center mx-auto mb-2 w-12 h-12"
              />
              <div>
                <p className="font-bold text-white">{user.title}</p>
                <p className="font-semibold text-lg text-white">
                  {user.percent}
                </p>
              </div>
            </div>
          </Col>
        ))}
      </Row>{" "}
    </div>
  );
};

export default Home;
