import { useQuery } from "@tanstack/react-query";
import api from "../utils/axios";

const useUsers = (options: Record<string, any>) => {
  const { data, isLoading, isError, error, ...params } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.post(`/users/findMany`, options);

      return res.data;
    },
  });

  return { data, isLoading, isError, error, ...params };
};

export const useUser = (options: Record<string, any>) => {
  const { data, isLoading, isError, error, ...params } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await api.post(`/users/findUnique`, options);

      return res.data;
    },
  });

  return { data, isLoading, isError, error, ...params };
};

export default useUsers;
