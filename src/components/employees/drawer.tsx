import { Button, DatePicker, Form, Input, Radio, Select } from "antd";
import { useTranslation } from "react-i18next";
import { useLocationParams } from "../../hooks/use-location-params";
import { useRouterPush } from "../../hooks/use-router-push";
import MyDrawer from "../my-drawer";
import { postUser } from "../queries/user-queries";

const Drawer = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { push } = useRouterPush();
  const { query } = useLocationParams();

  const onFinish = async (values: any) => {
    await postUser({
      ...values,
      birthDate: values.birthDate.format("DD-MM-YYYY"),
      status: "ACTIVE",
      photo: "",
    });
    push({ query: { ...query, add: false } });
  };

  return (
    <MyDrawer entryPoint="add" title={t("add new staff")}>
      <Form onFinish={onFinish} layout="vertical" form={form}>
        <Form.Item
          label={<p className="text-base">{t("last name")}</p>}
          name="lastName"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<p className="text-base">{t("first name")}</p>}
          name="firstName"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<p className="text-base">{t("phone")}</p>}
          name="phone"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<p className="text-base">{t("password")}</p>}
          name="password"
        >
          <Input />
        </Form.Item>
        <Form.Item label={<p className="text-base">{t("role")}</p>} name="role">
          <Select
            options={[
              { label: t("teacher"), value: "TEACHER" },
              { label: t("cleaner"), value: "CLEANER" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label={<p className="text-base">{t("date of birth")}</p>}
          name="birthDate"
        >
          <DatePicker className="w-full" />
        </Form.Item>
        <Form.Item
          label={<p className="text-base">{t("gender")}</p>}
          name="gender"
        >
          <Radio.Group>
            <Radio value="MALE">{t("male")}</Radio>
            <Radio value="FEMALE">{t("female")}</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
      <div className="flex justify-end items-center">
        <div className="flex">
          <Button
            onClick={() => push({ query: { ...query, add: undefined } })}
            className="mr-2"
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={() => form.submit()}
            className="bg-primary-green hover:!bg-lime-600 border-none !text-white"
          >
            {t("send")}
          </Button>
        </div>
      </div>
    </MyDrawer>
  );
};

export default Drawer;
