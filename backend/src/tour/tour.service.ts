import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TourDto } from './dto/tour.dto';
import { HotelService } from 'src/hotel/hotel.service';
import { UpdateTourDto } from './dto/update.dto';

@Injectable()
export class TourService {
  constructor (
    private prisma: PrismaService,
    private hotelService: HotelService
  ) {}

  async getTours(pageNumber: number, pageSize: number) {
    const takePage = pageSize * (pageNumber - 1);
    const tours = await this.prisma.tour.findMany({
      take: pageSize,
      skip: takePage,
      include: {
        hotel: {
          select: {
            hotel_name: true
          }
        },
        country: {
          select: {
            country_name: true
          }
        }
    }
    });
    const total = await this.prisma.tour.count();

    return {tours, total};
  }

  async getTour(tour_id: number) {
    return this.prisma.tour.findUnique({
      where: {tour_id}, include: {reviews: true}
    });
  }

  async createTour(dto: TourDto) {
    const start = new Date(dto.start_date);
    const end = new Date(dto.end_date);
    const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    const createTour = {
      ...dto,
      duration_days: duration
    };

    return this.prisma.tour.create({data: {...createTour,
      start_date: new Date(dto.start_date),
      end_date: new Date(dto.end_date),
    }});
  }

  async updateTour(dto: UpdateTourDto) {
    return this.prisma.tour.update({where: {tour_id: dto.tour_id}, data: {...dto,
      start_date: new Date(dto.start_date),
      end_date: new Date(dto.end_date),
    }});
  }

  async deleteTour(tour_id: number) {
    return this.prisma.tour.delete({where: {tour_id}});
  }

  async getHotelsForTours() {
    return this.hotelService.getHotelsSelect();
  }

  async getMostCountry(total: number) {
    const countriesTop = await this.prisma.tour.groupBy({
      take: total,
      by: ['country_id'],
      _count: {country_id: true},
      orderBy: {_count: {country_id: 'desc'}}
    });
    const ids = countriesTop.map(c => c.country_id);

    return this.prisma.counry.findMany({
      where: { country_id: { in: ids } },
    });
  }

  async getToursByCountry(country_id: number) {
    return this.prisma.tour.findMany({
      where: {country: {country_id}}
    });
  }

  async findByQuery(query: string, country_id?: string) {
    return this.prisma.tour.findMany({
      where: {
        OR: [
          {title: {contains: query, mode: 'insensitive'}},
          {description: {contains: query, mode: 'insensitive'}},
          {country: {country_name: {contains: query, mode: 'insensitive'}}},
          {hotel: {hotel_name: {contains: query, mode: 'insensitive'}}},
        ],
        AND: [
          {country_id: country_id ? +country_id : undefined}
        ]
      },
      include: {
        hotel: true,
        country: true,
      },
      take: 10
    });
  }

  async getFullTour(tour_id: number) {
    return this.prisma.tour.findUnique({where: {tour_id}, include: {
      hotel: true,
      country: true,
      reviews: true
    }})
  }
}
