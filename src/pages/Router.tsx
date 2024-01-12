import { Navigate, Route, Routes } from "react-router-dom"
import { Rooms } from "./rooms/Rooms"
import { FC } from "react"

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="rooms" />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/bookings" element={<h1>Bookings</h1>} />
      {/* <Route path="/upcoming/:user" element={<Upcoming />} /> */}
      {/* <Route path="/record/:user" element={<Record />} /> */}
      <Route path="*" element={<h1>Not found page</h1>} />
    </Routes>
  )
}

export { Router }