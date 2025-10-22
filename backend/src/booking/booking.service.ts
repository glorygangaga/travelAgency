import {  Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBookingDto } from './dto/create.dto';

@Injectable()
export class BookingService {
  constructor (
    private prisma: PrismaService,
  ) {}

  async getBookingsByUser(user_id: number) {
    return this.prisma.booking.findMany({where: {user_id}});
  }

  async getBooking(user_id: number, booking_id: number) {
    return this.prisma.booking.findFirst({where: {booking_id, user_id}});
  }

  async createBooking(user_id: number, dto: CreateBookingDto) {
    return this.prisma.booking.create({data: {user_id: user_id, ...dto}});
  }
}
