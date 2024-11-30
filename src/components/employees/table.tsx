import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useLocationParams } from "../../hooks/use-location-params";
import { IUser } from "../../interfaces";
import { api } from "../utils";

const EmployeeTable = () => {
  const [data, setData] = useState<IUser[]>([]);
  const { query } = useLocationParams();
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${api}/employees${
          query.employeeTab === "teachers"
            ? "?role=TEACHER"
            : query.employeeTab === "archive"
            ? "?status=ARCHIVED"
            : query.employeeTab === "other"
            ? "?status=BLOCKED"
            : ""
        }`
      );

      setData(Array.isArray(res) ? res : []);
    };
    fetchData();
  }, [query.employeeTab]);
  const columns = useMemo(
    () => [
      { key: "id", title: "Id", dataIndex: "id" },
      { key: "fio", title: "FIO", dataIndex: "fio" },
      { key: "phone", title: "Phone", dataIndex: "phone" },
      { key: "role", title: "Role", dataIndex: "role" },
    ],
    []
  );

  return <div></div>;
};

export default EmployeeTable;
