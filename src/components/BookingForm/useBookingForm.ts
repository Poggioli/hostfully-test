import { useStore } from "@/lib/store";
import { Booking, usePostBooking } from "@/service/Booking";
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
import * as z from "zod";
import { v4 as uuidv4 } from "uuid";

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
        invalid_type_error: "This field is required"
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
};

export const useBookingForm = (options: UseBookingFormProps) => {
  const { getBookingsByIdRoom } = useStore();
  const { mutate } = usePostBooking();
  const bookings = getBookingsByIdRoom(options.room.id);

  const form = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
  });

  const unavailableDates: Date[] = bookings.reduce((prev: Date[], curr: Booking) => {
    const datesInInterval = eachDayOfInterval({
      start: curr.checkIn,
      end: curr.checkOut
    });
    return [...prev, ...datesInInterval]
  }, []);

  const bookingDays: number = useMemo(() => {
    return Math.abs(
      differenceInCalendarDays(form.watch("checkIn"), form.watch("checkOut"))
    ) || 0;
  }, [form.watch("checkIn"), form.watch("checkOut")]);

  const totalPriceGuest: number = useMemo(() => {
    return (form.watch("quantityGuests") || 0) * options.room.pricePerGuest;
  }, [form.watch("quantityGuests"), options.room.pricePerGuest]);

  const totalPriceDay: number = useMemo(() => {
    return options.room.pricePerDay * bookingDays;
  }, [options.room.pricePerDay, bookingDays]);

  const totalPrice: number = useMemo(() => {
    return totalPriceDay + totalPriceGuest;
  }, [totalPriceDay, totalPriceGuest]);

  const onSubmit = (data: BookingSchema) => {
    const isOverlapping = bookings.some((room) =>
      areIntervalsOverlapping(
        { start: data.checkIn, end: data.checkOut },
        { start: room.checkIn, end: room.checkOut },
        { inclusive: true }
      )
    );

    if (isOverlapping) {
      form.setError("root", {
        type: "validate",
        message: "There are days that are already busy in your reservation.",
      });
      return;
    }

    mutate({
      id: uuidv4(),
      roomId: options.room.id,
      totalPrice: totalPrice,
      ...data,
    });
  };

  return {
    form,
    onSubmit,
    totalPriceGuest,
    totalPriceDay,
    bookingDays,
    totalPrice,
    unavailableDates
  };
};
