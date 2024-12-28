import { Button, Col, DatePicker, Form, Row } from "antd";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FaMoneyBills } from "react-icons/fa6";
import { AutoForm } from "../../components/auto-form";
import MyDrawer from "../../components/my-drawer";
import MyTable from "../../components/my-table";
import { useLocationParams } from "../../hooks/use-location-params";
import { useRouterPush } from "../../hooks/use-router-push";
import { finance } from "../../test-data";

const FinanceTab = () => {
  const { t } = useTranslation();
  const { push } = useRouterPush();
  const { query } = useLocationParams();

  const columns = useMemo(
    () => [
      {
        key: "name",
        title: t("finance.name"),
        dataIndex: "name",
      },
      {
        key: "date",
        title: t("form.date"),
        dataIndex: "date",
      },
      {
        key: "category",
        title: t("finance.category"),
        dataIndex: "category",
      },
      {
        key: "amount",
        title: t("employees.amount"),
        dataIndex: "amount",
      },
    ],
    [t]
  );

  const onCancel = () => {
    push({
      query: {
        add: undefined,
        edit: undefined,
        view: undefined,
        id: undefined,
      },
    });
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const fields = useMemo(
    () => [
      {
        label: t("finance.name"),
        name: "name",
        type: "text",
        rules: [{ required: true, message: t("formMessages.name") }],
      },
      {
        label: t("form.date"),
        name: "date",
        type: "text",
        rules: [{ required: true, message: t("formMessages.date") }],
      },
      {
        label: t("finance.category"),
        name: "category",
        type: "text",
        rules: [{ required: true, message: t("formMessages.category") }],
      },
      {
        label: t("employees.amount"),
        name: "amount",
        type: "text",
        rules: [{ required: true, message: t("formMessages.amount") }],
      },
    ],
    [t]
  );

  return (
    <>
      <Row>
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
      <Row>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="flex justify-between items-center bg-white shadow px-5 py-3 rounded-xl">
            <h2 className="font-semibold text-xl">
              {t("finance.expenseForPeriod")}:
            </h2>
            <p className="font-bold text-xl">6 700 265 UZS</p>
            <FaMoneyBills className="text-3xl text-primary-blue" />
          </div>
        </Col>
      </Row>
      <MyTable columns={columns} data={finance} />
      <MyDrawer entryPoint="add" title={t("crud.add")}>
        <AutoForm
          onFinish={onFinish}
          onCancel={onCancel}
          saveTitle={query.add ? t("crud.create") : t("form.save")}
          cancelTitle={t("form.cancel")}
          fields={fields}
        />
      </MyDrawer>
    </>
  );
};

export default FinanceTab;
