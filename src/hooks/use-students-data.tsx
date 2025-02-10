import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const useStudentsData = (
  query: any,
  students: any,
  archStudents: any,
  blockedStudents: any,
) => {
  const { t } = useTranslation();
  return useMemo(() => {
    let data: any[] = [];
    let sourceData: any[] | undefined = [];

    switch (query.studentsTab) {
      case "archive":
        sourceData = archStudents;
        break;
      case "blocked":
        sourceData = blockedStudents;
        break;
      default:
        sourceData = students;
        break;
    }

    if (!sourceData) {
      return [];
    }

    data = sourceData.map((item: any) => {
      const student = item?.student || item; // 'archive' va 'blocked' uchun moslashuv
      return {
        ...student,
        key: student?.id,
        group:
          item?.groupName && item?.courseName
            ? `${item?.groupName || ""} - ${item?.courseName || ""}`
            : t("form.not connected"),
        gender: student?.gender?.toLowerCase(),
        fio: {
          id: student?.id,
          name: `${student?.firstname || ""} ${student?.lastname || ""}`.trim(),
        },
        actions: { id: student?.id },
      };
    });

    if (query.search) {
      const searchTerm = query.search.toString().toLowerCase();
      data = data.filter((item: any) => {
        const fullName = `${item?.firstname} ${item?.lastname}`.toLowerCase();
        const phoneNumber = item?.phoneNumber?.toString().toLowerCase() || ""; // Telefon raqam mavjudligini tekshirish
        return (
          fullName.includes(searchTerm) || phoneNumber.includes(searchTerm)
        );
      });
    }

    return data;
  }, [
    query.studentsTab,
    query.search,
    students,
    archStudents,
    blockedStudents,
    t,
  ]);
};

export default useStudentsData;
