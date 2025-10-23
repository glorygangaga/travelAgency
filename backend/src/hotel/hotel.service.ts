import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateHotelDto } from './dto/create.dto';
import { UpdateHotelDto } from './dto/update.dto';

@Injectable()
export class HotelService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getHotels(pageNumber: number, pageSize: number) {
    const skip = pageSize * (pageNumber - 1);
    const hotel = await this.prisma.hotel.findMany({
      take: pageSize,
      skip
    });
    const total = await this.prisma.hotel.count();
    return { hotel, total };
  }

  async getHotel(hotel_id: number) {
    return this.prisma.hotel.findFirst({
      where: {hotel_id}
    })
  }

  async createHotel(dto: CreateHotelDto) {
    this.prisma.hotel.create({data: dto});
  }

  async updateHotel(dto: UpdateHotelDto) {
    this.prisma.hotel.update({where: {hotel_id: dto.hotel_id}, data: dto});
  }

  async deleteHotel(hotel_id: number) {
    this.prisma.hotel.deleteMany({where: {hotel_id}});
  }
}
