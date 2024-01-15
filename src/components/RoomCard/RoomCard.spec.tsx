import { act, fireEvent, render } from "@testing-library/react";
import { RoomCard } from "./RoomCard";

const mockOnOpen = jest.fn();
jest.mock("@/components/BookingDrawer", () => ({
  useBookingDrawer: () => ({
    onOpen: mockOnOpen,
  })
}));

describe('RoomCard', () => {
  it(`GIVEN a RoomCard
      WHEN render
      THEN should render all props the right way`, () => {
    const { baseElement } = render(
      <RoomCard
        name="room name 1"
        description="room description 1"
        pricePerDay={350}
        photos={['']}
        id="room-id-1"
        pricePerGuest={50}
      />);
    expect(baseElement).toMatchSnapshot();
  });

  it(`GIVEN a RoomCard
      WHEN click to in button "Reserve"
      THEN should call onOpen function from useBookingDrawer`, () => {

    const { getByRole } = render(
      <RoomCard
        name="room name 1"
        description="room description 1"
        pricePerDay={350}
        photos={['']}
        id="room-id-1"
        pricePerGuest={50}
      />);

    const reserveButton = getByRole('button', {
      name: 'Reserve'
    });

    act(() => fireEvent.click(reserveButton));

    expect(mockOnOpen).toHaveBeenCalledTimes(1);
    expect(mockOnOpen).toHaveBeenCalledWith("room-id-1");
  });
})