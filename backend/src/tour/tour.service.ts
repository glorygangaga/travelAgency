import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TourDto } from './dto/tour.dto';

@Injectable()
export class TourService {
  constructor (
    private prisma: PrismaService
  ) {}

  async getTours(pageNumber: number, pageSize: number) {
    const takePage = pageSize * (pageNumber - 1);
    return this.prisma.tour.findMany({
      take: pageSize,
      skip: takePage
    });
  }

  async getTour(tour_id: number) {
    return this.prisma.tour.findFirst({
      where: {tour_id}, include: {reviews: true}
    });
  }

  async createTour(dto: TourDto) {
    return this.prisma.tour.create({data: {...dto,
      start_date: new Date(dto.start_date),
      end_date: new Date(dto.end_date),
    }});
  }

  async updateTour(tour_id: number, dto: TourDto) {
    return this.prisma.tour.update({where: {tour_id}, data: {...dto,
      start_date: new Date(dto.start_date),
      end_date: new Date(dto.end_date),
    }});
  }
}
