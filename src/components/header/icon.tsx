import { PlusOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useTranslation } from "react-i18next";
import { RiArrowDropDownLine } from "react-icons/ri";

const Icon = () => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center items-center gap-5">
      <div className="flex items-center">
        <img src="/images/logo.png" className="w-32" alt="Logo" />
      </div>

      <div className="flex items-center gap-4">
        <Dropdown
          className={"cursor-pointer"}
          menu={{
            items: [
              { label: t("menu.item1"), key: "0" },
              { label: t("menu.item2"), key: "1" },
            ],
          }}
          trigger={["click"]}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <p className="font-semibold text-xl uppercase">{t("Memo")}</p>
              <RiArrowDropDownLine size={26} />
            </Space>
          </a>
        </Dropdown>
        <PlusOutlined className="border-2 p-2 border-black rounded-full text-lg cursor-pointe1" />
      </div>
    </div>
  );
};

export default Icon;
