import { Button, Form, Input, message, Radio, Select } from "antd";
import { useTranslation } from "react-i18next";
import { useLocationParams } from "../../hooks/use-location-params";
import { useRouterPush } from "../../hooks/use-router-push";
import MyDrawer from "../my-drawer";
import { apiLink } from "@/utils/api-link";
import api from "@/utils/axios";

const Drawer = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { push } = useRouterPush();
  const { query } = useLocationParams();

  const onFinish = async (values: any) => {
    try {
      await api.post(`${apiLink("/users/create")}`, values);
      console.log(values);
      push({ query: { ...query, add: false } });
    } catch (error) {
      console.log(error);
      message.error(t("something went wrong"));
    }
  };

  return (
    <MyDrawer
      entryPoint={query.add ? "add" : "edit"}
      title={
        query.add
          ? t("studentsPage.add new student")
          : t("studentsPage.edit student")
      }
    >
      <Form onFinish={onFinish} layout="vertical" form={form}>
        <Form.Item
          label={<p className="text-base">{t("form.last name")}</p>}
          name="lastName"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<p className="text-base">{t("form.first name")}</p>}
          name="firstName"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<p className="text-base">{t("form.date of birth")}</p>}
          name="birthday"
        >
          <input
            type="date"
            className="border-gray-300 px-4 py-2 border rounded-md w-full"
          />
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
            {t("form.send")}
          </Button>
        </div>
      </div>
    </MyDrawer>
  );
};

export default Drawer;
