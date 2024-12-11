import { Button, Dropdown, Popconfirm, Skeleton } from "antd";
import { t } from "i18next";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRouterPush } from "../hooks/use-router-push";

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
}: {
  columns: Column[];
  data: Row[];
  hasActions?: boolean;
  isLoading?: boolean;
}) => {
  const { push } = useRouterPush();
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
          {isLoading
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
            : data.map((item: Record<string, any>) => (
                <tr
                  key={item.id}
                  className="hover:bg-white rounded-3xl transition-all overflow-hidden"
                >
                  {extendedColumns.map((column: any, index: number) => (
                    <td className="py-4 pl-2 text-left text-lg" key={index}>
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
                                      await fetch(
                                        `http://localhost:3000/${column.dataIndex}/delete`,
                                        {
                                          method: "POST",
                                          headers: {
                                            "Content-Type": "application/json",
                                          },
                                          body: JSON.stringify({ id: item.id }),
                                        }
                                      );
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
                      ) : (
                        item[column.dataIndex]
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
