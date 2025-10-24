import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [CountryController],
  providers: [CountryService, PrismaService],
  exports: [CountryService]
})
export class CountryModule {}
