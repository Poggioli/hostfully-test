/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { MockedFunction, describe, expect, it, beforeEach, vi, afterAll } from "vitest";
import { Rooms } from "./Rooms";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { queryClientMock } from '../../../setupTest';

describe('Rooms', () => {

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <QueryClientProvider client={queryClientMock}>
          <Rooms />
        </QueryClientProvider>
      </BrowserRouter>
    )
  };

  const roomsMock = [
    {
      id: "82c67959-a414-4470-b26b-ba4261cfe866",
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
  ];

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  })

  it(`GIVEN a Rooms page
      WHEN useGetRooms return error
      THEN should show error message`, async () => {
    (axios.get as MockedFunction<typeof axios.get>)
      .mockRejectedValue('Async error')

    const { getByText } = renderComponent();

    await waitFor(() => {
      const errorTitle = getByText('Ops, something went wrong...');
      const errorButton = getByText('Try again');

      expect(errorTitle).toBeDefined();
      expect(errorButton).toBeDefined();
    })
  });

  it(`GIVEN a Rooms page
      AND useGetRooms return error
      WHEN user retry
      AND useGetRooms return success
      THEN should show the cards`, async () => {
    (axios.get as MockedFunction<typeof axios.get>)
      .mockRejectedValueOnce('Async error')
      .mockResolvedValueOnce({
        data: roomsMock,
      });
    const { getByText } = renderComponent();

    await waitFor(() => {
      const errorTitle = getByText('Ops, something went wrong...');
      const errorButton = getByText('Try again');

      expect(errorTitle).toBeDefined();
      expect(errorButton).toBeDefined();
    });


    const errorButton = getByText('Try again');
    fireEvent.click(errorButton);

    await waitFor(() => {
      const roomName1 = getByText('Room name 1');
      const roomName2 = getByText('Room name 2');

      expect(roomName1).toBeDefined();
      expect(roomName2).toBeDefined();
    });
  })

  it(`GIVEN a Rooms page
      WHEN useGetRooms return success
      THEN should show the cards`, async () => {
    (axios.get as MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: roomsMock,
    });
    const { getByText } = renderComponent();

    await waitFor(() => {
      const roomName1 = getByText('Room name 1');
      const roomName2 = getByText('Room name 2');

      expect(roomName1).toBeDefined();
      expect(roomName2).toBeDefined();
    })
  })
})