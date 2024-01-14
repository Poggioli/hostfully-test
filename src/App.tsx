import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BookingDrawer } from "./components/BookingDrawer";
import { Toaster } from "./components/ui/sonner";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Router } from "./pages/Router";
import { useGetBooking } from "./service/Booking";
import { useGetRooms } from "./service/Room";

function App() {

  useGetBooking();
  useGetRooms();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState(pathname.includes('rooms') ? 'rooms' : 'bookings');

  const onValueChange = (value: string) => {
    setTab(value);
    navigate(value);
  }

  return (
    <div className="mx-auto max-w-screen-xl p-6 flex flex-col">
      <Tabs value={tab} onValueChange={onValueChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-10">
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>
        <Router />
        <BookingDrawer />
      </Tabs>
      <Toaster position="bottom-center" />
    </div>
  )
}

export default App
