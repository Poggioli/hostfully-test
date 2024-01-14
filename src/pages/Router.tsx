import { FC } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Bookings } from "./bookings/Bookings"
import { Rooms } from "./rooms/Rooms"

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="rooms" />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="*" element={<h1>Not found page</h1>} />
    </Routes>
  )
}

export { Router }
