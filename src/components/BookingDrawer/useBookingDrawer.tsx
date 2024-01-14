import { useStore } from "@/lib/store";
import { Booking } from "@/service/Booking";
import { Room } from "@/service/Room";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useBookingDrawer = () => {
  const { rooms, bookings } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const keyOpenModal = 'openBookingModal' as const
  const keyOpenEditModal = 'openBookingEditModal' as const

  const onClose = (): void => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete(keyOpenModal);
    newSearchParams.delete(keyOpenEditModal);
    setSearchParams(newSearchParams);
  }

  const onOpen = (id: string): void => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set(keyOpenModal, id)
    setSearchParams(newSearchParams);
  }

  const onEdit = (bookingId: string): void => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set(keyOpenEditModal, bookingId)
    setSearchParams(newSearchParams);
  }

  const booking: Booking | undefined = useMemo(() => {
    const id = searchParams.get(keyOpenEditModal) || '';
    return bookings.find((booking) => booking.id === id);
  }, [searchParams, bookings])

  const room: Room | undefined = useMemo(() => {
    const id = searchParams.get(keyOpenModal) || '';
    return rooms.find((room) => room.id === id || room.id === booking?.roomId);
  }, [searchParams, rooms, booking])


  const openBookingModal: boolean = useMemo(() => {
    return !!searchParams.get(keyOpenModal) || !!searchParams.get(keyOpenEditModal)
  }, [searchParams])

  return { onClose, onOpen, onEdit, room, openBookingModal, booking };
}