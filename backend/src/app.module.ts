import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { BookingModule } from './booking/booking.module';
import { TourModule } from './tour/tour.module';
import { CountryModule } from './country/country.module';
import { PaymentModule } from './payment/payment.module';
import { BlogpostModule } from './blogpost/blogpost.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { ReviewModule } from './review/review.module';
import { HotelModule } from './hotel/hotel.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, RoleModule, BookingModule, TourModule, CountryModule, PaymentModule, BlogpostModule, SubscriptionModule, ReviewModule, HotelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
