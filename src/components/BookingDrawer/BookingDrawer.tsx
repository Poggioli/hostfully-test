import { BookingForm } from "@/components/BookingForm";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { FC } from "react";
import { useBookingDrawer } from "./useBookingDrawer";


type BookingDrawerErrorProps = {
  onClose: () => void;
}

const BookingDrawerError: FC<BookingDrawerErrorProps> = ({ onClose }) => {
  return (
    <>
      <DrawerHeader>
        <DrawerTitle className="text-center">Room not found</DrawerTitle>
        <DrawerDescription className="text-center">We could not found the room that you are looking for.</DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <Button onClick={onClose} variant="outline">Close</Button>
      </DrawerFooter>
    </>
  )
}

const BookingDrawer: FC = () => {
  const { onClose, room, openBookingModal } = useBookingDrawer();

  const onCloseInOnOpenChange = (value: boolean) => {
    if (!value) {
      onClose()
    }
  }

  return (
    <Drawer open={!!openBookingModal} onOpenChange={onCloseInOnOpenChange}>
      <DrawerContent>
        <div className="mx-auto max-w-[400px] max-h-[100vh] overflow-y-auto md:w-full md:max-w-[640px] md:overflow-hidden md:flex md:pt-8 md:items-center">
          {!room ? <BookingDrawerError onClose={onClose} /> : (
            <>
              <DrawerHeader className="md:max-w-[300px] md:w-full md:h-fit">
                <DrawerTitle className="text-left">{room.name}</DrawerTitle>
                <DrawerDescription className={"text-left"}>{room.description}</DrawerDescription>
              </DrawerHeader>
              <Separator className="max-w-[200px] mx-auto md:hidden" />
              <div className="p-4 md:w-full">
                <span className="text-sm mb-4 inline-block">
                  <span className="text-lg font-semibold">
                    ${room.pricePerDay}
                  </span>
                  {" "}night
                </span>
                <BookingForm room={room} />
              </div>
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export { BookingDrawer };
