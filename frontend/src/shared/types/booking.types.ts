export type BookingType = {
  user_id: number;
  booking_id: number;
  tour_id: number;
  booking_date: Date;
  num_people: number;
  total_price: number;
}

export type getBookingsTypeResponse = BookingType[];