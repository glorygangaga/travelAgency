import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryDto } from './dto/county.dto';
import { UpdateCountryDto } from './dto/update.dto';
import { AuthRole } from 'src/decorators/role.decorator';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async getCountries(@Query('pageNumber') pageNumber: string, @Query('pageSize') pageSize: string) {
    return this.countryService.getCountries(+pageNumber, +pageSize);
  }

  @Get(':country_id')
  async getCounty(@Param('country_id') country_id: string) {
    if (isNaN(+country_id)) throw new BadRequestException('Invalid country_id parameter');
    return this.countryService.getCountry(+country_id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  @AuthRole('admin', 'manager')
  async createCountry(@Body() dto: CountryDto) {
    return this.countryService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put()
  @AuthRole('admin', 'manager')
  async updateCountry(@Body() dto: UpdateCountryDto) {
    return this.countryService.update(dto);
  }

  @UsePipes(new ValidationPipe())
  @Delete(':country_id')
  @AuthRole('admin', 'manager')
  async deleteCountry(@Param('country_id') country_id: string) {
    return this.countryService.deleteCountry(+country_id);
  }
}
