import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./axios";

export type StaffTypes = "TEACHER" | "OTHER" | "CLEANER";

export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
  phoneNumber: string;
  gender: "MALE" | "FEMALE";
  status: "ACTIVE" | "INACTIVE";
  role: StaffTypes;
}

export interface DataType {
  message: string;
  data: Record<string, any>;
  status: boolean;
}

export const useUsers = (status: StaffTypes) => {
  const users = useQuery<DataType>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get(`/staff/${status}`);
      return res.data;
    },
  });

  return users;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const createUser = useMutation({
    mutationKey: ["create-user"],
    mutationFn: async (newUser: Record<string, any>) => {
      await api.post("/staff/create", newUser);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  return createUser;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const deleteUser = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: async (id: number | string) => {
      await api.delete(`/staff/${id}`);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  return deleteUser;
};
