import { Button, Dropdown, Popconfirm, Skeleton } from "antd";
import { t } from "i18next";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRouterPush } from "../hooks/use-router-push";
import { apiLink } from "@/utils/api-link";
import api from "@/utils/axios";
import { useMemo } from "react";

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
  isLoading,
  isError,
  error,
}: {
  columns: Column[];
  data: Row[];
  hasActions?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  error?: any;
}) => {
  const { push } = useRouterPush();
  const extendedColumns = useMemo(
    () =>
      [
        {
          key: "number",
          title: "#",
          dataIndex: "number",
          render: (_: any, __: any, index: number) => index + 1, // Tartib raqami
        },
        ...columns,
        hasActions && {
          key: "actions",
          title: t("actions"),
          dataIndex: "actions",
        },
      ].filter(Boolean),
    [columns, hasActions, t]
  );

  if (isLoading) {
    return (
      <div className="custom-table mt-10">
        <table className="w-full">
          <thead className="bg-white text-left text-xl">
            <tr>
              {columns.map((column: any) => (
                <th key={column.key} className="py-4 pl-2">
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array(10)
              .fill("")
              .map((_, i) => (
                <tr
                  key={i}
                  className="hover:bg-white rounded-3xl transition-all overflow-hidden"
                >
                  {columns.map((_: any, index: number) => (
                    <td className="py-4 pl-2 text-left text-lg" key={index}>
                      <Skeleton
                        active
                        title={{ width: 100 }}
                        paragraph={false}
                      />
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

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
          {data.map((item: Record<string, any>, index: number) => (
            <tr
              key={item.id || index} // Har bir qator uchun noyob `key`
              className="hover:bg-white rounded-3xl transition-all overflow-hidden"
            >
              {extendedColumns.map((column: any, colIndex: number) => (
                <td className="py-4 pl-2 text-left text-lg" key={colIndex}>
                  {column.key === "actions" ? (
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: "change",
                            label: t("crud.edit"),
                            onClick: () =>
                              push({ query: { edit: true, id: item.id } }),
                          },
                          {
                            key: "delete",
                            label: (
                              <Popconfirm
                                title={t("confirmation.delete")}
                                onConfirm={async () => {
                                  await api.post("/users/delete", {
                                    where: {
                                      id: item.id,
                                    },
                                  });
                                }}
                                okText={t("crud.delete")}
                                cancelText={t("cancel")}
                              >
                                {t("crud.delete")}
                              </Popconfirm>
                            ),
                          },
                        ],
                      }}
                      trigger={["click"]}
                    >
                      <Button
                        type="text"
                        icon={<BsThreeDotsVertical />}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </Dropdown>
                  ) : column.key === "number" ? (
                    index + 1 // Tartib raqami
                  ) : (
                    item[column.dataIndex]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyTable;
