import { Booking } from "@/service/Booking";
import { Room } from "@/service/Room";
import { create } from "zustand";

type Store = {
  rooms: Room[];
  bookings: Booking[];
  findRoom: (id: string) => Room | undefined;
  setBookings: (bookings: Booking[]) => void;
  setRooms: (rooms: Room[]) => void;
  editBooking: (booking: Booking) => void;
  deleteBooking: (id: string) => void;
  addBooking: (booking: Booking) => void;
};

export const useStore = create<Store>((set, get) => ({
  rooms: [],
  bookings: [],
  setRooms: (rooms: Room[]) => set(() => ({ rooms })),
  findRoom: (id: string) => {
    const { rooms } = get()
    return rooms.find((room) => room.id === id)
  },
  setBookings: (bookings: Booking[]) => set(() => ({ bookings })),
  editBooking: (booking: Booking) =>
    set(({ bookings }) => ({
      bookings: bookings.map((b) => (booking.id === b.id ? booking : b)),
    })),
  deleteBooking: (id: string) =>
    set(({ bookings }) => ({
      bookings: bookings.filter((b) => b.id !== id),
    })),
  addBooking: (booking: Booking) =>
    set(({ bookings }) => ({
      bookings: [...bookings, booking],
    })),
}));
