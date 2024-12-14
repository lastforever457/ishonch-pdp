import { useQuery } from "@tanstack/react-query";
import api from "../utils/axios";

const useUsers = (options: Record<string, any>) => {
  const { data, isLoading, isError, ...params } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.post(`/users/findMany`, options);

      return await res.data();
    },
  });

  return { data, isLoading, isError, ...params };
};

export default useUsers;
