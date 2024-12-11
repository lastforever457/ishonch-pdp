import { useQuery } from "@tanstack/react-query";

const useUsers = (options: Record<string, any>) => {
  const { data, isLoading, isError, ...params } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/users/findMany`, {
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

export default useUsers;
