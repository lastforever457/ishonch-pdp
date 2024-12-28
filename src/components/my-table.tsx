import { Button, Dropdown, Popconfirm, Skeleton } from "antd";
import { t } from "i18next";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useRouterPush } from "../hooks/use-router-push";

const MyTable = ({
  columns,
  data,
  hasActions = true,
  hasDetailPageWithId = false,
  isLoading,
  isError,
  error,
}: {
  columns: any;
  data: any;
  hasActions?: boolean;
  hasDetailPageWithId?: false | string;
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
          title: t("actions.actions"),
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
                <MyTableRow
                  key={colIndex}
                  column={column}
                  item={item}
                  index={index}
                  colIndex={colIndex}
                  hasDetailPageWithId={hasDetailPageWithId}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyTable;

const MyTableRow = ({
  column,
  item,
  index,
  colIndex,
  hasDetailPageWithId,
}: {
  column: any;
  item: any;
  index: number;
  colIndex: number;
  hasDetailPageWithId: boolean | string;
}) => {
  const { push } = useRouterPush();
  const { t } = useTranslation();

  return (
    <td className="py-4 pl-2 text-left text-lg" key={colIndex}>
      {column.key === "actions" ? (
        <Dropdown
          menu={{
            items: [
              {
                key: "change",
                label: t("crud.edit"),
                onClick: () => push({ query: { edit: true, id: item.id } }),
              },
              {
                key: "delete",
                label: (
                  <Popconfirm
                    title={t("confirmation.delete")}
                    onConfirm={async () => {
                      alert("hello");
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
      ) : typeof hasDetailPageWithId === "string" &&
        column.dataIndex === hasDetailPageWithId ? (
        <Link type="link" to={`${item.id}`}>
          {item[column.dataIndex]}
        </Link>
      ) : (
        item[column.dataIndex]
      )}
    </td>
  );
};
