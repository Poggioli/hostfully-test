import { Booking } from "@/service/Booking";
import { Room } from "@/service/Room";
import { create } from "zustand";

type Store = {
  rooms: Room[];
  bookings: Booking[];
  // rooms: { items: Room[]; error: boolean; };
  // bookings: { items: Booking[]; error: boolean; };
  findRoom: (id: string) => Room | undefined;
  setBookings: (bookings: Booking[]) => void;
  setRooms: (rooms: Room[]) => void;
  editBooking: (booking: Booking) => void;
  deleteBooking: (id: string) => void;
  addBooking: (booking: Booking) => void;
  getBookingsByIdRoom: (id: string) => Booking[];
};

export const useStore = create<Store>((set, get) => ({
  rooms: [],
  bookings: [],
  setRooms: (rooms: Room[]) =>
    set(() => ({
      rooms,
      bookings: get().bookings.map((booking) => {
        const room = rooms.find((room) => room.id === booking.roomId);
        return {
          ...booking,
          roomName: room?.name || "-",
          photos: room?.photos || [],
        };
      }),
    })),
  findRoom: (id: string) => {
    const { rooms } = get();
    return rooms.find((room) => room.id === id);
  },
  setBookings: (bookings: Booking[]) => set(() => ({
    bookings: bookings.map((booking) => {
      const room = get().rooms.find((room) => room.id === booking.roomId);
      return {
        ...booking,
        roomName: room?.name || "-",
        photos: room?.photos || [],
      };
    })
  })),
  editBooking: (booking: Booking) =>
    set(({ bookings }) => ({
      bookings: bookings.map((b) => (booking.id === b.id ? booking : b)),
    })),
  deleteBooking: (id: string) => {
    set(({ bookings }) => ({
      bookings: bookings.filter((b) => b.id !== id),
    }));
  },
  addBooking: (booking: Booking) => {
    return set(({ bookings }) => ({
      bookings: [...bookings, booking],
    }));
  },
  getBookingsByIdRoom: (id: string): Booking[] => {
    return get().bookings.filter((booking) => booking.roomId === id);
  },
}));
