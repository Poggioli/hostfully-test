/* eslint-disable @typescript-eslint/no-explicit-any */
import { useStore } from "@/lib/store";
import axiosClient from "@/service/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Booking } from "./booking.types";

const keys = {
  getBookings: ["bookings"],
  deleteBookings: ["deleteBookings"],
  updateBookings: ["updateBookings"],
  postBookings: ["postBookings"],
};

export function useGetBooking(options?: any) {
  const { setBookings } = useStore();

  return useQuery<Booking[]>(keys.getBookings, {
    queryFn: async () => {
      const res = await axiosClient.get<Booking[]>("/bookings");
      return res.data;
    },
    onSuccess(data) {
      setBookings(data);
    },
    ...options,
  });
}

export function useDeleteBooking(options?: any) {
  const queryClient = useQueryClient();
  const { deleteBooking, addBooking } = useStore();

  return useMutation(
    keys.deleteBookings,
    async (id: string, booking?: Booking) => {
      await axiosClient.delete(`/bookings/${id}`);
      return booking;
    },
    {
      onMutate: async (id: string) => {
        await queryClient.cancelQueries({ queryKey: keys.deleteBookings });
        const previousBookings = queryClient.getQueryData(keys.getBookings);
        deleteBooking(id);
        return { previousBookings };
      },
      onError: (err, variables, context: any) => {
        const booking: Booking = context.previousBookings as Booking;
        addBooking(booking);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: keys.getBookings });
      },
      ...options,
    }
  );
}

export function useEditBooking(options?: any) {
  const queryClient = useQueryClient();
  const { editBooking } = useStore();

  return useMutation(
    keys.updateBookings,
    async (booking: Booking) => {
      await axiosClient.put(`/bookings/${booking.id}`, booking);
      return booking;
    },
    {
      onMutate: async (booking: Booking) => {
        await queryClient.cancelQueries({ queryKey: keys.updateBookings });
        const previousBookings = queryClient.getQueryData<Booking[]>(
          keys.getBookings
        ) as Booking[];
        editBooking(booking);
        return {
          previousBooking: previousBookings.find((b) => b.id === booking.id),
        };
      },
      onError: (err, variables, context: any) => {
        const booking: Booking = context.previousBooking as Booking;
        editBooking(booking);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: keys.getBookings });
      },
      ...options,
    }
  );
}

export function usePostBooking(options?: any) {
  const queryClient = useQueryClient();
  const { deleteBooking, addBooking } = useStore();

  return useMutation(
    keys.postBookings,
    async (booking: Booking) => {
      const res = await axiosClient.post(`/bookings`, booking);
      return res.data;
    },
    {
      onMutate: async (booking: Booking) => {
        await queryClient.cancelQueries({ queryKey: keys.postBookings });
        const previousBookings = queryClient.getQueryData<Booking[]>(
          keys.getBookings
        ) as Booking[];
        addBooking(booking);
        return { previousBookings };
      },
      onError: (err, variables, context: any) => {
        const booking: Booking = context.previousBooking as Booking;
        deleteBooking(booking.id);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: keys.getBookings });
      },
      ...options,
    }
  );
}
