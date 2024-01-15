import { useBookingDrawer } from "@/components/BookingDrawer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Room } from "@/service/Room"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { FC } from "react"

export type RoomCardProps = Room

const RoomCard: FC<RoomCardProps> = ({ name, description, pricePerDay, photos, id }) => {

  const { onOpen } = useBookingDrawer()

  const onReserve = () => {
    onOpen(id)
  }

  return (
    <Card className="w-full">
      <AspectRatio ratio={16 / 9} className="rounded-t-md overflow-hidden">
        <img
          loading="lazy"
          src={photos[0]}
          alt={`Photo of ${name}`}
          className="rounded-t-md object-cover w-full h-full"
        />
      </AspectRatio>
      <CardHeader className="flex flex-col pb-3">
        <CardTitle>{name}</CardTitle>
        <CardDescription className="line-clamp-3">{description}</CardDescription>
      </CardHeader>

      <CardContent className="flex justify-end pb-4">
        <span>
          <span className="text-sm font-bold">
            ${pricePerDay}
          </span>
          {" "}night
        </span>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button onClick={onReserve}>Reserve</Button>
      </CardFooter>
    </Card>
  )
}

export { RoomCard }
