import { Button, Form, Input, message, Radio, Select } from "antd";
import { useTranslation } from "react-i18next";
import { useLocationParams } from "../../hooks/use-location-params";
import { useRouterPush } from "../../hooks/use-router-push";
import MyDrawer from "../my-drawer";
import { useEffect, useRef } from "react";

const Drawer = ({ refetch }: { refetch: any }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { push } = useRouterPush();
  const { query } = useLocationParams();
  const sendBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (query.add) form.resetFields();
  }, [query.add]);

  useEffect(() => {
    const fetchRoom = async () => {
      const res = await fetch(`http://localhost:3000/rooms/findUnique`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ where: { id: query.id } }),
      });
      const room = await res.json();
      form.setFieldsValue(room);
    };
    if (query.id && query.edit) fetchRoom();
  }, [query.id]);

  const onFinish = async (values: any) => {
    sendBtnRef.current?.setAttribute("disabled", "true");
    try {
      await fetch(`http://localhost:3000/rooms/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      refetch();
      push({ query: { ...query, add: false } });
      form.resetFields();
    } catch (error) {
      console.log(error);
      message.error(t("something went wrong"));
    }
  };

  return (
    <MyDrawer
      entryPoint={query.add ? "add" : "edit"}
      title={query.add ? t("roomsPage.add new room") : t("roomsPage.edit room")}
    >
      <Form onFinish={onFinish} layout="vertical" form={form}>
        <Form.Item
          label={<p className="text-base">{t("roomsPage.name")}</p>}
          name="name"
          rules={[{ required: true, message: t("form.requiredMessage") }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<p className="text-base">{t("roomsPage.capacity")}</p>}
          name="capacity"
          rules={[{ required: true, message: t("form.requiredMessage") }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<p className="text-base">{t("roomsPage.tables count")}</p>}
          name="tables"
          rules={[{ required: true, message: t("form.requiredMessage") }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<p className="text-base">{t("roomsPage.chairs count")}</p>}
          name="chairs"
          rules={[{ required: true, message: t("form.requiredMessage") }]}
        >
          <Input />
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
            ref={sendBtnRef}
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
