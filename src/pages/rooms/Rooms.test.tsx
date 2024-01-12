/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { describe, expect, it, vi } from "vitest";
import { Rooms } from "./Rooms";
import { fireEvent, render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";

vi.mock('axios');
const queryClient = new QueryClient()

describe('Rooms', () => {
  it(`GIVEN a Rooms page
      WHEN useGetRooms return error
      THEN should show error msg`, () => {
    vi.spyOn(axios, 'get').mockRejectedValueOnce(new Error('Async error'));
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Rooms />
      </QueryClientProvider>
    );

    const errorTitle = getByText('Ops, something went wrong...');
    const errorButton = getByText('Try again');

    expect(errorTitle).toBeDefined();
    expect(errorButton).toBeDefined();
  });

  it(`GIVEN a Rooms page
      AND useGetRooms return error
      WHEN user retry
      AND useGetRooms return success
      THEN should show the cards`, () => {
    vi.spyOn(axios, 'get').mockRejectedValueOnce(new Error('Async error'));
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Rooms />
      </QueryClientProvider>
    );

    const errorTitle = getByText('Ops, something went wrong...');
    const errorButton = getByText('Try again');

    expect(errorTitle).toBeDefined();
    expect(errorButton).toBeDefined();

    vi.spyOn(axios, 'get').mockResolvedValueOnce({
      data: [
        {
          id: "82c67959-a414-4470-b26b-ba4261cfe867",
          name: "Room name 1",
          description: "Room description 1",
          pricePerDay: 100,
          photos: [""]
        },
        {
          id: "82c67959-a414-4470-b26b-ba4261cfe867",
          name: "Room name 2",
          description: "Room description 2",
          pricePerDay: 200,
          photos: [""]
        }
      ]
    });

    fireEvent.click(errorButton);

    const roomName1 = getByText('Room name 1');
    const roomName2 = getByText('Room name 2');

    expect(roomName1).toBeDefined();
    expect(roomName2).toBeDefined();

  })

  it.only(`GIVEN a Rooms page
      WHEN useGetRooms return success
      THEN should show the cards`, () => {
    vi.spyOn(axios, 'get').mockResolvedValueOnce({
      data: [
        {
          id: "82c67959-a414-4470-b26b-ba4261cfe867",
          name: "Room name 1",
          description: "Room description 1",
          pricePerDay: 100,
          photos: [""]
        },
        {
          id: "82c67959-a414-4470-b26b-ba4261cfe867",
          name: "Room name 2",
          description: "Room description 2",
          pricePerDay: 200,
          photos: [""]
        }
      ]
    });
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Rooms />
      </QueryClientProvider>
    );

    const roomName1 = getByText('Room name 1');
    const roomName2 = getByText('Room name 2');

    expect(roomName1).toBeDefined();
    expect(roomName2).toBeDefined();
  })
})