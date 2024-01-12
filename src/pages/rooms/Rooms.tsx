import { LoadingRoomCard } from "@/components/RoomCard";
import { RoomCard } from "@/components/RoomCard/RoomCard";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { useGetRooms } from "@/service/Room";
import { RefreshCcw } from "lucide-react";
import { FC } from "react";

type RoomsErrorProps = {
  refetch: () => unknown
}
const RoomsError: FC<RoomsErrorProps> = ({ refetch }) => {
  return (
    <div className="flex flex-col gap-4">
      <h1>Ops, something went wrong...</h1>
      <Button onClick={refetch}>
        <RefreshCcw className="mr-2 h-4 w-4" /> Try again
      </Button>
    </div>
  )
}

const Rooms: FC = () => {

  const { rooms } = useStore()
  const { isLoading, isError, refetch } = useGetRooms();

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
      {!isLoading && !isError && rooms.length ? (
        <>
          {rooms.map((room) => <RoomCard key={room.id} {...room} />)}
        </>
      ) : null}
      {isLoading ? (
        <>
          {Array(15).fill(0).map((_, index) => <LoadingRoomCard key={index} />)}
        </>
      ) : null}
      {isError ? (
        <RoomsError refetch={() => refetch()} />
      ) : null}
    </div>)
}

export { Rooms };
