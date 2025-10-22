import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { AuthRole } from 'src/decorators/role.decorator';
import { CreateHotelDto } from './dto/create.dto';
import { UpdateHotelDto } from './dto/update.dto';

@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Get()
  async getHotels(@Query('pageNumber') pageNumber: string, @Query('pageSize') pageSize: string) {
    return this.hotelService.getHotels(+pageNumber, +pageSize);
  }

  @Get('/:hotel_id')
  async getHotel(@Param('hotel_id') hotel_id: string) {
    return this.hotelService.getHotel(+hotel_id);
  }

  @Post()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @AuthRole('admin')
  async createHotel(@Body() dto: CreateHotelDto) {
    return this.hotelService.createHotel(dto);
  }

  @Put()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @AuthRole('admin')
  async updateHotel(@Body() dto: UpdateHotelDto) {
    return this.hotelService.updateHotel(dto);
  }

  @Delete('/:hotel_id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @AuthRole('admin')
  async deleteHotel(@Param('hotel_id') hotel_id: string) {
    return this.hotelService.deleteHotel(+hotel_id);
  }
}
