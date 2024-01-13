import { differenceInCalendarDays, differenceInDays } from "date-fns";
import { FC, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { BookingSchema } from "../useBookingForm";

type CheckoutInfoProps = {
    pricePerDay: number;
    pricePerGuest: number;
}

const CheckoutInfo: FC<CheckoutInfoProps> = ({ pricePerDay, pricePerGuest }) => {

    const { watch } = useFormContext<BookingSchema>();

    const bookingDays: number = useMemo(() => {
        return Math.abs(differenceInCalendarDays(watch('checkIn'), watch('checkOut')));
    }, [watch('checkIn'), watch('checkOut')])

    return (
        <div className="flex flex-col gap-4 mt-4">
            <h4 className="text-xl font-semibold tracking-tight">Booking informations</h4>
            <div className="flex gap-6 justify-between">
                <span className="underline">${pricePerDay} x {bookingDays} nights</span>
                <span>${pricePerDay * bookingDays}</span>
            </div>
            <div className="flex gap-6 justify-between">
                <span className="underline">${pricePerGuest} x {watch('quantityGuests') || 0} guests</span>
                <span>${pricePerGuest * watch('quantityGuests')}</span>
            </div>
        </div>
    );
}

export { CheckoutInfo }