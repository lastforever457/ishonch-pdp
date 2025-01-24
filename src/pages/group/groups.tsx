import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AutoForm, FormField } from "../../components/auto-form.tsx";
import MyDrawer from "../../components/my-drawer.tsx";
import MySegmented from "../../components/my-segmented.tsx";
import MyTable from "../../components/my-table.tsx";
import { useLocationParams } from "../../hooks/use-location-params.tsx";
import PageLayout from "../../layouts/page-layout.tsx";
import { useUsers } from "../../models/users.tsx";
import {
  GroupType,
  useCreateGroup,
  useDeleteGroup,
  useGroups,
} from "../../models/groups.tsx";
import { useRooms } from "../../models/rooms.tsx";
import { Form, Table } from "antd";
import { Loader } from "../../components/loader.tsx";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { defaultDateFormat } from "../../utils.ts";

const Groups = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { query } = useLocationParams();
  const {
    data: groups,
    isLoading: isGroupsLoading,
    refetch: refetchGroups,
  } = useGroups(
    ((query.groupsTab?.toString().toUpperCase() as GroupType) ||
      "ACTIVE") as GroupType,
  );
  const { data: rooms } = useRooms();
  const {} = useGroups("ARCHIVE");
  const { mutate } = useCreateGroup();
  const { mutate: deleteGroup } = useDeleteGroup();

  const { data: teachers, isLoading: isTeacherLoading } = useUsers("TEACHER");

  useEffect(() => {
    const refetch = async () => {
      await refetchGroups();
    };
    refetch();
  }, [query.groupsTab]);

  const data = useMemo(() => {
    const remainedData: Record<string, any> | undefined = query.search
      ? groups?.data?.filter(
          (item: Record<string, any>) =>
            item.groupName.includes(query.search as string) ||
            item.courseName.includes(query.search as string),
        )
      : groups?.data;
    return (
      remainedData?.map((item: Record<string, any>) => ({
        ...item,
        key: item.id,
        fio: {
          id: item.id,
          name: `${item.groupName || ""} ${item.courseName || ""}`,
        },
      })) || []
    );
  }, [groups, query.search]);

  useEffect(() => {
    if (query.edit && query.id) {
      form.setFieldsValue(
        groups?.data.find((item: Record<string, any>) => item.id === query.id),
      );
    }
  }, [query.edit, query.id, groups?.data, form]);

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
    [t, teachers, rooms],
  );

  const columns = useMemo(
    () => [
      {
        title: t("groups.name"),
        dataIndex: "groupName",
        key: "groupName",
        render: ({ groupName, groupId }: Record<string, any>) => (
          <Link to={`${groupId}`}>{groupName}</Link>
        ),
      },
      {
        title: t("groups.courseName"),
        dataIndex: "courseName",
        key: "courseName",
      },
      {
        title: t("groups.teacher"),
        dataIndex: "teacher",
        key: "teacher",
        render: (teacher: Record<string, any>) =>
          teacher?.firstname + " " + teacher?.lastname,
      },
      {
        title: t("groups.room"),
        dataIndex: "room",
        key: "room",
        render: (room: Record<string, any>) => room?.roomName,
      },
      {
        title: t("groups.days"),
        dataIndex: "days",
        key: "days",
      },
      {
        title: t("groups.startTime"),
        dataIndex: "startTime",
        key: "startTime",
        render: (startTime: string) => defaultDateFormat(startTime),
      },
      {
        title: t("groups.startDate"),
        dataIndex: "startDate",
        key: "startDate",
        render: (startDate: string) => defaultDateFormat(startDate),
      },
      {
        title: t("groups.endDate"),
        dataIndex: "endDate",
        key: "endDate",
        render: (endDate: string) => defaultDateFormat(endDate),
      },
      {
        title: t("groups.price"),
        dataIndex: "groupPrice",
        key: "groupPrice",
        render: (groupPrice: number) => groupPrice + "so'm",
      },
    ],
    [t],
  );

  const onFinish = (values: Record<string, any>) => {
    console.log(values);
    mutate({
      groupId: query.id as string,
      data: {
        ...values,
        groupPrice: Number(values.groupPrice),
      },
    });
  };

  if (isGroupsLoading || isTeacherLoading) {
    return <Loader />;
  }

  return (
    <PageLayout
      title={t("groups.title")}
      segmented={
        <MySegmented
          segmentedValues={[
            { value: t("groups.active"), key: "active", isPrimary: true },
            { value: t("groups.archive"), key: "archive" },
          ]}
          queryName={"groupsTab"}
        />
      }
    >
      <MyTable
        columns={columns}
        data={
          data.map((item: Record<string, any>) => {
            return {
              ...item,
              groupName: { groupName: item.groupName, groupId: item.id },
            };
          }) || []
        }
        name="group"
        deleteFunc={deleteGroup}
      />
      <MyDrawer entryPoint="add" title={t("groups.titleSingular")}>
        <AutoForm
          form={form}
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
