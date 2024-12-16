import AddButton from "../components/add-button.tsx";
import { useTranslation } from "react-i18next";
import GroupSegmented from "../components/group/group-segmented.tsx";
import GroupTable from "../components/group/group-table.tsx";

const Groups = () => {
  const { t } = useTranslation();

  return (
    <div className="">
      <div className={"flex items-center justify-between"}>
        <div className={"flex items-center justify-between space-x-10"}>
          <h3 className={"text-4xl font-bold"}>Groups</h3>
          <button
            className={
              "font-bold text-white text-xl bg-primary-blue rounded-full py-2 mt-3 px-8"
            }
          >
            Attendance
          </button>
        </div>
        <div className={"flex items-center justify-center gap-16"}>
          <GroupSegmented />
          <AddButton>{t("crud.add")}</AddButton>
        </div>
      </div>
      <div>
        <GroupTable />
      </div>
    </div>
  );
};

export default Groups;
