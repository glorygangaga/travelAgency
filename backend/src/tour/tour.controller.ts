import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TourService } from './tour.service';
import { AuthRole } from 'src/decorators/role.decorator';
import { TourDto } from './dto/tour.dto';
import { UpdateTourDto } from './dto/update.dto';

@Controller('tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Get()
  async getTours(@Query('pageNumber') pageNumber: string, @Query('pageSize') pageSize: string) {
    return this.tourService.getTours(+pageNumber, +pageSize);
  }

  @Get('/search')
  async getToursByQuery(@Query('q') q: string, @Query('country_id') country_id: string) {
    if (!q && !country_id) return [];
    return this.tourService.findByQuery(q, country_id);
  }

  @Get('/full/:tour_id')
  async getFullTour(@Param('tour_id') tour_id: string) {
    return this.tourService.getFullTour(+tour_id);
  }
  
  @Get('/:tour_id')
  async getTour(@Param('tour_id') tour_id: string) {
    return this.tourService.getTour(+tour_id);
  }
  

  @Post()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @AuthRole('admin')
  async createTour(@Body() dto: TourDto) {
    return this.tourService.createTour(dto);
  }

  @Put()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @AuthRole('admin')
  async updateTour(@Body() dto: UpdateTourDto) {
    return this.tourService.updateTour(dto);
  }

  @Delete('/:tour_id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @AuthRole('admin')
  async deleteTour(@Param('tour_id') tour_id: string) {
    return this.tourService.deleteTour(+tour_id);
  }

  @Get('/list/hotels')
  async getHotelsForTours() {
    return this.tourService.getHotelsForTours();
  }

  @Get('/list/country/most/:total')
  async getCountiesByDesc(@Param('total') total: string) {
    return this.tourService.getMostCountry(+total);
  }

  @Get('/country/:country_id')
  async getToursByCountry(@Param('country_id') country_id: string, @Query('pageNumber') pageNumber: string, @Query('pageSize') pageSize: string) {
    return this.tourService.getToursByCountry(+country_id, +pageNumber, +pageSize);
  }

  @Get('/hotel/:hotel_id') 
  async GetToursByHotels(@Param('hotel_id') hotel_id: string, @Query('pageNumber') pageNumber: string, @Query('pageSize') pageSize: string) {
    return this.tourService.getToursByHotels(+hotel_id, +pageNumber, +pageSize);
  }
}
