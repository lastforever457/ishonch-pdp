import { Button, Dropdown, Skeleton } from "antd";
import { t } from "i18next";
import { useMemo } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

interface Column {
  key: string;
  title: string;
  dataIndex: string;
}

interface Row {
  [key: string]: any;
}

const MyTable = ({
  columns,
  data,
  hasActions = true,
}: {
  columns: Column[];
  data: Row[];
  hasActions?: boolean;
}) => {
  const dropdownMenu = useMemo(
    () => ({
      items: [
        {
          key: "change",
          label: t("change"),
        },
        {
          key: "delete",
          label: t("delete"),
        },
      ],
    }),
    []
  );

  const extendedColumns = [
    ...columns,
    hasActions && {
      key: "actions",
      title: t("actions"),
      dataIndex: "actions",
    },
  ];

  return (
    <div className="custom-table mt-10">
      <table className="w-full">
        <thead className="bg-white text-left text-xl">
          <tr>
            {extendedColumns.map((column: any) => (
              <th key={column.key} className="py-4 pl-2">
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0
            ? Array(10)
                .fill("")
                .map((_, i) => (
                  <tr
                    key={i}
                    className="hover:bg-white rounded-3xl transition-all overflow-hidden"
                  >
                    {extendedColumns.map((_: any, index: number) => (
                      <td className="py-4 pl-2 text-left text-lg" key={index}>
                        <Skeleton
                          active
                          title={{ width: 100 }}
                          paragraph={false}
                        />
                      </td>
                    ))}
                  </tr>
                ))
            : data.map((record) => (
                <tr
                  key={record.id}
                  className="hover:bg-white rounded-3xl transition-all overflow-hidden"
                >
                  {extendedColumns.map((column: any, index: number) => (
                    <td className="py-4 pl-2 text-left text-lg" key={index}>
                      {column.key === "actions" ? (
                        <Dropdown menu={dropdownMenu} trigger={["click"]}>
                          <Button
                            type="text"
                            icon={<BsThreeDotsVertical />}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </Dropdown>
                      ) : (
                        record[column.dataIndex]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>{" "}
      </table>
    </div>
  );
};

export default MyTable;
