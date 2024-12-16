import { useTranslation } from "react-i18next";

const EmployeeProfile = () => {
  const { t } = useTranslation();

  return <div>{t("employeeProfile")}</div>;
};

export default EmployeeProfile;
