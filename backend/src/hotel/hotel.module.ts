import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';
import { CountryModule } from 'src/country/country.module';

@Module({
  imports: [UserModule, CountryModule],
  controllers: [HotelController],
  providers: [HotelService, PrismaService],
})
export class HotelModule {}
