/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, waitFor } from "@testing-library/react";
import MockAdapter from 'axios-mock-adapter';
import { ReactNode } from "react";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import axiosClient from "../api";
import { useGetRooms } from "./room.service";
import { Room } from "./room.types";

const queryCache = new QueryCache();

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

const mockSetRooms = jest.fn();
jest.mock("@/lib/store", () => {
  return {
    useStore: () => ({
      setRooms: mockSetRooms
    })
  };
})

describe("Room service", () => {
  const axiosMock = new MockAdapter(axiosClient);

  afterEach(() => {
    queryCache.clear()
  });

  it(`GIVEN a useGetRooms
      WHEN return success
      THEN should call setRooms of useStore`, async () => {
    const rooms: Room[] = [
      {
        id: "id-1",
        name: "name-1",
        description: "description-1",
        pricePerDay: 400,
        pricePerGuest: 50,
        photos: [],
      },
    ];

    axiosMock.onGet('/rooms').replyOnce(200, rooms);

    const { result: resultUseGetRooms } = renderHook(() => useGetRooms(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(resultUseGetRooms.current.isSuccess).toBe(true));

    expect(mockSetRooms).toHaveBeenCalledTimes(1);
    expect(mockSetRooms).toHaveBeenCalledWith(rooms);
  });
});
