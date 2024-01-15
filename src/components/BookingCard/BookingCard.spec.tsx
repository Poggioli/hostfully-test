import { act, fireEvent, render } from "@testing-library/react";
import { BookingCard } from "./BookingCard";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode } from "react";

const mockOnEdit = jest.fn();
jest.mock("@/components/BookingDrawer", () => ({
  useBookingDrawer: () => ({
    onEdit: mockOnEdit,
  })
}));
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

describe('BookingCard', () => {

  it(`GIVEN a BookingCard
      WHEN render
      THEN should render all props the right way`, () => {

    const { baseElement } = render(
      <BookingCard
        checkIn={new Date(2024, 0, 20)}
        checkOut={new Date(2024, 0, 24)}
        roomName="room name 1"
        roomId="room-id-1"
        totalPrice={5250}
        id="booking-id-1"
        quantityGuests={5}
        photos={[]}
      />, {
      wrapper: createWrapper()
    });

    expect(baseElement).toMatchSnapshot();
  });

  it(`GIVEN a BookingCard
      WHEN render
      THEN should render all props the right way`, () => {

    const { baseElement } = render(
      <BookingCard
        checkIn={new Date(2024, 0, 20)}
        checkOut={new Date(2024, 0, 24)}
        roomName="room name 1"
        roomId="room-id-1"
        totalPrice={5250}
        id="booking-id-1"
        quantityGuests={5}
        photos={['']}
      />, {
      wrapper: createWrapper()
    });

    expect(baseElement).toMatchSnapshot();
  });

  it(`GIVEN a BookingCard
      WHEN click to in button "Edit"
      THEN should call onEdit function from useBookingDrawer`, () => {

    const { getByRole } = render(
      <BookingCard
        checkIn={new Date(2024, 0, 20)}
        checkOut={new Date(2024, 0, 24)}
        roomName="room name 1"
        roomId="room-id-1"
        totalPrice={5250}
        id="booking-id-1"
        quantityGuests={5}
        photos={[]}
      />, {
      wrapper: createWrapper()
    }
    );

    const editButton = getByRole('button', {
      name: 'Edit'
    });

    act(() => fireEvent.click(editButton));

    expect(mockOnEdit).toHaveBeenCalledTimes(1);
    expect(mockOnEdit).toHaveBeenCalledWith("booking-id-1");
  });

});