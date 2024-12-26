import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import { FaPencilAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import MySegmented from "../components/my-segmented";
import PageLayout from "../layouts/page-layout";

const EmployeeId = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  return (
    <PageLayout
      title={t("employees.titleSingular")}
      addButton={false}
      segmented={
        <MySegmented
          queryName="status"
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
      <Row gutter={[26, 16]}>
        <Col xs={24} sm={24} md={24} lg={8}>
          <div className="shadow-xl w-full h-full">
            <div className="flex justify-end items-center">
              <button className="bg-primary-orange p-2 border border-black rounded-full">
                <FaPencilAlt />
              </button>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={16}>
          d
        </Col>
      </Row>
    </PageLayout>
  );
};

export default EmployeeId;
