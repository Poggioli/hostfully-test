import { create } from 'zustand'

type Room = {
    id: string;
    name: string;
    description: string;
    pricePerDay: number;
    photos: string[];
}

type Booking = {
    id: string;
    roomId: string;
    totalPrice: number;
    startDate: Date;
    endDate: Date;
}

type Store = {
    rooms: Room[];
    bookings: Booking[];
    setBookings: (bookings: Booking[]) => void;
    setRooms: (rooms: Room[]) => void;
    editBooking: (id: string, booking: Booking) => void;
    deleteBooking: (id: string) => void;
    addBooking: (booking: Booking, id?: string) => void;
}

const useStore = create<Store>((set) => ({
    rooms: [],
    bookings: [],
    setRooms: (rooms: Room[]) => set(() => ({ rooms })),
    setBookings: (bookings: Booking[]) => set(() => ({ bookings})),
    editBooking: (id: string, booking: Booking) => set(({ bookings }) => {
        const newBookings = bookings.map((b) => id === b.id ? booking : b);
        return {
            bookings: newBookings
        }
    }),
    deleteBooking: (id: string) => set(({ bookings }) => ({
        bookings: bookings.filter((b) => b.id !== id)
    })),
    addBooking: (booking: Booking) => set(({ bookings }) => ({
        bookings: [...bookings, booking]
    })),
}))