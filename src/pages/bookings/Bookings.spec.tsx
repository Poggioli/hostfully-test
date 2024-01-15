import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { Bookings } from "./Bookings";

const mockBookings = jest.fn().mockImplementation(() => [
  {
    id: 'booking-id-1',
    roomId: 'room-id-1',
    totalPrice: 5000,
    checkIn: new Date(2024, 8, 24),
    checkOut: new Date(2024, 8, 28),
    quantityGuests: 4,
  }
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false
    }
  },
});

const createWrapper = () => {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

jest.mock("@/lib/store", () => {
  return {
    useStore: () => ({
      rooms: [],
      bookings: (() => mockBookings())(),
    }),
  };
});

describe("Bookings", () => {
  it(`GIVEN a Bookings component
      WHEN the endpoint return success
      AND the data is empty
      THEN should render the empty message`, () => {
    mockBookings.mockReturnValueOnce([]);
    const { baseElement } = render(
      <BrowserRouter>
        <Bookings />
      </BrowserRouter>, {
      wrapper: createWrapper()
    });
    expect(baseElement).toMatchSnapshot();
  });

  it(`GIVEN a Bookings component
      WHEN the endpoint return success
      THEN should render the bookings card`, () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Bookings />
      </BrowserRouter>, {
      wrapper: createWrapper()
    });
    expect(baseElement).toMatchSnapshot();
  })
});