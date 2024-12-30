import PageLayout from "../layouts/page-layout.tsx";
import MySegmented from "../components/my-segmented.tsx";
import MyTable from "../components/my-table.tsx";
import { useTranslation } from "react-i18next";
import MyDrawer from "../components/my-drawer.tsx";
import { Input } from "antd";

const Students = () => {
  const { t } = useTranslation();

  return (
    <PageLayout
      title={t("students.title")}
      segmented={
        <MySegmented
          segmentedValues={[
            { value: t("students.students"), key: "students" },
            { value: t("students.archive"), key: "archive", isPrimary: true },
          ]}
          queryName={"studentsTab"}
        />
      }
    >
      <MyTable
        columns={[
          {
            key: "firstName",
            title: "F.I.O",
            dataIndex: "fio",
          },
          { key: "phone", title: "Phone", dataIndex: "phone" },
          { key: "role", title: "Role", dataIndex: "role" },
        ]}
        data={[
          {
            fio: "sdfsdgsd",
            phone: "sdfsdgsd",
            role: "sdfsdgsd",
          },
          {
            fio: "sdfsdgsd",
            phone: "sdfsdgsd",
            role: "sdfsdgsd",
          },
          {
            fio: "sdfsdgsd",
            phone: "sdfsdgsd",
            role: "sdfsdgsd",
          },
          {
            fio: "sdfsdgsd",
            phone: "sdfsdgsd",
            role: "sdfsdgsd",
          },
        ]}
      />
      <MyDrawer
        entryPoint="add"
        children={
          <div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <span className="font-semibold">F.I.O</span>
                <Input placeholder="F.I.O" />
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-semibold">Phone</span>
                <Input placeholder="Phone" />
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-semibold">Role</span>
                <Input placeholder="Role" />
              </div>
            </div>
          </div>
        }
        title={t("students.titleSingular")}
      ></MyDrawer>
    </PageLayout>
  );
};

export default Students;
