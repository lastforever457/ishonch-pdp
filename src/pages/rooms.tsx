import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AutoForm } from "../components/auto-form";
import MyDrawer from "../components/my-drawer";
import MyTable from "../components/my-table";
import { useLocationParams } from "../hooks/use-location-params";
import { useRouterPush } from "../hooks/use-router-push";
import i18n from "../i18n/i18n";
import PageLayout from "../layouts/page-layout";
import { rooms } from "../test-data";

const Rooms = () => {
  const { t } = useTranslation();
  const { query } = useLocationParams();
  const { push } = useRouterPush();

  const fields = useMemo(
    () => [
      {
        name: "name",
        label: t("rooms.roomName"),
        type: "text",
        rules: [
          {
            required: true,
            message: t("formMessages.name"),
          },
        ],
      },
      {
        name: "capacity",
        label: t("rooms.roomCapacity"),
        type: "text",
        rules: [
          {
            required: true,
            message: t("formMessages.capacity"),
          },
        ],
      },
      {
        name: "count",
        label: t("rooms.countOfChairs"),
        type: "text",
        rules: [
          {
            required: true,
            message: t("formMessages.count"),
          },
        ],
      },
    ],
    [t]
  );

  const columns = useMemo(
    () => [
      {
        title: t("rooms.roomName"),
        dataIndex: "name",
        key: "name",
      },
      {
        title: t("rooms.roomCapacity"),
        dataIndex: "capacity",
        key: "capacity",
      },
      {
        title: t("rooms.countOfChairs"),
        dataIndex: "count",
        key: "count",
      },
    ],
    []
  );

  const onCancel = () => {
    push({
      query: {
        add: undefined,
        edit: undefined,
        view: undefined,
        id: undefined,
      },
    });
  };

  const onFinish = (values: Record<string, any>) => {
    console.log(values);
  };
  return (
    <PageLayout title={t("rooms.title")}>
      <MyTable columns={columns} data={rooms} />
      <MyDrawer
        entryPoint="add"
        title={
          i18n.language === "uz"
            ? `${t("rooms.titleSingular")} ${t("crud.add")}`
            : `${t("crud.add")} ${t("rooms.titleSingular")}`
        }
      >
        <AutoForm
          onFinish={onFinish}
          onCancel={onCancel}
          saveTitle={query.add ? t("crud.create") : t("form.save")}
          cancelTitle={t("form.cancel")}
          fields={fields}
        />
      </MyDrawer>
    </PageLayout>
  );
};

export default Rooms;
