import { Booking } from "@/service/Booking";
import { FC } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { DeleteBookingModal } from "../DeleteBookingModal";

type BookingCardProps = Booking;

const BookingCard: FC<BookingCardProps> = ({
  checkIn,
  checkOut,
  roomName,
  totalPrice,
  id,
  quantityGuests
}) => {

  const bookingPeriod = `${format(checkIn, "PPP")} - ${format(checkOut, "PPP")}`

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col">
        <CardTitle>{roomName}</CardTitle>
        <CardDescription className="">{bookingPeriod}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-1">
        <div className="flex gap-6 justify-between">
          <span className="underline">Total</span>
          <span>${totalPrice}</span>
        </div>
        <div className="flex gap-6 justify-between">
          <span className="underline">Guests</span>
          <span>{quantityGuests}</span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end">
        <DeleteBookingModal id={id} />
      </CardFooter>
    </Card>
  )
}

export { BookingCard };