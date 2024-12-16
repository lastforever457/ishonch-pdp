import { useTranslation } from "react-i18next";
import AddButton from "../../components/add-button";
import Drawer from "../../components/employees/drawer";
import Segmented from "../../components/employees/segmented";
import EmployeeTable from "../../components/employees/table";
import { Divider } from "antd";

const Employees = () => {
  const { t } = useTranslation();
  return (
    <div className="">
      <div className="flex justify-between">
        <h1 className="font-bold text-4xl">{t("employees")}</h1>
        <div className="flex justify-center items-center gap-7">
          <Segmented />
          <AddButton>{t("crud.add")}</AddButton>
        </div>
      </div>
      <Divider />
      <EmployeeTable />
      <Drawer />
    </div>
  );
};

export default Employees;
