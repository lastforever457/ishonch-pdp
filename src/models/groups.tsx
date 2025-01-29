import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import api from "./axios";
import { t } from "i18next";

export type GroupType = "ACTIVE" | "ARCHIVE";

export const useSearchGroups = () => {
  const { t } = useTranslation();
  return useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const { data } = await api.post(`/group/search`);
      return data;
    },
  });
};

export const useGroups = (status: GroupType) => {
  return useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const { data } = await api.get(`/group/${status}`);
      return data;
    },
  });
};

export const useGroup = (id: string) => {
  return useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const { data } = await api.get(`/group/attendance/${id}`);
      return data;
    },
  });
};

export const useGroupProfile = (id: string) => {
  return useQuery({
    queryKey: ["group-profile"],
    queryFn: async () => {
      const { data } = await api.get(`/group/profile/${id}`);
      return data;
    },
    select: (data) => data?.data,
    retry: false,
  });
};

export const useCreateGroup = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationKey: ["create-group"],
    mutationFn: async (newGroup: Record<string, any>) => {
      await api.post("/group/addGroup", newGroup?.data);
      message.success(t("formMessages.success"));
      await queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
};

export const useUpdateGroup = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationKey: ["update-group"],
    mutationFn: async (data: {
      groupId: string | number;
      data: Record<string, any>;
    }) => {
      const res = await api.patch(
        `/group/update/${data.groupId.toString()}`,
        data?.data
      );
      message.success(t("formMessages.success"));
      await queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
};

export const useDeleteGroup = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationKey: ["delete-group"],
    mutationFn: async (id: string) => {
      await api.delete(`/group/delete/${id}`);
      message.success(t("formMessages.success"));
      await queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
};
