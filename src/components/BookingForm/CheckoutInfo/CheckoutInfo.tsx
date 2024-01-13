import { Separator } from "@/components/ui/separator";
import { FC } from "react";

type CheckoutInfoProps = {
    pricePerDay: number,
    bookingDays: number,
    totalPriceDay: number,
    pricePerGuest: number,
    quantityGuests: number,
    totalPriceGuest: number,
    totalPrice: number,
}

const CheckoutInfo: FC<CheckoutInfoProps> = ({
    pricePerDay,
    bookingDays,
    totalPriceDay,
    pricePerGuest,
    quantityGuests,
    totalPriceGuest,
    totalPrice
}) => {

    return (
        <div className="flex flex-col gap-4 mt-4">
            <h4 className="text-xl font-semibold tracking-tight">Booking informations</h4>
            <div className="flex gap-6 justify-between">
                <span className="underline">${pricePerDay} x {bookingDays} nights</span>
                <span>${totalPriceDay}</span>
            </div>
            <div className="flex gap-6 justify-between">
                <span className="underline">${pricePerGuest} x {quantityGuests} guests</span>
                <span>${totalPriceGuest}</span>
            </div>
            <Separator className="max-w-[200px] mx-auto" />
            <div className="flex gap-6 justify-between">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-bold">${totalPrice}</span>
            </div>
        </div>
    );
}

export { CheckoutInfo };
