import { BookingCard } from "@/components/BookingCard";
import { useStore } from "@/lib/store";
import { FC } from "react";

const Bookings: FC = () => {

  const { bookings } = useStore()

  return !bookings.length ? (
    <div className="w-full flex justify-center items-center">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        You don't have bookings yet
      </h3>
    </div>
  ) : (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
      {bookings.map((booking) => <BookingCard key={booking.id} {...booking} />)}
    </div>
  );
}

export { Bookings };
