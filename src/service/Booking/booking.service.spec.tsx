/* eslint-disable @typescript-eslint/no-explicit-any */
import { act, renderHook, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { ReactNode } from "react";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { toast } from 'sonner';
import axiosClient from "../api";
import { useDeleteBooking, useEditBooking, useGetBooking, usePostBooking } from './booking.service';
import { Booking } from './booking.types';

const queryCache = new QueryCache();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false
    }
  },
})

const createWrapper = () => {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

const mockSetBookings = jest.fn();
const mockDeleteBooking = jest.fn();
const mockAddBooking = jest.fn();
const mockEditBooking = jest.fn();
jest.mock("@/lib/store", () => {
  return {
    useStore: () => ({
      setBookings: mockSetBookings,
      deleteBooking: mockDeleteBooking,
      addBooking: mockAddBooking,
      editBooking: mockEditBooking
    })
  };
})

describe("Booking service", () => {
  const axiosMock = new MockAdapter(axiosClient);

  afterEach(() => {
    queryCache.clear();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it(`GIVEN a useGetBooking
      WHEN return success
      THEN should call setBookings of useStore`, async () => {
    const bookings: Booking[] = [
      {
        id: 'id-1',
        roomId: 'room-id-1',
        totalPrice: 4000,
        checkIn: new Date("2024-01-15T03:00:00.000Z"),
        checkOut: new Date("2024-01-22T03:00:00.000Z"),
        quantityGuests: 2
      },
    ];

    axiosMock.onGet('/bookings').replyOnce(200, bookings);

    const { result: resultUseGetRooms } = renderHook(() => useGetBooking(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(resultUseGetRooms.current.isSuccess).toBe(true));

    expect(mockSetBookings).toHaveBeenCalledTimes(1);
    expect(mockSetBookings).toHaveBeenCalledWith([{
      ...bookings[0],
      checkIn: "2024-01-15T03:00:00.000Z",
      checkOut: "2024-01-22T03:00:00.000Z"
    }]);
  });

  describe('useDeleteBooking', () => {
    it(`GIVEN a useDeleteBooking
        WHEN return success
        THEN should call toast success
        AND call deleteBooking of useStore`, async () => {
      jest.spyOn(toast, 'success');
      const booking: Booking = {
        id: 'id-1',
        roomId: 'room-id-1',
        totalPrice: 4000,
        checkIn: new Date("2024-01-15T03:00:00.000Z"),
        checkOut: new Date("2024-01-22T03:00:00.000Z"),
        quantityGuests: 2
      }

      axiosMock.onDelete(`/bookings/${booking.id}`).replyOnce(200);

      const { result: resultUseDeleteBooking } = renderHook(() => useDeleteBooking(), {
        wrapper: createWrapper(),
      });

      act(() => resultUseDeleteBooking.current.mutate(booking.id));

      await waitFor(() => expect(resultUseDeleteBooking.current.isSuccess).toBe(true));

      expect(toast.success).toHaveBeenCalledTimes(1);
      expect(toast.success).toHaveBeenCalledWith(
        'Booking deleted', {
        description: 'Your booking was deleted.'
      });
      expect(mockDeleteBooking).toHaveBeenCalledTimes(1);
      expect(mockDeleteBooking).toHaveBeenCalledWith(booking.id);
    });

    it(`GIVEN a useDeleteBooking
        WHEN return error
        THEN should call toast error
        AND call deleteBooking of useStore
        AND call addBooking of useStore`, async () => {
      jest.spyOn(toast, 'error');
      const booking: Booking = {
        id: 'id-1',
        roomId: 'room-id-1',
        totalPrice: 4000,
        checkIn: new Date("2024-01-15T03:00:00.000Z"),
        checkOut: new Date("2024-01-22T03:00:00.000Z"),
        quantityGuests: 2
      }

      axiosMock.onDelete(`/bookings/${booking.id}`).replyOnce(500);

      const { result: resultUseDeleteBooking } = renderHook(() => useDeleteBooking(), {
        wrapper: createWrapper(),
      });

      act(() => resultUseDeleteBooking.current.mutate(booking.id));

      await waitFor(() => expect(resultUseDeleteBooking.current.isError).toBe(true));

      expect(toast.error).toHaveBeenCalledTimes(1);
      expect(toast.error).toHaveBeenCalledWith('Error to edit', {
        description: `Ops, something went wrong...`,
        action: {
          label: "OK",
          onClick: expect.anything(),
        },
      });
      expect(mockDeleteBooking).toHaveBeenCalledTimes(1);
      expect(mockDeleteBooking).toHaveBeenCalledWith(booking.id);
      expect(mockAddBooking).toHaveBeenCalledTimes(1);
      expect(mockAddBooking).toHaveBeenCalledWith({
        ...booking,
        checkIn: "2024-01-15T03:00:00.000Z",
        checkOut: "2024-01-22T03:00:00.000Z"
      });
    });
  });

  describe('useEditBooking', () => {
    it(`GIVEN a useEditBooking
        WHEN return success
        THEN should call toast success
        AND call editBooking of useStore`, async () => {
      jest.spyOn(toast, 'success');
      const booking: Booking = {
        id: 'id-1',
        roomId: 'room-id-1',
        totalPrice: 4000,
        checkIn: new Date("2024-01-15T03:00:00.000Z"),
        checkOut: new Date("2024-01-22T03:00:00.000Z"),
        quantityGuests: 2
      };
      jest.spyOn(queryClient, 'getQueryData').mockReturnValueOnce([booking])

      axiosMock.onPut(`/bookings/${booking.id}`).replyOnce(200);

      const { result: resultUseEditBooking } = renderHook(() => useEditBooking(), {
        wrapper: createWrapper(),
      });

      act(() => resultUseEditBooking.current.mutate(booking));

      await waitFor(() => expect(resultUseEditBooking.current.isSuccess).toBe(true));

      expect(toast.success).toHaveBeenCalledTimes(1);
      expect(toast.success).toHaveBeenCalledWith(
        'Booking edited', {
        description: `Your booking is to January 15th, 2024 - January 22nd, 2024.`
      });
      expect(mockEditBooking).toHaveBeenCalledTimes(1);
      expect(mockEditBooking).toHaveBeenCalledWith(booking);
    });

    it(`GIVEN a useEditBooking
        WHEN return error
        THEN should call toast error
        AND call addBooking of useStore`, async () => {
      jest.spyOn(toast, 'error');
      const booking: Booking = {
        id: 'id-1',
        roomId: 'room-id-1',
        totalPrice: 4000,
        checkIn: new Date("2024-01-15T03:00:00.000Z"),
        checkOut: new Date("2024-01-22T03:00:00.000Z"),
        quantityGuests: 2
      };
      jest.spyOn(queryClient, 'getQueryData').mockReturnValueOnce([{
        ...booking,
        roomId: 'room-id-2'
      }])

      axiosMock.onPut(`/bookings/${booking.id}`).replyOnce(500);

      const { result: resultUseEditBooking } = renderHook(() => useEditBooking(), {
        wrapper: createWrapper(),
      });

      act(() => resultUseEditBooking.current.mutate(booking));

      await waitFor(() => expect(resultUseEditBooking.current.isError).toBe(true));

      expect(toast.error).toHaveBeenCalledTimes(1);
      expect(toast.error).toHaveBeenCalledWith(
        'Error to edit', {
        description: `Ops, something went wrong...`,
        action: {
          label: "OK",
          onClick: expect.anything(),
        }
      });
      expect(mockEditBooking).toHaveBeenCalledTimes(2);
      expect(mockEditBooking).toHaveBeenNthCalledWith(1, booking)
      expect(mockEditBooking).toHaveBeenNthCalledWith(2, { ...booking, roomId: 'room-id-2' })
    });
  });

  describe('usePostBooking', () => {
    it(`GIVEN a usePostBooking
        WHEN return success
        THEN should call toast success
        AND call addBooking of useStore`, async () => {
      jest.spyOn(toast, 'success');
      const booking: Booking = {
        id: 'id-1',
        roomId: 'room-id-1',
        totalPrice: 4000,
        checkIn: new Date("2024-01-15T03:00:00.000Z"),
        checkOut: new Date("2024-01-22T03:00:00.000Z"),
        quantityGuests: 2
      };
      jest.spyOn(queryClient, 'getQueryData').mockReturnValueOnce([booking])

      axiosMock.onPost('/bookings').replyOnce(200, booking);

      const { result: resultUsePostBooking } = renderHook(() => usePostBooking(), {
        wrapper: createWrapper(),
      });

      act(() => resultUsePostBooking.current.mutate(booking));

      await waitFor(() => expect(resultUsePostBooking.current.isSuccess).toBe(true));

      expect(toast.success).toHaveBeenCalledTimes(1);
      expect(toast.success).toHaveBeenCalledWith(
        'Booking created', {
        description: `Your booking is to January 15th, 2024 - January 22nd, 2024.`
      });
      expect(mockAddBooking).toHaveBeenCalledTimes(1);
      expect(mockAddBooking).toHaveBeenCalledWith(booking);
    });

    it(`GIVEN a usePostBooking
        WHEN return error
        THEN should call toast error
        AND call deleteBooking of useStore`, async () => {
      jest.spyOn(toast, 'error');
      const booking: Booking = {
        id: 'id-1',
        roomId: 'room-id-1',
        totalPrice: 4000,
        checkIn: new Date("2024-01-15T03:00:00.000Z"),
        checkOut: new Date("2024-01-22T03:00:00.000Z"),
        quantityGuests: 2
      };
      jest.spyOn(queryClient, 'getQueryData').mockReturnValueOnce([booking])

      axiosMock.onPost('/bookings').replyOnce(500);

      const { result: resultUsePostBooking } = renderHook(() => usePostBooking(), {
        wrapper: createWrapper(),
      });

      act(() => resultUsePostBooking.current.mutate(booking));

      await waitFor(() => {
        expect(resultUsePostBooking.current.isError).toBe(true)
      });

      expect(toast.error).toHaveBeenCalledTimes(1);
      expect(toast.error).toHaveBeenCalledWith(
        'Error to create', {
        description: `Ops, something went wrong...`,
        action: {
          label: "OK",
          onClick: expect.anything(),
        }
      });
      expect(mockAddBooking).toHaveBeenCalledTimes(1);
      expect(mockAddBooking).toHaveBeenCalledWith(booking);
      expect(mockDeleteBooking).toHaveBeenCalledTimes(1);
      expect(mockDeleteBooking).toHaveBeenCalledWith(booking.id);
    });
  });
});