import { Col, Row } from "antd";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import MySegmented from "../../components/my-segmented";
import { useLocationParams } from "../../hooks/use-location-params";
import PageLayout from "../../layouts/page-layout";
import Profile from "./profile";
import Story from "./story";

const EmployeeId = () => {
  const { t } = useTranslation();
  const { query } = useLocationParams();

  return (
    <PageLayout
      title={t("employees.titleSingular")}
      addButton={false}
      segmented={
        <MySegmented
          queryName="employeePage"
          segmentedValues={[
            {
              value: t("employees.profile"),
              key: "profile",
              isPrimary: true,
            },
            {
              value: t("employees.story"),
              key: "story",
            },
          ]}
        />
      }
    >
      {query.employeePage === "story" ? <Story /> : <Profile />}
    </PageLayout>
  );
};

export const EmployeeCard = ({
  title,
  value,
  hasShadow = true,
  bgWhite = false,
  customClass = "",
}: {
  title: string;
  value: string | ReactNode;
  hasShadow?: boolean;
  bgWhite?: boolean;
  customClass?: string;
}) => {
  return (
    <div
      style={{ boxShadow: hasShadow ? "rgba(0, 0, 0, 0.24) 0px 3px 8px" : "" }}
      className={`flex ${
        bgWhite ? "bg-white" : `bg-[#f7f7f7]`
      } px-5 py-4 w-full ${customClass}`}
    >
      <Row gutter={[16, 16]} className="w-full">
        <Col xs={24} sm={24} md={24} lg={12}>
          <p className="font-semibold text-base">{title}</p>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12}>
          <p className="text-base">{value}</p>
        </Col>
      </Row>
    </div>
  );
};

export default EmployeeId;
