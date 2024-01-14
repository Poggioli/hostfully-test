import { Button } from "@/components/ui/button";
import { Form, FormMessage } from "@/components/ui/form";
import { Room } from "@/service/Room";
import { FC } from "react";
import { useBookingDrawer } from "@/components/BookingDrawer";
import { CheckoutInfo } from "./CheckoutInfo";
import { FormFieldCheckin, FormFieldCheckout, FormFieldQuantityGuests } from "./FormFields";
import { useBookingForm } from "./useBookingForm";
import { Booking } from "@/service/Booking";

type BookingFormProps = {
    room: Room;
    booking?: Booking
}

const BookingForm: FC<BookingFormProps> = ({ room, booking }) => {
    const {
        form,
        onSubmit,
        totalPriceGuest,
        totalPriceDay,
        bookingDays,
        totalPrice,
        unavailableDates
    } = useBookingForm({ room, booking });
    const { onClose } = useBookingDrawer();

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <FormFieldCheckin unavailableDates={unavailableDates} />
                    <FormFieldCheckout unavailableDates={unavailableDates} />
                    <FormFieldQuantityGuests />
                    {form.formState.errors.root ? (
                        <FormMessage>{form.formState.errors.root.message}</FormMessage>
                    ) : null}
                    <CheckoutInfo
                        pricePerDay={room.pricePerDay}
                        pricePerGuest={room.pricePerGuest}
                        bookingDays={bookingDays}
                        quantityGuests={form.getValues('quantityGuests') || 0}
                        totalPrice={totalPrice}
                        totalPriceDay={totalPriceDay}
                        totalPriceGuest={totalPriceGuest}
                    />
                    <Button type="submit">{booking ? 'Save' : 'Book'}</Button>
                </form>
            </Form>
            <Button className="mt-4 w-full" onClick={onClose} variant="outline">Cancel</Button>
        </>
    )
};

export { BookingForm };
