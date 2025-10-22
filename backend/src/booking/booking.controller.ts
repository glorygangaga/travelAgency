import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  @Auth()
  async getBookings(@CurrentUser('user_id') id: number) {
    return this.bookingService.getBookingsByUser(id);
  }

  @Get(':booking_id')
  @Auth()
  async getBooking(@CurrentUser('user_id') id: number, @Param('booking_id') booking_id: string) {
    if (isNaN(+booking_id)) throw new BadRequestException('Invalid booking_id parameter');
    return this.bookingService.getBooking(id, +booking_id);
  }
}
