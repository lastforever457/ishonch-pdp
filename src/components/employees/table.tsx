import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocationParams } from "../../hooks/use-location-params";
import MyTable from "../my-table";
import useUsers from "../../query-models/users";

const EmployeeTable = () => {
  const { query } = useLocationParams();
  const { t } = useTranslation();

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
