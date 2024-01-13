import { useStore } from "@/lib/store";
import { Room } from "@/service/Room";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useBookingDrawer = () => {
  const { rooms } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const key = 'openBookingModal' as const

  const onClose = (): void => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete(key);
    setSearchParams(newSearchParams);
  }

  const onOpen = (id: string): void => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set(key, id)
    setSearchParams(newSearchParams);
  }

  const room: Room | undefined = useMemo(() => {
    const id = searchParams.get(key) || '';
    return rooms.find((room) => room.id === id);
  }, [searchParams, rooms])

  const openBookingModal: boolean = useMemo(() => {
    return !!searchParams.get(key)
  }, [searchParams])

  return { onClose, onOpen, room, openBookingModal };
}