import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { MdExitToApp } from "react-icons/md";

const LogoutBtn = () => {
  const { t } = useTranslation();
  return (
    <div className="">
      <Button icon={<MdExitToApp />} className="border-0 text-lg">
        {t("actions.exit")}
      </Button>
    </div>
  );
};

export default LogoutBtn;
