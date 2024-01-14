import { Booking } from "@/service/Booking";
import { FC } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { DeleteBookingModal } from "../DeleteBookingModal";
import { AspectRatio } from "../ui/aspect-ratio";

type BookingCardProps = Booking;

const BookingCard: FC<BookingCardProps> = ({
  checkIn,
  checkOut,
  roomName,
  totalPrice,
  id,
  quantityGuests,
  photos
}) => {

  const bookingPeriod = `${format(checkIn, "PPP")} - ${format(checkOut, "PPP")}`

  return (
    <Card className="w-full">
      {photos?.length ? (
        <AspectRatio ratio={16 / 9} className="overflow-hidden mb-4 rounded-t-md">
          <img className="rounded-md object-cover w-full h-full" src={photos[0]} alt={`Photo of ${roomName}`} />
        </AspectRatio>
      ) : null}
      <CardHeader className={`flex flex-col pb-3 ${photos?.length ? 'pt-0' : ''}`}>
        <CardTitle>{roomName}</CardTitle>
        <CardDescription className="">{bookingPeriod}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-1 pb-4">
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