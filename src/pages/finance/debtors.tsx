import { Button } from "antd";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineKeyboardReturn } from "react-icons/md";
import { CustomLoader } from "../../components/loader";
import MyTable from "../../components/my-table";
import {
  useDebtorStudents,
  useUnblockDebtorStudent,
} from "../../models/students";
import { formatStatus } from "../../utils";

const Debtors = () => {
  const { t } = useTranslation();
  const { data, isLoading: isLoadingStudents } = useDebtorStudents();
  const {
    mutate: unblockDebtorStudent,
    isPending: isBlockDebtorStudentPending,
  } = useUnblockDebtorStudent();
  const columns = useMemo(
    () => [
      {
        title: t("form.name"),
        dataIndex: "firstname",
        key: "firstname",
      },
      {
        title: t("form.lastName"),
        dataIndex: "lastname",
        key: "lastname",
      },
      {
        title: t("form.phone"),
        dataIndex: "phoneNumber",
        key: "phoneNumber",
        ellipsis: {
          showTitle: false,
        },
      },
      {
        title: t("form.status"),
        dataIndex: "status",
        key: "status",
      },
      {
        title: t("actions.actions"),
        dataIndex: "actions",
        key: "actions",
        render: (student: Record<string, any>) => (
          <Button
            type="text"
            onClick={async () =>
              await unblockDebtorStudent(student.id.toString())
            }
            className="p-0 text-2xl size-8 text-green-500 hover:!text-green-700"
          >
            <MdOutlineKeyboardReturn />
          </Button>
        ),
      },
    ],
    [t],
  );

  if (isLoadingStudents || isBlockDebtorStudentPending) {
    return <CustomLoader />;
  }

  return (
    <div className="flex flex-col">
      <MyTable
        name="finance"
        hasActions={false}
        columns={columns}
        data={data?.data.map((student: Record<string, any>) => ({
          ...student,
          actions: student,
          status: t(`status.${(student?.status as string).toLowerCase()}`),
        }))}
      />
    </div>
  );
};

export default Debtors;
