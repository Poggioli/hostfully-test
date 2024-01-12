/* eslint-disable @typescript-eslint/no-explicit-any */
import { useStore } from "@/lib/store";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Booking } from ".";
import axiosClient from "../api";

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
      return res;
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

  return useMutation(keys.deleteBookings, {
    mutationFn: async (id: string, booking?: Booking) => {
      await axiosClient.delete(`/bookings/${id}`);
      return booking;
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: keys.deleteBookings });
      const previousBookings = queryClient.getQueryData(keys.getBookings);
      deleteBooking(id);
      return { previousBookings };
    },
    onError: (err, newTodo, context: any) => {
      const booking: Booking = context.previousBookings as Booking;
      addBooking(booking);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: keys.getBookings });
    },
    ...options,
  });
}

export function useEditBooking(options?: any) {
  const queryClient = useQueryClient();
  const { editBooking } = useStore();
  
  return useMutation(keys.updateBookings, {
    mutationFn: async (booking: Booking) => {
      await axiosClient.put(`/bookings/${booking.id}`, booking);
      return booking;
    },
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
    onError: (err, newTodo, context: any) => {
      const booking: Booking = context.previousBooking as Booking;
      editBooking(booking);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: keys.getBookings });
    },
    ...options,
  });
}

export function usePostBooking(options?: any) {
  const queryClient = useQueryClient();
  const { deleteBooking, addBooking } = useStore();

  return useMutation(keys.postBookings, {
    mutationFn: async (booking: Booking) => {
      await axiosClient.post(`/bookings`, booking);
      return booking;
    },
    onMutate: async (booking: Booking) => {
      await queryClient.cancelQueries({ queryKey: keys.postBookings });
      const previousBookings = queryClient.getQueryData<Booking[]>(
        keys.getBookings
      ) as Booking[];
      addBooking(booking);
      return { previousBookings };
    },
    onError: (err, newTodo, context: any) => {
      const booking: Booking = context.previousBooking as Booking;
      deleteBooking(booking.id);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: keys.getBookings });
    },
    ...options,
  });
}
