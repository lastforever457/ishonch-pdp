import { Button, Col, DatePicker, Form, Row } from "antd";
import { useTranslation } from "react-i18next";
import { courseFees } from "../../test-data";
import { EmployeeCard } from "../employees/employee-id/employee-id";
import ExpenseForPeriod from "./expense-for-period";

const CourseFees = () => {
  const { t } = useTranslation();
  return (
    <>
     <ExpenseForPeriod/>
      <Row className="mt-7">
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="">
            <Form layout="vertical">
              <Row gutter={16}>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label={
                      <span className="font-semibold text-base">
                        {t("finance.fromDate")}
                      </span>
                    }
                    name="startDate"
                    rules={[{ required: true, message: "Sanani kiriting" }]}
                  >
                    <DatePicker
                      className="shadow px-3 py-2 rounded-!2xl text-xl"
                      format="DD.MM.YYYY"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label={
                      <span className="font-semibold text-base">
                        {t("finance.toDate")}
                      </span>
                    }
                    name="endDate"
                    rules={[{ required: true, message: "Sanani kiriting" }]}
                  >
                    <DatePicker
                      className="shadow px-3 py-2 rounded-!2xl text-xl"
                      format="DD.MM.YYYY"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={4}>
                  <div className="flex justify-center items-end w-full h-full">
                    <Form.Item>
                      <Button
                        className="border-0 bg-primary-blue hover:!bg-violet-600 shadow px-7 py-5 rounded-xl font-semibold text-white hover:!text-white tracking-wider"
                        htmlType="submit"
                      >
                        Filter
                      </Button>
                    </Form.Item>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
      <Row className="mt-7">
        <Col xs={24} sm={24} md={12} lg={12}>
          <EmployeeCard
            title={t("finance.courses")}
            value={
              <span className="font-semibold">{t("employees.amount")}</span>
            }
            hasShadow={false}
            customClass="rounded-xl"
          />
          <div className="flex flex-col gap-5">
            {courseFees.map((item: Record<string, any>) => (
              <EmployeeCard
                key={item.id}
                title={item.name}
                value={item.amount}
                bgWhite={true}
                hasShadow={false}
                customClass="rounded-xl"
              />
            ))}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default CourseFees;
