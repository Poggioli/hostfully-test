/* eslint-disable @typescript-eslint/no-explicit-any */
import { useStore } from "@/lib/store";
import { useQuery } from "react-query";
import { Room } from ".";
import axiosClient from "../api";

const keys = {
  getRooms: ["rooms"],
};

export function useGetRooms(options?: any) {
  const { setRooms } = useStore();

  return useQuery<Room[]>(keys.getRooms, {
    queryFn: async () => {
      const res = await axiosClient.get<Room[]>("/rooms");
      return res.data;
    },
    onSuccess(data: any) {
      setRooms(data);
    },
    ...options,
  });
}
