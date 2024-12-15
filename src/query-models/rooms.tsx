import { useQuery } from "@tanstack/react-query";
import api from "../utils/axios";

const useRooms = (options: Record<string, any>) => {
  const { data, isLoading, isError, ...params } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const res = await api.post(`/rooms/findMany`, options);
      return await res.data;
    },
  });

  return { data, isLoading, isError, ...params };
};

export const useRoom = (options: Record<string, any>) => {
  const { data, isLoading, isError, ...params } = useQuery({
    queryKey: ["room"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/rooms/findUnique`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      });
      return await res.json();
    },
  });
  return { data, isLoading, isError, ...params };
};

export default useRooms;
