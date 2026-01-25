import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';
import { CountryModule } from 'src/country/country.module';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports: [UserModule, CountryModule, ImageModule],
  controllers: [HotelController],
  providers: [HotelService, PrismaService],
  exports: [HotelService]
})
export class HotelModule {}
