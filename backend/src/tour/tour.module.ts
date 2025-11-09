import { Module } from '@nestjs/common';
import { TourService } from './tour.service';
import { TourController } from './tour.controller';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';
import { HotelModule } from 'src/hotel/hotel.module';
import { ReviewModule } from 'src/review/review.module';

@Module({
  imports: [UserModule, HotelModule, ReviewModule],
  controllers: [TourController],
  providers: [TourService, PrismaService],
  exports: [TourService]
})
export class TourModule {}
