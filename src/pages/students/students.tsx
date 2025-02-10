import React, { useEffect, useMemo, useState } from "react";
import { Form } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AutoForm, FormField } from "../../components/auto-form.tsx";
import { CustomLoader } from "../../components/loader.tsx";
import MyDrawer from "../../components/my-drawer.tsx";
import MySegmented from "../../components/my-segmented.tsx";
import MyTable from "../../components/my-table.tsx";
import { useLocationParams } from "../../hooks/use-location-params.tsx";
import { useRouterPush } from "../../hooks/use-router-push.tsx";
import PageLayout from "../../layouts/page-layout.tsx";
import { useGroups } from "../../models/groups.tsx";
import {
  useArchiveStudent,
  useBlockedStudents,
  useCreateStudent,
  useDeleteStudent,
  useStudent,
  useStudents,
  useUpdateStudent,
} from "../../models/students.tsx";
import { formatPhoneNumber } from "../../utils.ts";
import useStudentsData from "../../hooks/use-students-data.tsx";

const Students = () => {
  const { push } = useRouterPush();
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { query } = useLocationParams();
  const {
    data: students,
    isLoading: isStudentsLoading,
    refetch: refetchStudents,
  } = useStudents();
  const {
    data: archStudents,
    isLoading: isArchStLoading,
    refetch: refetchArchStudents,
  } = useArchiveStudent();
  const {
    data: blockedStudents,
    isLoading: isBlockedStudentsLoading,
    refetch: refetchBlockedStudents,
  } = useBlockedStudents();
  const { mutate: mutateCreateStudent, isPending: isCreatePending } =
    useCreateStudent();
  const { mutate: mutateUpdateStudent, isPending: isUpdatePending } =
    useUpdateStudent();
  const { mutate: mutateDeleteStudent, isPending: isDeletePending } =
    useDeleteStudent();
  const {
    data: student,
    isLoading: isStudentLoading,
    refetch: refetchStudent,
  } = useStudent(query.id as string);
  const { data: groups, isLoading: isGroupsLoading } = useGroups("ACTIVE");

  const dataToDisplay = useStudentsData(
    query,
    students,
    archStudents,
    blockedStudents,
  );

  useEffect(() => {
    const fetch = async () => {
      if (query.edit && query.id) {
        await refetchStudent();
        console.log(student?.data);
        form.setFieldsValue({
          ...student?.data?.student,
          group: [student?.data?.group?.id],
          phoneNumber: student?.data?.student?.phoneNumber.replace("+998", ""),
        });
      }
    };

    fetch();
  }, [query.edit, query.id, student, form]);

  useEffect(() => {
    const fetch = async () => {
      if (query.studentsTab === "blocked") {
        await refetchBlockedStudents();
      } else if (query.studentsTab === "archive") {
        await refetchArchStudents();
      } else {
        await refetchStudents();
      }
    };

    fetch();
  }, [query.studentsTab]);

  const fields = useMemo(
    () => [
      {
        name: "firstname",
        label: t("form.name"),
        type: "input",
        rules: [
          {
            required: true,
            message: t("formMessages.name"),
          },
        ],
      },
      {
        name: "lastname",
        label: t("form.lastName"),
        type: "input",
        rules: [
          {
            required: true,
            message: t("formMessages.name"),
          },
        ],
      },
      {
        name: "phoneNumber",
        label: t("students.phone"),
        type: "input",
        addonBefore: "+998",
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
        name: "gender",
        label: t("form.gender"),
        type: "radio",
        rules: [
          {
            required: true,
            message: t("formMessages.gender"),
          },
        ],
        options: [
          {
            value: "MALE",
            label: t("form.male"),
          },
          {
            value: "FEMALE",
            label: t("form.female"),
          },
        ],
      },
    ],
    [t, groups, query],
  );

  const columns = useMemo(
    () => [
      {
        key: "fio",
        title: t("form.fio"),
        dataIndex: "fio",
        render: (value: { id: string | number; name: string }) => (
          <Link to={`/students/${value?.id}`}>{value?.name}</Link>
        ),
      },
      {
        key: "phoneNumber",
        title: t("students.phone"),
        dataIndex: "phoneNumber",
        render: (value: any) => formatPhoneNumber(value),
      },
      {
        key: "group",
        title: t("students.group"),
        dataIndex: "group",
        render: (value: any) => (value ? value.toUpperCase() : value),
      },
      {
        key: "gender",
        title: t("form.gender"),
        dataIndex: "gender",
        render: (value: any) => (value ? t(`form.${value}`) : value),
      },
    ],
    [t],
  );

  const onFinish = (values: Record<string, any>) => {
    if (query.edit && query.id) {
      mutateUpdateStudent({
        id: query.id as string,
        data: {
          ...values,
          phoneNumber: values.phoneNumber.startsWith("+998")
            ? values.phoneNumber
            : `+998${values.phoneNumber}`,
        },
      });
    } else {
      mutateCreateStudent({
        ...values,
        phoneNumber: values.phoneNumber.startsWith("+998")
          ? values.phoneNumber
          : `+998${values.phoneNumber}`,
      });
    }
    onCancel();
  };

  const onCancel = () => {
    push({
      query: {
        add: undefined,
        edit: undefined,
        view: undefined,
        id: undefined,
      },
    });
    form.resetFields();
  };

  if (
    isStudentsLoading ||
    isGroupsLoading ||
    isArchStLoading ||
    isBlockedStudentsLoading ||
    isStudentLoading ||
    isCreatePending ||
    isUpdatePending ||
    isDeletePending
  ) {
    return <CustomLoader />;
  }

  return (
    <PageLayout
      title={t("students.title")}
      segmented={
        <MySegmented
          segmentedValues={[
            { value: t("students.students"), key: "students", isPrimary: true },
            { value: t("students.archive"), key: "archive" },
            { value: t("students.blocked"), key: "blocked" },
          ]}
          queryName={"studentsTab"}
        />
      }
    >
      <MyTable
        name="students"
        columns={columns}
        deleteFunc={mutateDeleteStudent}
        data={dataToDisplay}
        additionalActions={true}
        isLoading={
          isStudentsLoading ||
          isGroupsLoading ||
          isArchStLoading ||
          isBlockedStudentsLoading
        }
      />
      <MyDrawer
        form={form}
        entryPoint={query.add ? "add" : "edit"}
        title={t("students.titleSingular")}
      >
        <AutoForm
          form={form}
          fields={fields as FormField[]}
          onFinish={onFinish}
        />
      </MyDrawer>
    </PageLayout>
  );
};

export default Students;
