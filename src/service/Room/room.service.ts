import { useQuery } from "react-query";
import axiosClient from "../api";
import { Room } from ".";

const keys = {
    getRooms: ["rooms"]
};

export function useGetRooms(options: any) {
    return useQuery({
        queryFn: async () => {
            try {
                const res = await axiosClient.get<Room[]>('/rooms');
                return res;
            } catch {
                return null;
            }
        },
        queryKey: keys.getRooms,
        ...options
    });
}