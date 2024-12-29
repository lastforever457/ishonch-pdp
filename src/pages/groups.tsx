import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import MySegmented from "../components/my-segmented.tsx";
import MyTable from "../components/my-table.tsx";
import PageLayout from "../layouts/page-layout.tsx";

const Groups = () => {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      {
        key: "name",
        title: t("form.name"),
        dataIndex: "name",
        fixed: true
      },
      { key: "phone", title: t('form.phone'), dataIndex: "phone" },
      { key: "role", title: t('form.role'), dataIndex: "role" },
    ],
    [t]
  )

  const groups = useMemo(()=>[
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
  ], [t])

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
        columns={columns}
        data={groups}
      />
    </PageLayout>
  );
};

export default Groups;
