import { act, fireEvent, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Rooms } from "./Rooms";

const mockRooms = jest.fn().mockImplementation(() => [
  {
    id: 'id-room-1',
    name: 'name rom 1',
    description: 'description room 1',
    pricePerDay: 500,
    pricePerGuest: 100,
    photos: ['', ''],
  }
])

jest.mock("@/lib/store", () => {
  return {
    useStore: () => ({
      bookings: [],
      rooms: (() => mockRooms())()
    }),
  };
});

const mockIsLoading = jest.fn().mockReturnValue(false);
const mockIsError = jest.fn().mockReturnValue(false);
const mockRefetch = jest.fn();
jest.mock("@/service/Room", () => ({
  useGetRooms: () => ({
    isLoading: (() => mockIsLoading())(),
    isError: (() => mockIsError())(),
    refetch: mockRefetch
  }),
}));

describe("Rooms", () => {
  it(`GIVEN a Rooms component
      WHEN the useGetRooms return success
      AND the data has any value
      THEN should render the rooms card`, () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Rooms />
      </BrowserRouter>
    );
    expect(baseElement).toMatchSnapshot();
  })

  it(`GIVEN a Rooms component
      WHEN the useGetRooms return success
      AND the data is empty
      THEN should render the empty message`, () => {
    mockRooms.mockReturnValueOnce([]);
    const { baseElement } = render(
      <BrowserRouter>
        <Rooms />
      </BrowserRouter>
    );
    expect(baseElement).toMatchSnapshot();
  })

  it(`GIVEN a Rooms component
      WHEN the useGetRooms is loading
      THEN should render the loading card`, () => {
    mockIsLoading.mockReturnValueOnce(true);
    const { baseElement } = render(
      <BrowserRouter>
        <Rooms />
      </BrowserRouter>
    );
    expect(baseElement).toMatchSnapshot();
  })

  it(`GIVEN a Rooms component
      WHEN the useGetRooms return error
      THEN should render the error message`, () => {
    mockIsError.mockReturnValueOnce(true);
    const { baseElement } = render(
      <BrowserRouter>
        <Rooms />
      </BrowserRouter>
    );
    expect(baseElement).toMatchSnapshot();
  })

  it(`GIVEN useGetRooms with error
      WHEN user click in "Try again" button
      THEN should refetch`, () => {
    mockIsError.mockReturnValueOnce(true);
    const { getByRole } = render(
      <BrowserRouter>
        <Rooms />
      </BrowserRouter>
    );
    const tryAgainButton = getByRole('button', {
      name: 'Try again'
    });

    act(() => fireEvent.click(tryAgainButton));

    expect(mockRefetch).toHaveBeenCalledTimes(1);
  })
})