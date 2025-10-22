import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CountryDto } from './dto/county.dto';
import { UpdateCountryDto } from './dto/update.dto';

@Injectable()
export class CountryService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getCountries(pageNumber: number, pageSize: number) {
    const skip = pageSize * (pageNumber - 1);
    return this.prisma.counry.findMany({
      take: pageSize, skip
    });
  }

  async getCountry(country_id: number) {
    return this.prisma.counry.findFirst({where: {country_id}});
  }

  async create(dto: CountryDto) {
    return this.prisma.counry.create({data: dto});
  }

  async update(dto: UpdateCountryDto) {
    return this.prisma.counry.update({where: {country_id: dto.country_id}, data: dto});
  }
}
