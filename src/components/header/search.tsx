import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useTranslation } from "react-i18next";

const Search = () => {
  const { t } = useTranslation();
  return (
    <Input
      placeholder={t("form.search")}
      className="bg-secondary-bg px-5 py-3 rounded-full font-bold text-lg text-primary-gray placeholder:text-primary-gray"
      suffix={<SearchOutlined className="font-bold text-lg" />}
    />
  );
};

export default Search;
