import { useQuery } from "@tanstack/react-query";
import api from "./axios";

export const useUsers = () => {
  const users = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.post("/staff", {
        status: "OTHER",
      });
      return res.data;
    },
    select: (data) => data.data,
  });

  return users;
};
