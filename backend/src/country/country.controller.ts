import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query, UploadedFiles, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryDto } from './dto/county.dto';
import { UpdateCountryDto } from './dto/update.dto';
import { AuthRole } from 'src/decorators/role.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';

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
    const country = await this.countryService.getCountry(+country_id);
    if (country !== null) return country;
    throw new NotFoundException('Country not found');
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  @UseInterceptors(FilesInterceptor('images'))
  @AuthRole('admin', 'manager')
  async createCountry(@UploadedFiles() images: Express.Multer.File[] = [], @Body() dto: CountryDto) {
    console.log(images);
    
    return this.countryService.create(images, dto);
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
