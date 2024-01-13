import { BookingForm } from "@/components/BookingForm";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { FC, PropsWithChildren } from "react";
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

const BookingDrawer: FC<PropsWithChildren> = () => {
  const { onClose, room, openBookingModal } = useBookingDrawer();

  const onCloseInOnOpenChange = (value: boolean) => {
    if (!value) {
      onClose()
    }
  }

  return (
    <Drawer open={!!openBookingModal} onOpenChange={onCloseInOnOpenChange}>
      <DrawerContent>
        <div className="mx-auto max-w-[400px] max-h-[100vh] overflow-y-auto">
          {!room ? <BookingDrawerError onClose={onClose} /> : (
            <>
              <DrawerHeader>
                <DrawerTitle className="text-left">{room.name}</DrawerTitle>
                <DrawerDescription className={"text-left"}>{room.description}</DrawerDescription>
              </DrawerHeader>
              <Separator className="h-1" />
              <div className="p-4">
                <span className="text-sm mb-4 inline-block">
                  <span className="text-lg font-semibold">
                    ${room.pricePerDay}
                  </span>
                  {" "}night
                </span>
                <BookingForm room={room} />
              </div>
              <Separator className="h-1 my-4" />
              <DrawerFooter>
                <Button onClick={onClose} variant="outline">Cancel</Button>
              </DrawerFooter>
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export { BookingDrawer };
