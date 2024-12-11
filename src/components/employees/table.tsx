import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocationParams } from "../../hooks/use-location-params";
import MyTable from "../my-table";
import useUsers from "../../query-models/users";

const EmployeeTable = () => {
  const { query } = useLocationParams();
  const { t } = useTranslation();
  // const [tab, setTab] = useState<"teachers" | "archive" | "other">(
  //   query.employeeTab as "teachers" | "archive" | "other"
  // );
  // const queryOptions = useMemo(() => {
  //   switch (tab) {
  //     case "teachers":
  //       return {
  //         where: {
  //           role: "TEACHER",
  //         },
  //       };
  //     case "archive":
  //       return {
  //         where: {
  //           status: "ARCHIVED",
  //         },
  //       };
  //     case "other":
  //       return {
  //         where: {
  //           status: "BLOCKED",
  //         },
  //       };
  //     default:
  //       return {
  //         where: {
  //           role: "TEACHER",
  //         },
  //       };
  //   }
  // }, [query.employeeTab]);

  const {
    data: users,
    isLoading,
    refetch,
  } = useUsers({
    where: {
      OR: [
        {
          role:
            query.employeeTab === "teachers"
              ? "TEACHER"
              : !query.employeeTab
              ? "TEACHER"
              : undefined,
        },
        {
          status: query.employeeTab === "archive" ? "ARCHIVED" : "BLOCKED",
        },
      ],
    },
  });

  useEffect(() => {
    refetch();
  }, [query.employeeTab]);

  const columns = useMemo(
    () => [
      { key: "index", title: "#", dataIndex: "index" },
      { key: "fio", title: t("form.fio"), dataIndex: "fio" },
      { key: "phone", title: t("form.phone"), dataIndex: "phone" },
      { key: "role", title: t("role"), dataIndex: "role" },
    ],
    [t]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(users)) {
    return <div>No users found.</div>;
  }

  return (
    <div>
      <MyTable
        isLoading={isLoading}
        columns={columns}
        data={users.map((item, index) => ({
          ...item,
          key: item.id,
          index: index + 1,
          fio: `${item.firstName || ""} ${item.lastName || ""}`.trim(),
        }))}
      />
    </div>
  );
};

export default EmployeeTable;
