import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TourDto } from './dto/tour.dto';
import { HotelService } from 'src/hotel/hotel.service';
import { UpdateTourDto } from './dto/update.dto';
import { ReviewService } from 'src/review/review.service';
import { TourQueryDto } from './dto/query.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TourService {
  constructor (
    private prisma: PrismaService,
    private hotelService: HotelService,
    private reivewService: ReviewService
  ) {}

  async getTours(pageNumber: number, pageSize: number) {
    const takePage = pageSize * (pageNumber - 1);
    const tours = await this.prisma.tour.findMany({
      take: pageSize,
      skip: takePage,
      include: {
        hotel: {select: {hotel_name: true}},
        country: {select: {country_name: true}}
      },
      where: {AND: [
        {available_slots: {gt: 0}}
      ]}
    });
    const total = await this.prisma.tour.count({where: {AND: [
      {available_slots: {gt: 0}}
    ]}
});

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

    return this.prisma.country.findMany({
      where: { country_id: { in: ids } },
    });
  }

  async getToursByCountry(country_id: number, pageNumber: number, pageSize: number) {
    const takePage = pageSize * (pageNumber - 1);

    const tours = await this.prisma.tour.findMany({
      where: {country: {country_id}},
      take: pageSize,
      skip: takePage,
      include: {
        hotel: {select: {hotel_name: true}},
        country: {select: {country_name: true}}
      }
    });

    const total = await this.prisma.tour.count({
      where: {country_id}
    })

    return {tours, total};
  }

  async getToursByHotels(hotel_id: number, pageNumber: number, pageSize: number) {
    const takePage = pageSize * (pageNumber - 1);

    const tours = await this.prisma.tour.findMany({
      where: {hotel_id},
      take: pageSize,
      skip: takePage,
      include: {
        hotel: {select: {hotel_name: true}},
        country: {select: {country_name: true}}
      }
    });

    const total = await this.prisma.tour.count({
      where: {hotel_id}
    });

    return {tours, total};
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

  async getToursByQuery(dto: TourQueryDto) {
    const takePage = dto.pageSize * (dto.pageNumber - 1);

    const filters: Prisma.TourWhereInput[] = [];
    if (dto.country_id) filters.push({ country_id: dto.country_id })
    if (dto.hotel_id) filters.push({ hotel_id: dto.hotel_id })
    if (dto.food) filters.push({ food_type: dto.food })
    if (dto.maxPrice) filters.push({ price_person: { lte: dto.maxPrice } })
    if (dto.minPrice) filters.push({ price_person: { gte: dto.minPrice } })
    if (dto.minSlots) filters.push({ available_slots: { gte: dto.minSlots } })
    if (dto.minDateStart) filters.push({ start_date: { gte: new Date(dto.minDateStart) } })
    if (dto.maxDateEnd) filters.push({ end_date: { lte: new Date(dto.maxDateEnd) } })

    const tours = await this.prisma.tour.findMany({
      where: {
        OR: dto.q ? [
          {title: {contains: dto.q, mode: 'insensitive'}},
          {description: {contains: dto.q, mode: 'insensitive'}},
          {country: {country_name: {contains: dto.q, mode: 'insensitive'}}},
          {hotel: {hotel_name: {contains: dto.q, mode: 'insensitive'}}},
        ] : undefined,
        AND: filters.length ? filters : undefined,
      },
      orderBy: {
        price_person: dto.filterByPriceMax ? 'desc' : dto.filterByPriceMin ? 'asc' : undefined
      },
      take: dto.pageSize,
      skip: takePage,
      include: {
        hotel: true,
        country: true,
      },
    });

    const total = await this.prisma.tour.count({
      where: {
        OR: dto.q
          ? [
              { title: { contains: dto.q, mode: 'insensitive' } },
              { description: { contains: dto.q, mode: 'insensitive' } },
              { country: { country_name: { contains: dto.q, mode: 'insensitive' } } },
              { hotel: { hotel_name: { contains: dto.q, mode: 'insensitive' } } },
            ]
          : undefined,
        AND: filters.length ? filters : undefined,
      },
    });
  


    return {tours, total};
  }

  async getFullTour(tour_id: number) {
    const rating = await this.reivewService.getTourRating(tour_id);
    const tour = await this.prisma.tour.findUnique({where: {tour_id}, include: {
      hotel: true,
      country: true,
    }});

    return {...tour, ...rating};
  }

  async decrementTourSlots(num_people: number, tour_id: number) {
    return this.prisma.tour.update({where: {tour_id}, data: {available_slots: num_people}});
  }

  async getToursByIds(tours: number[]) {
    return this.prisma.tour.findMany({where: {tour_id: {in: tours}}, include: {
      hotel: true,
      country: true
    }});
  }
}
