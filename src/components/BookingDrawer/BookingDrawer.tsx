import { FC, PropsWithChildren } from "react";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "../ui/drawer";
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
        <div className="mx-auto max-w-[400px]">
          {!room ? <BookingDrawerError onClose={onClose} /> : (
            <>
              <DrawerHeader>
                <DrawerTitle className="text-left">{room.name}</DrawerTitle>
                <DrawerDescription className={"text-left"}>{room.description}</DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Submit</Button>
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
