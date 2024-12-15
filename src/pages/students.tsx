import AddButton from "@/components/add-button";
import Drawer from "@/components/students/drawer";
import Segmented from "@/components/students/segmented";
import StudentTable from "@/components/students/table";
import { Divider } from "antd";
import { useTranslation } from "react-i18next";

const Students = () => {
  const { t } = useTranslation();
  return (
    <div className="">
      <div className="flex justify-between">
        <h1 className="font-bold text-4xl">{t("students")}</h1>
        <div className="flex justify-center items-center gap-7">
          <Segmented />
          <AddButton>{t("crud.add")}</AddButton>
        </div>
      </div>
      <Divider />
      <StudentTable />
      <Drawer />
    </div>
  );
};

export default Students;
