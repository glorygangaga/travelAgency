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
    const countries = await this.prisma.country.findMany({
      take: pageSize, skip,
    });
    const total = await this.prisma.country.count();
    return {countries, total};
  }

  async getCountry(country_id: number) {
    return this.prisma.country.findFirst({where: {country_id}});
  }

  async create(dto: CountryDto) {
    return this.prisma.country.create({data: dto});
  }

  async update(dto: UpdateCountryDto) {
    return this.prisma.country.update({where: {country_id: dto.country_id}, data: dto});
  }

  async deleteCountry(country_id: number) {
    return this.prisma.country.delete({where: {country_id}});
  }

  async getCountriesSelect() {
    const countries = await this.prisma.country.findMany({select: {
      country_id: true,
      country_name: true,
    }});

    return countries.map(c => ({
      id: c.country_id,
      value: c.country_name,
      exitValue: c.country_id
    }))
  }
}
