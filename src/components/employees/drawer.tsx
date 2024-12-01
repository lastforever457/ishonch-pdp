import { Form } from "antd";
import { useTranslation } from "react-i18next";
import MyDrawer from "../my-drawer";

const Drawer = () => {
  const { t } = useTranslation();
  return (
    <MyDrawer entryPoint="add" title={t("add new staff")}>
      <Form>
        <Form.Item label={t("last name")} name="lastName"></Form.Item>
      </Form>
    </MyDrawer>
  );
};

export default Drawer;
