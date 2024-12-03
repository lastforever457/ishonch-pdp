import MyTable from "../my-table.tsx";
import { useEffect, useMemo, useState } from "react";
import { IUser } from "../../interfaces.ts";
import { getAllUsers } from "../queries/user-queries.ts";

function GroupTable() {
  const [data, setData] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllUsers();
      if (data) {
        setData(data.filter((item) => item.role === "STUDENT"));
        console.log(data);
      }
    };
    fetchData();
  });

  const columns = useMemo(
    () => [
      { key: "id", title: "Id", dataIndex: "id" },
      { key: "groups", title: "Groups", dataIndex: "groups" },
      { key: "teacher", title: "Teacher", dataIndex: "teacher" },
      { key: "stNumber", title: "St number", dataIndex: "stNumber" },
      { key: "time", title: "Time", dataIndex: "time" },
      { key: "days", title: "Days", dataIndex: "days" },
    ],
    [],
  );

  return (
    <div>
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
    </div>
  );
}

export default GroupTable;
