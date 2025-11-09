import { axiosWithAuth } from "@/api/interseptors";
import { BookingType, createBookingType, getBookingsTypeResponse } from "@/shared/types/booking.types";

class BookingService {
  private BASE_URL = '/booking';

  async getUserBookings() {
    const response = await axiosWithAuth.get<getBookingsTypeResponse>(this.BASE_URL);
    return response.data;
  }

  async getUserBooking(booking_id: number) {
    const response = await axiosWithAuth.get<BookingType>(this.BASE_URL + `/${booking_id}`);
    return response.data;
  }

  async createBooking(bookingData: createBookingType) {
    const response = await axiosWithAuth.post<BookingType>(this.BASE_URL, bookingData);
    return response;
  }
};

export const bookingService = new BookingService();