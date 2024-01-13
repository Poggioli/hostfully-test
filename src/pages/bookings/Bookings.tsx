import { BookingCard } from "@/components/BookingCard";
import { useStore } from "@/lib/store";
import { FC } from "react";

const Bookings: FC = () => {

  const { bookings } = useStore()

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
      {bookings.map((booking) => <BookingCard {...booking} />)}
    </div>
  )
}

export { Bookings };
