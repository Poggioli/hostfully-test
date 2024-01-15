import { useBookingDrawer } from "@/components/BookingDrawer";
import { DeleteBookingModal } from "@/components/DeleteBookingModal";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Booking } from "@/service/Booking";
import { differenceInCalendarDays, format } from "date-fns";
import { Edit } from "lucide-react";
import { FC } from "react";

type BookingCardProps = Booking;

const BookingCard: FC<BookingCardProps> = ({
  checkIn,
  checkOut,
  roomName,
  totalPrice,
  id,
  quantityGuests,
  photos,
}) => {

  const { onEdit } = useBookingDrawer()

  const bookingPeriod = `${format(checkIn, "PP")} - ${format(checkOut, "PP")}`
  const periodInDays = `${Math.abs(differenceInCalendarDays(checkIn, checkOut))} days`

  const handleEdit = () => {
    onEdit(id);
  }

  return (
    <Card className="w-full">
      {photos?.length ? (
        <AspectRatio ratio={16 / 9} className="overflow-hidden mb-4 rounded-t-md">
          <img className="rounded-t-md object-cover w-full h-full" src={photos[0]} loading="lazy" alt={`Photo of ${roomName}`} />
        </AspectRatio>
      ) : null}
      <CardHeader className={`flex flex-col pb-3 ${photos?.length ? 'pt-0' : ''}`}>
        <CardTitle>{roomName}</CardTitle>
        <CardDescription className="flex flex-row justify-between gap-x-6 flex-wrap">
          <span>
            {bookingPeriod}
          </span>
          <span>
            {periodInDays}
          </span>
        </CardDescription>
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

      <CardFooter className="flex justify-between gap-4 flex-wrap">
        <DeleteBookingModal id={id} />
        <Button variant="secondary" onClick={handleEdit}>
          <Edit className="mr-2 h-4 w-4" /> Edit
        </Button>
      </CardFooter>
    </Card>
  )
}

export { BookingCard };
