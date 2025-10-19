import { ForbiddenException, Injectable } from '@nestjs/common';
import { RoleEnum } from '@prisma/client/index-browser';
import { PrismaService } from 'src/prisma.service';
import { CountryDto } from './dto/county.dto';

@Injectable()
export class CountryService {
  constructor(
    private prisma: PrismaService
  ) {}

  async getCountries(pageNumber: number, pageSize: number) {
    const takePage = pageSize * pageNumber;
    return this.prisma.counry.findMany({
      take: pageSize,
      skip: takePage
    });
  }

  async getCountry(country_id: number) {
    return this.prisma.counry.findFirst({where: {country_id}});
  }

  async create(dto: CountryDto, userRole: RoleEnum) {
    if (userRole !== RoleEnum.admin) throw new ForbiddenException('Access denied: admin privileges required.');
    return this.prisma.counry.create({data: dto});
  }

  async update(country_id: number, dto: CountryDto, userRole: RoleEnum) {
    if (userRole !== RoleEnum.admin) throw new ForbiddenException('Access denied: admin privileges required.');
    return this.prisma.counry.update({where: {country_id}, data: dto});
  }
}
