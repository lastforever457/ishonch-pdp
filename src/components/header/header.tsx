import { useEffect } from "react";
import { Dropdown, Input, Space } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const activeLang = i18n.language;

  return (
    <div className="h-[100px] flex items-center justify-between gap-36 bg-white">
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
              {t("Memo")}
              <RiArrowDropDownLine size={26} />
            </Space>
          </a>
        </Dropdown>
        <PlusOutlined className="text-lg cursor-pointer" />
      </div>

      <div className="flex items-center w-1/3">
        <Input
          placeholder={t("search")}
          className="rounded-full"
          prefix={<SearchOutlined />}
        />
      </div>

      <div className="flex items-center border rounded-full overflow-hidden">
        <button
          className={`px-4 py-2 ${
            activeLang === "uz"
              ? "bg-gray-800 text-white"
              : "bg-white text-black"
          }`}
          onClick={() => changeLanguage("uz")}
        >
          UZ
        </button>
        <button
          className={`px-4 py-2 ${
            activeLang === "ru"
              ? "bg-gray-800 text-white"
              : "bg-white text-black"
          }`}
          onClick={() => changeLanguage("ru")}
        >
          RU
        </button>
      </div>
    </div>
  );
};

export default Header;
