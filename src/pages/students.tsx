import PageLayout from "../layouts/page-layout.tsx";
import MySegmented from "../components/my-segmented.tsx";
import MyTable from "../components/my-table.tsx";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import { filials, groups, users } from "../test-data.ts";
import { useLocationParams } from "../hooks/use-location-params.tsx";
import { useParams } from "react-router-dom";
import { Form } from "antd";

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
      />{" "}
    </PageLayout>
  );
};

export default Students;
