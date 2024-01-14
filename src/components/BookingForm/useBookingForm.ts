import { useBookingDrawer } from "@/components/BookingDrawer";
import { useStore } from "@/lib/store";
import { Booking, useEditBooking, usePostBooking } from "@/service/Booking";
import { Room } from "@/service/Room";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addDays,
  areIntervalsOverlapping,
  differenceInCalendarDays,
  differenceInDays,
  eachDayOfInterval,
  isBefore,
} from "date-fns";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";

const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);
const MIN_CHECKOUT = addDays(new Date(), 1);

const bookingSchema = z
  .object({
    checkIn: z
      .date({
        required_error: "This field is required",
      })
      .min(TODAY, {
        message: "Select only days from today.",
      }),
    checkOut: z
      .date({
        required_error: "This field is required",
      })
      .min(MIN_CHECKOUT),
    quantityGuests: z
      .number({
        required_error: "This field is required",
        coerce: true,
        invalid_type_error: "This field is required",
      })
      .min(1),
  })
  .superRefine((val, ctx) => {
    const { checkIn, checkOut } = val;
    if (isBefore(checkOut, checkIn)) {
      ctx.addIssue({
        path: ["checkOut"],
        code: z.ZodIssueCode.invalid_date,
        message: "Checkout must be after check in",
      });
      return;
    }

    if (differenceInDays(checkIn, checkOut) === 0) {
      ctx.addIssue({
        path: ["checkOut"],
        code: z.ZodIssueCode.invalid_date,
        message: "The booking must be for at least 1 day",
      });
      return;
    }
  });

export type BookingSchema = z.infer<typeof bookingSchema>;

type UseBookingFormProps = {
  room: Room;
  booking?: BookingSchema & {
    id: string
  }
};

export const useBookingForm = ({ room, booking }: UseBookingFormProps) => {
  const { onClose } = useBookingDrawer();
  const { getBookingsByIdRoom } = useStore();
  const { mutate: createBooking } = usePostBooking();
  const { mutate: editBooking } = useEditBooking();
  const bookings = getBookingsByIdRoom(room.id);

  const form = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      ...(booking && ({
        ...booking,
        checkIn: new Date(booking.checkIn),
        checkOut: new Date(booking.checkOut)
      }))
    }
  });

  const unavailableDates: Date[] = bookings.reduce(
    (prev: Date[], curr: Booking) => {
      const datesInInterval = curr.id !== booking?.id ? eachDayOfInterval({
        start: curr.checkIn,
        end: curr.checkOut,
      }) : [];
      return [...prev, ...datesInInterval];
    },
    []
  );

  const bookingDays: number = useMemo(() => {
    return (
      Math.abs(
        differenceInCalendarDays(form.watch("checkIn"), form.watch("checkOut"))
      ) || 0
    );
  }, [form.watch("checkIn"), form.watch("checkOut")]);

  const totalPriceGuest: number = useMemo(() => {
    return (form.watch("quantityGuests") || 0) * room.pricePerGuest;
  }, [form.watch("quantityGuests"), room.pricePerGuest]);

  const totalPriceDay: number = useMemo(() => {
    return room.pricePerDay * bookingDays;
  }, [room.pricePerDay, bookingDays]);

  const totalPrice: number = useMemo(() => {
    return totalPriceDay + totalPriceGuest;
  }, [totalPriceDay, totalPriceGuest]);

  const onSubmit = (data: BookingSchema) => {
    const isOverlapping = bookings.some((b) =>
      b.id !== booking?.id ? areIntervalsOverlapping(
        { start: data.checkIn, end: data.checkOut },
        { start: b.checkIn, end: b.checkOut },
        { inclusive: true }
      ) : false
    );

    if (isOverlapping) {
      form.setError("root", {
        type: "validate",
        message: "There are days that are already busy in your reservation.",
      });
      return;
    }

    if (booking) {
      editBooking({
        id: booking.id,
        roomId: room.id,
        totalPrice: totalPrice,
        ...data,
      });
      onClose();
      return;
    }

    createBooking({
      id: uuidv4(),
      roomId: room.id,
      totalPrice: totalPrice,
      ...data,
    });

    onClose();
  };

  return {
    form,
    onSubmit,
    totalPriceGuest,
    totalPriceDay,
    bookingDays,
    totalPrice,
    unavailableDates,
  };
};
