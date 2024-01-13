import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FC } from "react";
import { FormFieldCheckin, FormFieldCheckout, FormFieldQuantityGuests } from "./FormFields";
import { useBookingForm } from "./useBookingForm";
import { CheckoutInfo } from "./CheckoutInfo";
import { Room } from "@/service/Room";

type BookingFormProps = {
    room: Room;
}

const BookingForm: FC<BookingFormProps> = ({ room }) => {
    const {
        form,
        onSubmit
    } = useBookingForm();

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormFieldCheckin />
                <FormFieldCheckout />
                <FormFieldQuantityGuests />
                <CheckoutInfo pricePerDay={room.pricePerDay} pricePerGuest={room.pricePerGuest} />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
};

export { BookingForm };
