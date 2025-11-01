import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TourService } from './tour.service';
import { AuthRole } from 'src/decorators/role.decorator';
import { TourDto } from './dto/tour.dto';

@Controller('tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Get()
  async getTours(@Query('pageNumber') pageNumber: string, @Query('pageSize') pageSize: string) {
    return this.tourService.getTours(+pageNumber, +pageSize);
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

  @Put("/:tour_id")
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @AuthRole('admin')
  async updateTour(@Param('tour_id') tour_id: string, @Body() dto: TourDto) {
    return this.tourService.updateTour(+tour_id, dto);
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
}
