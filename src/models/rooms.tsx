import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./axios";
import { DataType } from "./users";
import { message } from "antd";
import { t } from "i18next";

export const useRooms = () => {
  const rooms = useQuery<DataType>({
    queryKey: ["rooms"],
    queryFn: async () => {
      const res = await api.get("/room");
      return res.data;
    },
  });

  return rooms;
};

export const useCreateRoom = () => {
  const queryClient = useQueryClient();
  const createRoom = useMutation({
    mutationKey: ["create-room"],
    mutationFn: async (newRoom: Record<string, any>) => {
      await api.post("/room", newRoom);
      message.success(t("formMessages.success"));
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
  return createRoom;
};

export const useUpdateRoom = () => {
  const queryClient = useQueryClient();
  const updateRoom = useMutation({
    mutationKey: ["update-room"],
    mutationFn: async (room: Record<string, any>) => {
      await api.patch(`/room/${room.id}`, room.data);
      message.success(t("formMessages.success"));
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
  return updateRoom;
};

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();
  const deleteRoom = useMutation({
    mutationKey: ["delete-room"],
    mutationFn: async (id: number | string) => {
      await api.delete(`/room/${id}`);
      message.success(t("formMessages.success"));
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
  return deleteRoom;
};
