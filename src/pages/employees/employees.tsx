import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AutoForm } from "../../components/auto-form";
import MyDrawer from "../../components/my-drawer";
import MySegmented from "../../components/my-segmented";
import MyTable from "../../components/my-table";
import { useLocationParams } from "../../hooks/use-location-params";
import { useRouterPush } from "../../hooks/use-router-push";
import i18n from "../../i18n/i18n";
import PageLayout from "../../layouts/page-layout";
import { users } from "../../test-data";

const Employees = () => {
  const { t } = useTranslation();
  const { push } = useRouterPush();
  const { query } = useLocationParams();

  const segmentedValues = useMemo<
    { value: string; key: string; isPrimary?: boolean }[]
  >(
    () => [
      {
        value: t("employees.archive"),
        key: "archive",
      },
      {
        value: t("employees.teachers"),
        key: "teachers",
        isPrimary: true,
      },
      {
        value: t("employees.other"),
        key: "other",
      },
    ],
    [t]
  );

  const columns = useMemo(
    () => [
      {
        key: "firstName",
        title: t("form.fio"),
        dataIndex: "fio",
      },
      { key: "phone", title: t("form.phone"), dataIndex: "phone" },
      { key: "role", title: t("form.role"), dataIndex: "role" },
    ],
    [t]
  );

  const data = useMemo<Record<string, any>[]>(() => {
    return users?.map((item: Record<string, any>) => ({
      ...item,
      key: item.id,
      fio: `${item.firstName || ""} ${item.lastName || ""}`,
    }));
  }, [users]);

  const fields = useMemo(
    () => [
      {
        name: "lastName",
        label: t("form.lastName"),
        type: "text",
        rules: [
          {
            required: true,
            message: t("formMessages.lastName"),
          },
        ],
      },
      {
        name: "firstName",
        label: t("form.name"),
        type: "text",
        rules: [
          {
            required: true,
            message: t("formMessages.firstName"),
          },
        ],
      },
      {
        name: "phone",
        label: t("form.phone"),
        type: "text",
        rules: [
          {
            required: true,
            message: t("formMessages.phone"),
          },
        ],
      },
      {
        name: "password",
        label: t("form.password"),
        type: "password",
        rules: [
          {
            required: true,
            message: t("formMessages.password"),
          },
        ],
      },
      {
        name: "role",
        label: t("form.role"),
        type: "text",
        rules: [
          {
            required: true,
            message: t("formMessages.role"),
          },
        ],
      },
      {
        name: "dateOfBirth",
        label: t("form.dateOfBirth"),
        type: "datepicker",
        rules: [
          {
            required: true,
            message: t("formMessages.dateOfBirth"),
          },
        ],
      },
      {
        name: "gender",
        label: t("form.gender"),
        type: "radio",
        options: [
          {
            label: t("form.male"),
            value: "male",
          },
          {
            label: t("form.female"),
            value: "female",
          },
        ],
        rules: [
          {
            required: true,
            message: t("formMessages.gender"),
          },
        ],
      },
    ],
    [t]
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
    <PageLayout
      title={t("employees.title")}
      segmented={
        <MySegmented
          segmentedValues={segmentedValues}
          queryName="employeeTab"
        />
      }
    >
      <MyTable hasDetailPageWithId={"fio"} columns={columns} data={data} />
      <MyDrawer
        entryPoint="add"
        title={
          i18n.language === "uz"
            ? `${t("employees.titleSingular")} ${t("crud.add")}`
            : `${t("crud.add")} ${t("employees.titleSingular")}`
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

export default Employees;
