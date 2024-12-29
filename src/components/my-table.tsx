import { Button, Dropdown, Popconfirm, Table } from "antd";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BsThreeDotsVertical } from "react-icons/bs";
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
  const { t } = useTranslation();

  const extendedColumns = useMemo(
    () =>
      [
        {
          key: "number",
          title: "#",
          dataIndex: "number",
          render: (_: any, __: any, index: number) => index + 1,
        },
        ...columns,
        hasActions && {
          key: "actions",
          title: t("actions.actions"),
          dataIndex: "actions",
          render: (_: any, record: Record<string, any>) => (
            <Dropdown
              menu={{
                items: [
                  {
                    key: "edit",
                    label: t("crud.edit"),
                    onClick: () =>
                      push({ query: { edit: true, id: record.id } }),
                  },
                  {
                    key: "delete",
                    label: (
                      <Popconfirm
                        title={t("confirmation.delete")}
                        onConfirm={() => alert("hello")}
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
              <Button type="text" icon={<BsThreeDotsVertical />} />
            </Dropdown>
          ),
        },
      ].filter(Boolean),
    [columns, hasActions, t]
  );

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <Table
      columns={extendedColumns}
      dataSource={data}
      loading={isLoading}
      rowKey={(record) => record.id || record.key}
      scroll={{ x: true }}
    />
  );
};

export default MyTable;
