import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocationParams } from "../../hooks/use-location-params";
import MyTable from "../my-table";
import useUsers from "../../query-models/users";

const StudentTable = () => {
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
          role: "STUDENT",
        },
        ...(query.studentTab === "archive"
          ? [
              {
                status: "ARCHIVED",
              },
            ]
          : []),
      ],
    },
    include: { group: true },
  });

  useEffect(() => {
    refetch();
  }, [query.employeeTab]);

  const columns = useMemo(
    () => [
      { key: "firstName", title: t("form.first name"), dataIndex: "firstName" },
      { key: "lastName", title: t("form.last name"), dataIndex: "lastName" },
      { key: "phone", title: t("form.phone"), dataIndex: "phone" },
      {
        key: "group",
        title: t("groups"),
        dataIndex: ["group", "name"],
        render: (group: Record<string, any>) => {
          return group ? <span className="capitalize">{group.name}</span> : "-";
        },
      },
      {
        key: "role",
        title: t("role"),
        dataIndex: "role",
        render: (text: string) => <span className="capitalize">{text}</span>,
      },
    ],
    [t]
  );

  return (
    <div>
      <MyTable
        isError={isError}
        error={error}
        isLoading={isLoading}
        columns={columns}
        data={users}
      />
    </div>
  );
};

export default StudentTable;
