import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Router } from "./pages/Router"
import { useNavigate } from "react-router-dom";
import { BookingDrawer } from "./components/BookingDrawer";
import { useGetBooking } from "./service/Booking";

function App() {

  useGetBooking();
  const navigate = useNavigate();
  const [tab, setTab] = useState('rooms');

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
    </div>
  )
}

export default App
