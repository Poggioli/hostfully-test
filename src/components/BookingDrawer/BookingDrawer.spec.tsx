import { act, fireEvent, render } from "@testing-library/react";
import { BookingDrawer } from "./BookingDrawer";

const mockOnOpen = jest.fn();
const mockOnClose = jest.fn();
const mockRoom = jest.fn();
const mockOpenBookingModal = jest.fn();
const mockBooking = jest.fn();
jest.mock("./useBookingDrawer", () => ({
  useBookingDrawer: () => ({
    onOpen: mockOnOpen,
    onClose: mockOnClose,
    room: (() => mockRoom())(),
    openBookingModal: (() => mockOpenBookingModal())(),
    booking: (() => mockBooking())()
  })
}));
let mockSearchParam = '';
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => {

    let params = new URLSearchParams(mockSearchParam)

    const setParams = (value: URLSearchParams) => {
      params = value
      mockSearchParam = value.toString();
    }

    return [
      params,
      setParams
    ];
  }
}));

const mockPostMutate = jest.fn();
const mockPutMutate = jest.fn();
jest.mock("@/service/Booking", () => ({
  usePostBooking: () => ({ mutate: mockPostMutate }),
  useEditBooking: () => ({ mutate: mockPutMutate }),
}));

describe('BookingDrawer', () => {
  it(`GIVEN a Drawer open
      WHEN room is undefined
      THEN should show error drawer`, () => {
    mockRoom.mockReturnValue(undefined);
    mockOpenBookingModal.mockReturnValue(true);
    const { baseElement } = render(<BookingDrawer />);

    expect(baseElement).toMatchSnapshot();
  });

  it(`GIVEN a Drawer open
      AND is error drawer
      WHEN user click in 'Close' button
      THEN should call onClose from useBookingDrawer`, () => {
    mockRoom.mockReturnValue(undefined);
    mockOpenBookingModal.mockReturnValue(true);
    const { getByText } = render(<BookingDrawer />);

    const cancelButton = getByText('Close');
    act(() => fireEvent.click(cancelButton));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it(`GIVEN a Drawer open
      WHEN room is valid
      THEN should show the room infos`, () => {
    mockRoom.mockReturnValue({
      id: "id-room-1",
      description: "description room 1",
      name: "name room 1",
      photos: [],
      pricePerDay: 500,
      pricePerGuest: 100,
    });
    mockOpenBookingModal.mockReturnValue(true);
    const { baseElement } = render(<BookingDrawer />);

    expect(baseElement).toMatchSnapshot();

  })
})