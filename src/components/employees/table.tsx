import { isArray } from "lodash-es";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocationParams } from "../../hooks/use-location-params";
import { IUser } from "../../interfaces";
import MyTable from "../my-table";
import { getAllUsers } from "../queries/user-queries";

const EmployeeTable = () => {
  const [data, setData] = useState<IUser[]>([]);
  const { query } = useLocationParams();
  const { t } = useTranslation();
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllUsers();
      setData(isArray(res) ? res : []);
      console.log(res);
    };
    fetchData();
  }, [query.employeeTab]);
  const columns = useMemo(
    () => [
      { key: "id", title: "Id", dataIndex: "id" },
      { key: "fio", title: t("fio"), dataIndex: "fio" },
      { key: "phone", title: t("phone"), dataIndex: "phone" },
      { key: "role", title: t("role"), dataIndex: "role" },
    ],
    [t]
  );

  return (
    <div>
      <MyTable
        columns={columns}
        data={data.map((item: Record<string, any>) => ({
          ...item,
          key: item.id,
          fio: `${item.firstName || ""} ${item.lastName || ""}`,
        }))}
      />
    </div>
  );
};

export default EmployeeTable;
