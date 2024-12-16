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
    isError,
    error,
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
      { key: "firstName", title: t("form.fio"), dataIndex: "fio" },
      { key: "phone", title: t("form.phone"), dataIndex: "phone" },
      { key: "role", title: t("role"), dataIndex: "role" },
    ],
    [t]
  );

  const data = useMemo(() => {
    return users?.map((item: Record<string, any>) => ({
      ...item,
      key: item.id,
      fio: `${item.firstName || ""} ${item.lastName || ""}`,
    }));
  }, [users]);

  return (
    <div>
      <MyTable
        isError={isError}
        error={error}
        isLoading={isLoading}
        columns={columns}
        data={data || []}
      />
    </div>
  );
};

export default EmployeeTable;
