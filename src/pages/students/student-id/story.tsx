import { Col, Form, Row } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { filials } from "../../../test-data";
import { StudentCard } from "./student-id";

const Story = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [currentEmployee, setCurrentEmployee] = useState<
    Record<string, any> | undefined
  >();
  const [currentEmployeeGroups, setCurrentEmployeeGroups] = useState<
    Record<string, any> | undefined
  >();

  // useEffect(() => {
  //   if (id) {
  //     const employee = users.find(
  //       (user: Record<string, any>) => user.id === Number(id)
  //     )
  //     const employeeGroups = groups.filter(
  //       (group: Record<string, any>) =>
  //         group.teacherId.toString() === id.toString()
  //     )
  //     if (employee) {
  //       setCurrentEmployee(employee)
  //     }

  //     if (employeeGroups) {
  //       setCurrentEmployeeGroups(employeeGroups)
  //     }
  //   }
  // }, [id])

  useEffect(() => {
    if (currentEmployee) {
      form.setFieldsValue(currentEmployee);
    }
  }, [currentEmployee]);

  const fields = useMemo(
    () => [
      {
        key: "phone",
        name: "phone",
        label: t("form.phone"),
        type: "text",
      },
      {
        key: "password",
        name: "password",
        label: t("form.password"),
        type: "password",
      },
      {
        key: "balance",
        name: "balance",
        label: t("employees.balance"),
        type: "text",
      },
      {
        key: "role",
        name: "role",
        label: t("form.role"),
        type: "select",
        options: [
          {
            label: t("employees.teacher"),
            value: "TEACHER",
          },
          {
            label: t("students.titleSingular"),
            value: "STUDENT",
          },
        ],
      },
      {
        key: "branch",
        name: "branch",
        label: t("employees.branch"),
        defaultValue: currentEmployee?.branchId.toString(),
        type: "select",
        options: filials.map((filial: Record<string, any>) => ({
          label: filial.name,
          value: filial.id.toString(),
        })),
      },
    ],
    []
  );
  return (
    <Row gutter={[26, 16]}>
      <Col xs={24} sm={24} md={12} lg={12}>
        <div className="flex flex-col">
          <div className="flex flex-col gap-7 w-full overflow-hidden">
            <StudentCard
              title={"ID"}
              value={currentEmployee?.id}
              hasShadow={false}
              bgWhite={true}
              customClass="rounded-xl"
            />
            <StudentCard
              title={t("employees.courseName")}
              value="-"
              hasShadow={false}
              bgWhite={true}
              customClass="rounded-xl"
            />
            <StudentCard
              title={t("form.date")}
              value="12.11.2024"
              hasShadow={false}
              bgWhite={true}
              customClass="rounded-xl"
            />
            <StudentCard
              title={t("employees.attendance")}
              value="28/30"
              hasShadow={false}
              bgWhite={true}
              customClass="rounded-xl"
            />
            <StudentCard
              title={t("employees.amount")}
              value={
                <span>
                  <span className="text-green-500">1 000 000</span> UZS
                </span>
              }
              hasShadow={false}
              bgWhite={true}
              customClass="rounded-xl"
            />
            <StudentCard
              title={t("employees.paid")}
              value={
                <span>
                  <span className="text-green-500">500 000</span> UZS
                </span>
              }
              hasShadow={false}
              bgWhite={true}
              customClass="rounded-xl"
            />
            <StudentCard
              title={t("employees.duty")}
              value={
                <span>
                  <span className="text-red-500">500 000</span> UZS
                </span>
              }
              hasShadow={false}
              bgWhite={true}
              customClass="rounded-xl"
            />
            <StudentCard
              title={t("employees.teacher")}
              value="Rustamxodjayev Abdulloh"
              hasShadow={false}
              bgWhite={true}
              customClass="rounded-xl"
            />
          </div>
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        {/* Jurnal */}
      </Col>
    </Row>
  );
};

export default Story;
