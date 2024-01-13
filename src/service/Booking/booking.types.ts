export type Booking = {
  id: string;
  roomId: string;
  totalPrice: number;
  checkIn: Date;
  checkOut: Date;
  quantityGuests: number;
}