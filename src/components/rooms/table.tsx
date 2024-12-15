import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import MyTable from "../my-table";

const RoomsTable = ({
  isLoading,
  rooms,
}: {
  isLoading: boolean;
  rooms: Record<string, any>[];
}) => {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      { key: "name", title: t("roomsPage.name"), dataIndex: "name" },
      {
        key: "capacity",
        title: t("roomsPage.capacity"),
        dataIndex: "capacity",
      },
      {
        key: "tables",
        title: t("roomsPage.tables count"),
        dataIndex: "tables",
      },
      {
        key: "chairs",
        title: t("roomsPage.chairs count"),
        dataIndex: "chairs",
      },
    ],
    [t]
  );

  return (
    <div>
      <MyTable
        isLoading={isLoading}
        columns={columns}
        data={rooms.map((item, index) => ({
          ...item,
          key: item.id,
          index: index + 1,
        }))}
      />
    </div>
  );
};

export default RoomsTable;
