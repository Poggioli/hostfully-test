import { Room } from "@/service/Room"
import { FC } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"

export type RoomCardProps = Room

const RoomCard: FC<RoomCardProps> = ({ name, description, pricePerDay, photos }) => {

  return (
    <Card className="w-full">
      <AspectRatio ratio={16 / 9} className="rounded overflow-hidden">
        <img
          src={photos[0]}
          alt={`Photo of ${name}`}
          className="rounded object-cover"
        />
      </AspectRatio>
      <CardHeader className="flex flex-col gap-4 pb-3">
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
        <Button>Schedule</Button>
      </CardFooter>
    </Card>
  )
}

export { RoomCard }
