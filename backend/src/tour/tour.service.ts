import { RoleEnum } from '@prisma/client';

import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TourDto } from './dto/tour.dto';

@Injectable()
export class TourService {
  constructor (
    private prisma: PrismaService,
  ) {}

  async getTours(pageNumber: number, pageSize: number) {
    const takePage = pageSize * pageNumber;
    return this.prisma.tour.findMany({
      take: pageSize,
      skip: takePage
    });
  }

  async getTour(tour_id: number) {
    return this.prisma.tour.findFirst({
      where: {tour_id}
    });
  }

  async createTour(dto: TourDto, userRole: RoleEnum) {
    if (userRole !== RoleEnum.admin) throw new ForbiddenException('Access denied: admin privileges required.');
    return this.prisma.tour.create({data: {...dto,
      start_date: new Date(dto.start_date),
      end_date: new Date(dto.end_date),
    }});
  }

  async updateTour(tour_id: number, dto: TourDto, userRole: RoleEnum) {
    if (userRole !== RoleEnum.admin) throw new ForbiddenException('Access denied: admin privileges required.');;
    return this.prisma.tour.update({where: {tour_id}, data: {...dto,
      start_date: new Date(dto.start_date),
      end_date: new Date(dto.end_date),
    }});
  }
}
