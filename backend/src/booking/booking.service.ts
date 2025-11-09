import {  BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBookingDto } from './dto/create.dto';
import { TourService } from 'src/tour/tour.service';

@Injectable()
export class BookingService {
  constructor (
    private prisma: PrismaService,
    private tourService: TourService
  ) {}

  async getBookingsByUser(user_id: number) {
    return this.prisma.booking.findMany({where: {user_id}});
  }

  async getBooking(user_id: number, booking_id: number) {
    const booking = await this.prisma.booking.findFirst({where: {booking_id, user_id}});
    if (!booking) throw new BadRequestException('Not that user.')
    return booking;
  }

  async createBooking(user_id: number, dto: CreateBookingDto) {
    const tour = await this.tourService.getTour(dto.tour_id);
    if (!tour) throw new BadRequestException('Tour not found');
    if (dto.num_people > tour.available_slots) throw new BadRequestException('Not enough slots');
    await this.tourService.decrementTourSlots(tour.available_slots - dto.num_people, tour.tour_id);

    return this.prisma.booking.create({data: {user_id: user_id, ...dto}});
  }
}
