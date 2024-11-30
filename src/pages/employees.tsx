import { useTranslation } from "react-i18next";
import AddButton from "../components/add-button";
import Segmented from "../components/employees/segmented";
import { getAllUsers } from "../components/queries/user-queries";

const Employees = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-bold text-4xl">{t("employees")}</h1>
        <div className="flex justify-center items-center gap-7">
          <Segmented />
          <AddButton>{t("add")}</AddButton>
        </div>
      </div>
    </div>
  );
};

export const loader = async () => {
  const data = getAllUsers();
  return data;
};

export default Employees;
