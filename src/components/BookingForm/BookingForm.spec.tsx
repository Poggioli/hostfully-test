import { Booking } from "@/service/Booking";
import { Room } from "@/service/Room";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { BookingForm } from "./BookingForm";

const mockOnClose = jest.fn();
jest.mock("@/components/BookingDrawer", () => ({
  useBookingDrawer: () => ({
    onClose: mockOnClose,
  }),
}));

const room: Room = {
  id: 'id-room-1',
  description: 'description room 1',
  name: 'name room 1',
  photos: [],
  pricePerDay: 400,
  pricePerGuest: 50
}

const booking: Booking = {
  id: "booking-1",
  roomId: room.id,
  totalPrice: 5000,
  checkIn: new Date(2025, 8, 20),
  checkOut: new Date(2025, 8, 25),
  quantityGuests: 3,
  photos: room.photos,
  roomName: room.name
}

const bookingToOverlap: Booking = { ...booking, id: "booking-2" }

const mockGetBookingsByIdRoom = jest.fn().mockReturnValue([booking]);

jest.mock("@/lib/store", () => {
  return {
    useStore: () => ({
      getBookingsByIdRoom: mockGetBookingsByIdRoom
    }),
  };
});

const mockPostMutate = jest.fn();
const mockPutMutate = jest.fn();
jest.mock("@/service/Booking", () => ({
  usePostBooking: () => ({ mutate: mockPostMutate }),
  useEditBooking: () => ({ mutate: mockPutMutate }),
}));

describe('BookingForm', () => {
  it(`GIVEN a open BookingForm
      WHEN user click in "Cancel"
      THEN should call onClose of useBookingDrawer`, () => {
    const { getByText } = render(<BookingForm room={room} booking={booking} />);
    const cancelButton = getByText('Cancel')

    act(() => fireEvent.click(cancelButton));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it(`GIVEN a BookingForm
        WHEN it's edit
        THEN should bring all fields filled`, () => {
    const { baseElement } = render(<BookingForm room={room} booking={booking} />);
    expect(baseElement).toMatchSnapshot();
  });

  it(`GIVEN a BookingForm
      WHEN it's create
      THEN should NOT bring fields filled`, () => {
    const { baseElement } = render(<BookingForm room={room} />);
    expect(baseElement).toMatchSnapshot();
  });

  describe('ERROR', () => {
    it(`GIVEN a form submitted
        WHEN its overlapping
        THEN should show overlap msg`, async () => {
      mockGetBookingsByIdRoom.mockReturnValue([booking, bookingToOverlap]);
      const { getByRole, getByText } = render(<BookingForm room={room} booking={bookingToOverlap} />);
      const submitButton = getByRole('button', {
        name: 'Save'
      });

      act(() => fireEvent.click(submitButton));

      await waitFor(() => {
        const errorRootMessage = getByText("There are days that are already busy in your reservation.");
        expect(errorRootMessage).toBeDefined()
      })

    });
  });
});