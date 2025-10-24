import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateHotelDto } from './dto/create.dto';
import { UpdateHotelDto } from './dto/update.dto';
import { CountryService } from 'src/country/country.service';

@Injectable()
export class HotelService {
  constructor(
    private prisma: PrismaService,
    private countryService: CountryService,
  ) {}

  async getHotels(pageNumber: number, pageSize: number) {
    const skip = pageSize * (pageNumber - 1);
    const hotel = await this.prisma.hotel.findMany({
      take: pageSize,
      skip,
      include: {country: {
        select: {
          country_name: true,
        }
      }}
    });
    const total = await this.prisma.hotel.count();
    return { hotel, total };
  }

  async getHotel(hotel_id: number) {
    return this.prisma.hotel.findUnique({
      where: {hotel_id}
    });
  }

  async createHotel(dto: CreateHotelDto) {
    return this.prisma.hotel.create({data: dto});
  }

  async updateHotel(dto: UpdateHotelDto) {
    return this.prisma.hotel.update({where: {hotel_id: dto.hotel_id}, data: dto});
  }

  async deleteHotel(hotel_id: number) {
    return this.prisma.hotel.delete({where: {hotel_id}});
  }

  async getAllCountriesForHotelType() {
    return this.countryService.getCountriesSelect();
  }
}
