import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AutoForm, FormField } from "../../components/auto-form.tsx";
import MyDrawer from "../../components/my-drawer.tsx";
import MySegmented from "../../components/my-segmented.tsx";
import MyTable from "../../components/my-table.tsx";
import { useLocationParams } from "../../hooks/use-location-params.tsx";
import PageLayout from "../../layouts/page-layout.tsx";
import api from "../../models/axios.ts";
import Attendance from "./attendance.tsx";
import { useUsers } from "../../models/users.tsx";
import { useCreateGroup, useGroups } from "../../models/groups.tsx";
import { useRooms } from "../../models/rooms.tsx";
import { values } from "lodash-es";

const Groups = () => {
  const { t } = useTranslation();
  const { query } = useLocationParams();
  const { data: groups, isLoading: isGroupsLoading } = useGroups("ACTIVE");
  const { data: rooms } = useRooms();
  const { mutate } = useCreateGroup();

  const { data: teachers, isLoading: isTeacherLoading } = useUsers("TEACHER");

  const fields = useMemo(
    () => [
      {
        name: "groupName",
        label: t("groups.name"),
        type: "input",
        rules: [
          {
            required: true,
            message: t("formMessages.firstName"),
          },
        ],
      },
      {
        name: "courseName",
        label: t("groups.courseName"),
        type: "input",
        rules: [
          {
            required: true,
            message: t("formMessages.firstName"),
          },
        ],
      },
      {
        name: "teacherId",
        label: t("groups.chooseTeacher"),
        type: "select",
        options: teachers?.data?.map((teacher: Record<string, any>) => ({
          label: teacher.firstname + " " + teacher.lastname,
          value: teacher.id,
        })),
        rules: [
          {
            required: true,
            message: t("formMessages.phone"),
          },
        ],
      },
      {
        name: "days",
        label: t("groups.days"),
        mode: "multiple",
        type: "select",
        options: [
          {
            label: t("groups.monday"),
            value: "Dushanba",
          },
          {
            label: t("groups.tuesday"),
            value: "Seshanba",
          },
          {
            label: t("groups.wednesday"),
            value: "Chorshanba",
          },
          {
            label: t("groups.thursday"),
            value: "Payshanba",
          },
          {
            label: t("groups.friday"),
            value: "Juma",
          },
          {
            label: t("groups.saturday"),
            value: "Shanba",
          },
        ],
        rules: [
          {
            required: true,
            message: t("formMessages.role"),
          },
        ],
      },
      {
        name: "roomId",
        label: t("groups.chooseRoom"),
        type: "select",
        options: rooms?.data?.map((room: Record<string, any>) => ({
          label: room?.name,
          value: room.id,
        })),
        rules: [
          {
            required: true,
            message: t("formMessages.role"),
          },
        ],
      },
      {
        name: "startTime",
        label: t("groups.startTime"),
        type: "timepicker",
        rules: [
          {
            required: true,
            message: t("formMessages.timeStart"),
          },
        ],
      },
      {
        name: "startDate",
        label: t("groups.startDate"),
        type: "datepicker",
        rules: [
          {
            required: true,
            message: t("formMessages.startDate"),
          },
        ],
      },
      {
        name: "endDate",
        label: t("groups.endDate"),
        type: "datepicker",
        rules: [
          {
            required: true,
            message: t("formMessages.endDate"),
          },
        ],
      },
      {
        name: "groupPrice",
        label: t("groups.price"),
        type: "input",
        rules: [
          {
            required: true,
            message: t("formMessages.endDate"),
          },
        ],
      },
    ],
    [t, teachers]
  );

  const columns = useMemo(
    () => [
      {
        key: "group",
        title: t("groups.title"),
        dataIndex: "Guruhlar",
      },
      {
        key: "teacher",
        title: t("groups.chooseTeacher"),
        dataIndex: "Teacher",
      },

      {
        key: "st number",
        title: t("groups.stNumber"),
        dataIndex: "St number",
      },
      {},
      {
        key: "days",
        title: t("groups.days"),
        dataIndex: "Kunlar",
      },
      {
        key: "time",
        title: t("groups.startTime"),
        dataIndex: "Vaqt",
      },
    ],
    [t]
  );

  const onFinish = (values: Record<string, any>) => {
    console.log(values);
    mutate({
      ...values,
      groupPrice: Number(values.groupPrice),
    });
  };

  if (isGroupsLoading || isTeacherLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <PageLayout
      title={t("groups.title")}
      segmented={
        <MySegmented
          segmentedValues={[
            { value: t("groups.active"), key: "active" },
            { value: t("groups.archive"), key: "archive", isPrimary: true },
            { value: t("groups.attendance"), key: "attendance" },
          ]}
          queryName={"groupsTab"}
        />
      }
    >
      <MyDrawer entryPoint="add" title={t("groups.titleSingular")}>
        <AutoForm
          fields={fields as FormField[]}
          onCancel={() => {}}
          onFinish={onFinish}
          saveTitle={t("crud.create")}
          cancelTitle={t("form.cancel")}
        />
      </MyDrawer>
    </PageLayout>
  );
};

export default Groups;
