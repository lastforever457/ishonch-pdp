import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import MySegmented from "../components/my-segmented.tsx";
import MyTable from "../components/my-table.tsx";
import PageLayout from "../layouts/page-layout.tsx";
import MyDrawer from "../components/my-drawer.tsx";
import { Button, Input, Popover, Select, TimePicker } from "antd";

const Groups = () => {
  const { t } = useTranslation();

  const content = (
    <div className={"flex flex-col gap-3"}>
      <span>Juft kun</span>
      <span>Toq kun</span>
      <span>Dushanba</span>
      <span>Seshanba</span>
      <span>Chorshanba</span>
      <span>Payshanba</span>
      <span>Juma</span>
      <span>Shanba</span>
    </div>
  );

  const columns = useMemo(
    () => [
      {
        key: "name",
        title: t("form.name"),
        dataIndex: "name",
        fixed: true,
      },
      { key: "phone", title: t("form.phone"), dataIndex: "phone" },
      { key: "role", title: t("form.role"), dataIndex: "role" },
    ],
    [t],
  );

  const groups = useMemo(
    () => [
      {
        name: "sdfsdgsd",
        phone: "sdfsdgsd",
        role: "sdfsdgsd",
      },
      {
        name: "sdfsdgsd",
        phone: "sdfsdgsd",
        role: "sdfsdgsd",
      },
      {
        name: "sdfsdgsd",
        phone: "sdfsdgsd",
        role: "sdfsdgsd",
      },
      {
        name: "sdfsdgsd",
        phone: "sdfsdgsd",
        role: "sdfsdgsd",
      },
    ],
    [t],
  );

  return (
    <PageLayout
      title={t("groups.title")}
      segmented={
        <MySegmented
          segmentedValues={[
            { value: t("groups.active"), key: "active" },
            { value: t("groups.archive"), key: "archive", isPrimary: true },
          ]}
          queryName={"groupsTab"}
        />
      }
    >
      <MyTable columns={columns} data={groups} />
      <MyDrawer
        entryPoint="add"
        children={
          <div>
            <div className={"flex flex-col gap-3"}>
              <span>{t("groups.courseName")}</span>
              <Select
                showSearch
                placeholder="Select a teacher"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  { value: "1", label: "Frontend" },
                  { value: "2", label: "Python" },
                  { value: "3", label: "Java" },
                  { value: "4", label: "Flutter" },
                ]}
              />
            </div>
            <div className={"flex flex-col gap-3"}>
              <span>{t("groups.chooseTeacher")}</span>
              <Select
                showSearch
                placeholder="Select a teacher"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  { value: "1", label: "Adam" },
                  { value: "2", label: "John" },
                  { value: "3", label: "Kelly" },
                  { value: "4", label: "James" },
                ]}
              />
            </div>
            <div className={"flex flex-col gap-3"}>
              <span>{t("groups.days")}</span>
              <Popover placement="right" content={content}>
                <Input className={"text-sm"} placeholder={"Select a days"} />
              </Popover>
            </div>
            <div className={"flex flex-col gap-3"}>
              <span>{t("groups.chooseRoom")}</span>
              <Select
                showSearch
                placeholder="Select a person"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  { value: "1", label: "O'qituvchi" },
                  { value: "2", label: "O'quvchi" },
                  { value: "3", label: "Farrosh" },
                ]}
              />
            </div>
            <div className={"flex flex-col gap-3"}>
              <span>{t("groups.startTime")}</span>
              <TimePicker minuteStep={15} secondStep={10} hourStep={1} />
            </div>
            <div className={"flex justify-end gap-3 mt-5"}>
              <Button onClick={() => {}}>Cancel</Button>

              <Button onClick={() => {}}>Send</Button>
            </div>
          </div>
        }
        title={t("groups.titleSingular")}
      ></MyDrawer>
    </PageLayout>
  );
};

export default Groups;
