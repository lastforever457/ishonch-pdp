import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import MyTable from "../../components/my-table";
import { debtors } from "../../test-data";

const Debtors = () => {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      {
        title: `${t("form.name")} ${t("form.lastName")}`,
        dataIndex: "fullName",
        key: "fullName",
      },
      {
        title: t("form.phone"),
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: t("groups.title"),
        key: "group",
        render: (_: any, record: Record<string, any>) => (
          <span>
            <span
              style={{
                backgroundColor: "#A0D468",
                color: "white",
                padding: "4px 8px",
                borderRadius: "4px",
              }}
            >
              {record.name}
            </span>{" "}
            {record.time}
          </span>
        ),
      },
      {
        title: t("form.comment"),
        dataIndex: "comment",
        key: "comment",
      },
    ],
    [t]
  );

  return (
    <>
      <MyTable columns={columns} data={debtors} />
    </>
  );
};

export default Debtors;
