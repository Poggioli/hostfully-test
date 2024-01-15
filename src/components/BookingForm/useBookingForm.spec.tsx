import { Room } from "@/service/Room";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useBookingForm } from "./useBookingForm";
import { addDays } from "date-fns";
import { Booking } from "@/service/Booking";

const mockOnClose = jest.fn();
jest.mock("@/components/BookingDrawer", () => ({
  useBookingDrawer: () => ({
    onClose: mockOnClose,
  }),
}));

const mockGetBookingsByIdRoom = jest.fn().mockReturnValue([
  {
    id: "booking-1",
    roomId: "id-room-1",
    totalPrice: 5000,
    checkIn: addDays(new Date(), 30),
    checkOut: addDays(new Date(), 35),
    quantityGuests: 3,
  },
  {
    id: "booking-2",
    roomId: "id-room-1",
    totalPrice: 5000,
    checkIn: addDays(new Date(), 50),
    checkOut: addDays(new Date(), 55),
    quantityGuests: 3,
  },
]);

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

describe("useBookingForm", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })

  describe("VALIDATION", () => {
    it(`GIVEN a empty form
        WHEN call onSubmit
        THEN should set required error to all fields`, async () => {
      expect.assertions(4)
      const room: Room = {
        id: "id-room-1",
        description: "description room 1",
        name: "name room 1",
        photos: [],
        pricePerDay: 500,
        pricePerGuest: 100,
      };
      const { result } = renderHook(() => useBookingForm({ room }));

      const {
        form: {
          handleSubmit,
        },
        onSubmit,
      } = result.current;

      await handleSubmit(onSubmit, (data) => {
        expect(data.checkIn?.message).toBe("This field is required");
        expect(data.checkOut?.message).toBe("This field is required");
        expect(data.quantityGuests?.message).toBe("This field is required");
        expect(data.root?.message).toBeUndefined();
      })();
    });

    describe("CHECK-IN", () => {
      it(`GIVEN a check-in
          WHEN the value is less than today
          THEN should show "Select only dayr from today"`, async () => {
        expect.assertions(1)
        const room: Room = {
          id: "id-room-1",
          description: "description room 1",
          name: "name room 1",
          photos: [],
          pricePerDay: 500,
          pricePerGuest: 100,
        };
        const { result } = renderHook(() => useBookingForm({ room }));

        const {
          form: {
            handleSubmit,
            setValue
          },
          onSubmit,
        } = result.current;

        act(() => setValue('checkIn', addDays(new Date(), -2)))

        await handleSubmit(onSubmit, (data) => {
          expect(data.checkIn?.message).toBe("Select only days from today.");
        })();
      });

      it(`GIVEN a check-in
          WHEN the value is equal to today
          THEN should not show erro in check-in`, async () => {
        expect.assertions(1)
        const room: Room = {
          id: "id-room-1",
          description: "description room 1",
          name: "name room 1",
          photos: [],
          pricePerDay: 500,
          pricePerGuest: 100,
        };
        const { result } = renderHook(() => useBookingForm({ room }));

        const {
          form: {
            handleSubmit,
            setValue
          },
          onSubmit,
        } = result.current;

        act(() => setValue('checkIn', new Date()))

        await handleSubmit(onSubmit, (data) => {
          expect(data.checkIn?.message).toBeUndefined();
        })();
      });
    });

    describe("CHECK-OUT", () => {
      it(`GIVEN a check-out
          WHEN the value is less than tomorrow
          THEN should show "Check-out should start at least tomorrow"`, async () => {
        expect.assertions(1)
        const room: Room = {
          id: "id-room-1",
          description: "description room 1",
          name: "name room 1",
          photos: [],
          pricePerDay: 500,
          pricePerGuest: 100,
        };
        const { result } = renderHook(() => useBookingForm({ room }));

        const {
          form: {
            handleSubmit,
            setValue
          },
          onSubmit,
        } = result.current;

        act(() => setValue('checkOut', new Date()))

        await handleSubmit(onSubmit, (data) => {
          expect(data.checkOut?.message).toBe("Check-out should start at least tomorrow");
        })();
      });

      it(`GIVEN a check-out
          WHEN the value is equal to tomorrow
          THEN should not show erro in check-out`, async () => {
        expect.assertions(1)
        const room: Room = {
          id: "id-room-1",
          description: "description room 1",
          name: "name room 1",
          photos: [],
          pricePerDay: 500,
          pricePerGuest: 100,
        };
        const { result } = renderHook(() => useBookingForm({ room }));

        const {
          form: {
            handleSubmit,
            setValue
          },
          onSubmit,
        } = result.current;

        act(() => setValue('checkOut', addDays(new Date(), 1)))

        await handleSubmit(onSubmit, (data) => {
          expect(data.checkOut?.message).toBeUndefined();
        })();
      });

      it(`GIVEN a check-out
          WHEN the value is less than to check-in value
          THEN should show "Checkout must be after check in"`, async () => {
        expect.assertions(1)
        const room: Room = {
          id: "id-room-1",
          description: "description room 1",
          name: "name room 1",
          photos: [],
          pricePerDay: 500,
          pricePerGuest: 100,
        };
        const { result } = renderHook(() => useBookingForm({ room }));

        const {
          form: {
            handleSubmit,
            setValue
          },
          onSubmit,
        } = result.current;

        act(() => setValue('checkIn', addDays(new Date(), 10)))
        act(() => setValue('checkOut', addDays(new Date(), 1)))
        act(() => setValue('quantityGuests', 2))

        await handleSubmit(onSubmit, (data) => {
          expect(data.checkOut?.message).toBe("Checkout must be after check in");
        })();
      });

      it(`GIVEN a check-out
          WHEN the value is the same value of check-in
          THEN should show "The booking must be for at least 1 day"`, async () => {
        expect.assertions(1)
        const room: Room = {
          id: "id-room-1",
          description: "description room 1",
          name: "name room 1",
          photos: [],
          pricePerDay: 500,
          pricePerGuest: 100,
        };
        const { result } = renderHook(() => useBookingForm({ room }));

        const {
          form: {
            handleSubmit,
            setValue
          },
          onSubmit,
        } = result.current;

        act(() => setValue('checkIn', addDays(new Date(), 10)))
        act(() => setValue('checkOut', addDays(new Date(), 10)))
        act(() => setValue('quantityGuests', 2))

        await handleSubmit(onSubmit, (data) => {
          expect(data.checkOut?.message).toBe("The booking must be for at least 1 day");
        })();
      });
    });

    describe("QUANTITY GUESTS", () => {
      it(`GIVEN a quantityGuests
          WHEN the value is less than 1
          THEN should show "You should provide a value greater than 0"`, async () => {
        expect.assertions(1)
        const room: Room = {
          id: "id-room-1",
          description: "description room 1",
          name: "name room 1",
          photos: [],
          pricePerDay: 500,
          pricePerGuest: 100,
        };
        const { result } = renderHook(() => useBookingForm({ room }));

        const {
          form: {
            handleSubmit,
            setValue
          },
          onSubmit,
        } = result.current;

        act(() => setValue('quantityGuests', 0))

        await handleSubmit(onSubmit, (data) => {
          expect(data.quantityGuests?.message).toBe("Number must be greater than or equal to 1");
        })();
      });

      it(`GIVEN a quantityGuests
          WHEN the value is greater than 0
          THEN should not show erro in quantityGuests`, async () => {
        expect.assertions(1)
        const room: Room = {
          id: "id-room-1",
          description: "description room 1",
          name: "name room 1",
          photos: [],
          pricePerDay: 500,
          pricePerGuest: 100,
        };
        const { result } = renderHook(() => useBookingForm({ room }));

        const {
          form: {
            handleSubmit,
            setValue
          },
          onSubmit,
        } = result.current;

        act(() => setValue('quantityGuests', 1))

        await handleSubmit(onSubmit, (data) => {
          expect(data.quantityGuests?.message).toBeUndefined();
        })();
      });
    })

    describe("overlapping validation", () => {
      it(`GIVEN a booking
          WHEN check-out is equal to some check-in
          THEN should set error to root`, async () => {
        expect.assertions(1)
        const room: Room = {
          id: "id-room-1",
          description: "description room 1",
          name: "name room 1",
          photos: [],
          pricePerDay: 500,
          pricePerGuest: 100,
        };
        const { result } = renderHook(() => useBookingForm({ room }));

        const {
          form,
          onSubmit,
        } = result.current;

        act(() => form.setValue('checkIn', addDays(new Date(), 20)));
        act(() => form.setValue('checkOut', addDays(new Date(), 30)));
        act(() => form.setValue('quantityGuests', 2));

        jest.spyOn(form, 'setError');
        await act(async () => await form.handleSubmit(onSubmit, () => null)());

        await waitFor(() => {
          expect(form.setError).toHaveBeenCalledWith("root", {
            type: "validate",
            message: "There are days that are already busy in your reservation.",
          })
        })
      });

      it(`GIVEN a booking
          WHEN check-in is equal to some check-out
          THEN should set error to root`, async () => {
        expect.assertions(1)
        const room: Room = {
          id: "id-room-1",
          description: "description room 1",
          name: "name room 1",
          photos: [],
          pricePerDay: 500,
          pricePerGuest: 100,
        };
        const { result } = renderHook(() => useBookingForm({ room }));

        const {
          form,
          onSubmit,
        } = result.current;

        act(() => form.setValue('checkIn', addDays(new Date(), 35)));
        act(() => form.setValue('checkOut', addDays(new Date(), 38)));
        act(() => form.setValue('quantityGuests', 2));

        jest.spyOn(form, 'setError');
        await act(async () => await form.handleSubmit(onSubmit, () => null)());

        await waitFor(() => {
          expect(form.setError).toHaveBeenCalledWith("root", {
            type: "validate",
            message: "There are days that are already busy in your reservation.",
          })
        })
      });

      it(`GIVEN a booking
          WHEN this booking is in some booking
          THEN should set error to root`, async () => {
        expect.assertions(1)
        const room: Room = {
          id: "id-room-1",
          description: "description room 1",
          name: "name room 1",
          photos: [],
          pricePerDay: 500,
          pricePerGuest: 100,
        };
        const { result } = renderHook(() => useBookingForm({ room }));

        const {
          form,
          onSubmit,
        } = result.current;

        act(() => form.setValue('checkIn', addDays(new Date(), 33)));
        act(() => form.setValue('checkOut', addDays(new Date(), 38)));
        act(() => form.setValue('quantityGuests', 2));

        jest.spyOn(form, 'setError');
        await act(async () => await form.handleSubmit(onSubmit, () => null)());

        await waitFor(() => {
          expect(form.setError).toHaveBeenCalledWith("root", {
            type: "validate",
            message: "There are days that are already busy in your reservation.",
          })
        })
      });
    })
  });

  describe("SUCCESS", () => {
    it(`GIVEN a valid form
        WHEN is to create a booking
        THEN should call 'createBooking'
        AND 'onClose'`, async () => {
      expect.assertions(2)
      const room: Room = {
        id: "id-room-2",
        description: "description room 1",
        name: "name room 1",
        photos: [],
        pricePerDay: 500,
        pricePerGuest: 100,
      };
      const { result } = renderHook(() => useBookingForm({ room }));

      const {
        form,
        onSubmit,
      } = result.current;

      const checkIn = addDays(new Date(), 1);
      const checkOut = addDays(new Date(), 10);

      checkIn.setHours(0, 0, 0, 0);
      checkOut.setHours(0, 0, 0, 0);

      act(() => form.setValue('checkIn', checkIn));
      act(() => form.setValue('checkOut', checkOut));
      act(() => form.setValue('quantityGuests', 2));

      await act(async () => await form.handleSubmit(onSubmit, () => null)());

      await waitFor(() => {
        expect(mockPostMutate).toHaveBeenCalledWith({
          id: expect.anything(),
          roomId: room.id,
          totalPrice: expect.anything(),
          checkIn,
          checkOut,
          quantityGuests: 2
        })
        expect(mockOnClose).toHaveBeenCalledTimes(1)
      })
    })

    it(`GIVEN a valid form
        WHEN is to edit a booking
        THEN should call 'createBooking'
        AND 'onClose'`, async () => {
      expect.assertions(2)
      const room: Room = {
        id: "id-room-2",
        description: "description room 1",
        name: "name room 1",
        photos: [],
        pricePerDay: 500,
        pricePerGuest: 100,
      };
      const booking: Booking = {
        id: "booking-1",
        roomId: "id-room-1",
        totalPrice: 4500,
        checkIn: addDays(new Date(), 30),
        checkOut: addDays(new Date(), 35),
        quantityGuests: 2,
      };

      const { result } = renderHook(() => useBookingForm({ room, booking }));

      const {
        form,
        onSubmit,
      } = result.current;

      const checkIn = addDays(new Date(), 1);
      const checkOut = addDays(new Date(), 10);

      checkIn.setHours(0, 0, 0, 0);
      checkOut.setHours(0, 0, 0, 0);

      act(() => form.setValue('checkIn', checkIn));
      act(() => form.setValue('checkOut', checkOut));
      act(() => form.setValue('quantityGuests', 2));

      await act(async () => await form.handleSubmit(onSubmit, () => null)());

      await waitFor(() => {
        expect(mockPutMutate).toHaveBeenCalledWith({
          id: expect.anything(),
          roomId: room.id,
          totalPrice: expect.anything(),
          checkIn,
          checkOut,
          quantityGuests: 2
        })
        expect(mockOnClose).toHaveBeenCalledTimes(1)
      })
    })
  });
});
