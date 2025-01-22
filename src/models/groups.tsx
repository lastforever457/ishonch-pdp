import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./axios";

export type GroupType = "ACTIVE" | "ARCHIVE";

export const useGroups = (status: GroupType) => {
  const data = useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const { data } = await api.get(`/group/${status}`);
      return data;
    },
  });
  return data;
};

export const useGroup = (id: string) => {
  const data = useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const { data } = await api.get(`/group/attendance/${id}`);
      return data;
    },
  });
  return data;
};

export const useGroupProfile = (id: string) => {
  const data = useQuery({
    queryKey: ["group-profile"],
    queryFn: async () => {
      const { data } = await api.get(`/group/profile/${id}`);
      return data;
    },
    select: (data) => data?.data,
  });
  return data;
};

export const useCreateGroup = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: ["create-group"],
    mutationFn: async (newGroup: Record<string, any>) => {
      await api.post("/group/addGroup", newGroup);
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  return data;
};

export const useUpdateGroup = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: ["update-group"],
    mutationFn: async (id: string) => {
      const res = await api.patch(`/group/update/${id.toString()}`);
      console.log(res);
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  return data;
};

export const useDeleteGroup = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: ["delete-group"],
    mutationFn: async (id: string) => {
      await api.delete(`/group/delete/${id}`);
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  return data;
};
