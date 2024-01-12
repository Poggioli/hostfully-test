import { useSearchParams } from "react-router-dom";

export const useBookingDrawer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const key = 'openBookingModal' as const

  const onClose = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete(key);
    setSearchParams(newSearchParams);
  }

  const onOpen = (id: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set(key, id)
    setSearchParams(newSearchParams);
  }

  return { onClose, onOpen };
}