import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, differenceInDays, isAfter, isBefore } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";

const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0)
const MIN_CHECKOUT = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + 1, 0, 0, 0, 0);

const bookingSchema = z
    .object({
        checkIn: z
            .date({
                required_error: 'This field is required'
            })
            .min(TODAY, {
                message: 'Select only days from today.'
            }),
        checkOut: z
            .date({
                required_error: 'This field is required'
            })
            .min(MIN_CHECKOUT),
        quantityGuests: z
            .coerce
            .number({
                required_error: 'This field is required'
            })
            .min(1)
    })
    .superRefine((val, ctx) => {
        const { checkIn, checkOut } = val;
        if (isBefore(checkOut, checkIn)) {
            ctx.addIssue({
                path: ['checkOut'],
                code: z.ZodIssueCode.invalid_date,
                message: "Checkout must be after check in"
            });
            return;
        }

        if (differenceInDays(checkIn, checkOut) === 0) {
            ctx.addIssue({
                path: ['checkOut'],
                code: z.ZodIssueCode.invalid_date,
                message: "The booking must be for at least 1 day"
            });
            return;
        }
    });

export type BookingSchema = z.infer<typeof bookingSchema>;

export const useBookingForm = () => {
    const form = useForm<BookingSchema>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            checkIn: new Date(),
            checkOut: addDays(new Date(), 1),
            quantityGuests: 1
        }
    });

    const onSubmit = (data: BookingSchema) => {
        console.log({ data });
    }

    return { form, onSubmit };
}