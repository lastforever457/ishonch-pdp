import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import api, { baseURL } from "./axios";

export const useStudents = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const res = await api.get("/student");
      return res.data;
    },
    select: (data) => data.data,
  });
};

export const useArchiveStudent = () => {
  return useQuery({
    queryKey: ["archiveStudent"],
    queryFn: async () => {
      const res = await api.get(`/student/arxiv`);
      return res.data;
    },
    select: (data) => data.data,
  });
};

export const useStudent = (id: string) => {
  return useQuery({
    queryKey: ["student"],
    queryFn: async () => {
      if (!id) return null;
      const res = await api(`/student/${id}`);
      return res.data;
    },
    // select:(data)=>{},
  });
};

export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/student/add", data);
      await queryClient.invalidateQueries({
        queryKey: ["students"],
      });
      message.success(t("formMessages.success"));
      return res.data;
    },
  });
};

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: async (data: { id: string; data: Record<string, any> }) => {
      const res = await api.patch(`/student/update/${data.id}`, data.data);
      message.success(t("formMessages.success"));
      await queryClient.invalidateQueries({ queryKey: ["students"] });
      return res.data;
    },
  });
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/student/delete/${id}`);
      await queryClient.invalidateQueries({
        queryKey: ["students"],
      });
      message.success(t("formMessages.success"));
      return res.data;
    },
  });
};

export const useStudentsWithoutGroup = () => {
  return useQuery({
    queryKey: ["studentsWithoutGroup"],
    queryFn: async () => {
      const res = await api.get("/group/getStudentWithoutGroup");
      return res.data;
    },
  });
};

export const useConnectStudentToGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Record<string, any>) => {
      const res = await fetch(
        `${baseURL}/group/addNewReader/${data?.groupId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data?.data),
        },
      );

      const result = await res.json();

      await queryClient.invalidateQueries({
        queryKey: ["group-profile", "studentsWithoutGroup"],
      });
      return result;
    },
  });
};

export const useDisconnectStudentFromGroup = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: async (data: {
      studentId: string | number;
      groupId: string;
    }) => {
      const res = await api.post(
        `/group/remove/${data.studentId}/${data.groupId}`,
      );
      await queryClient.invalidateQueries({
        queryKey: ["group-profile", "studentsWithoutGroup"],
      });
      return res.data;
    },
  });
  return data;
};

export const useDebtorStudents = () => {
  return useQuery({
    queryKey: ["debtorStudents"],
    queryFn: async () => {
      const res = await api.post("/student/debtors");
      return res.data;
    },
  });
};

export const useBlockStudent = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.post(`/student/stopped/${id}`);
      await queryClient.invalidateQueries({
        queryKey: ["students", "debtorStudents", "archiveStudent"],
      });
      message.success(t("formMessages.success"));
      return res.data;
    },
  });
};

export const useSetDebtorStudent = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.post(`/student/debtor/${id}`);
      await queryClient.invalidateQueries({
        queryKey: ["students", "debtorStudents", "archiveStudent"],
      });
      message.success(t("formMessages.success"));
      return res.data;
    },
  });
};

export const useUnblockDebtorStudent = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.post(`/student/not-debtor/${id}`);
      await queryClient.invalidateQueries({
        queryKey: ["debtorStudents"],
      });
      message.success(t("formMessages.success"));
      return res.data;
    },
  });
};

export const useBlockedStudents = () => {
  return useQuery({
    queryKey: ["blockedStudents"],
    queryFn: async () => {
      const res = await api.get("/student/stopped-students");
      return res.data;
    },
    select: (data) => data?.data,
  });
};
