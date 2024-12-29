import PageLayout from "../layouts/page-layout.tsx";
import MySegmented from "../components/my-segmented.tsx";
import { useTranslation } from "react-i18next";
import MyTable from "../components/my-table.tsx";

const Groups = () => {
  const { t } = useTranslation();

  return (
    <PageLayout
      title={t("groups.title")}
      segmented={
        <MySegmented
          segmentedValues={[
            { value: t("groups.active"), key: "active" },
            { value: t("groups.archive"), key: "archive", isPrimary: true },
          ]}
          queryName={"groupsTab"}
        />
      }
    >
      <MyTable
        columns={[
          {
            key: "name",
            title: "Name",
            dataIndex: "name",
          },
          { key: "phone", title: "Phone", dataIndex: "phone" },
          { key: "role", title: "Role", dataIndex: "role" },
        ]}
        data={[
          {
            name: "sdfsdgsd",
            phone: "sdfsdgsd",
            role: "sdfsdgsd",
          },
          {
            name: "sdfsdgsd",
            phone: "sdfsdgsd",
            role: "sdfsdgsd",
          },
          {
            name: "sdfsdgsd",
            phone: "sdfsdgsd",
            role: "sdfsdgsd",
          },
          {
            name: "sdfsdgsd",
            phone: "sdfsdgsd",
            role: "sdfsdgsd",
          },
        ]}
      />
    </PageLayout>
  );
};

export default Groups;
