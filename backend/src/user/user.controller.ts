import { Body, Controller, Get, HttpCode, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async profile(@CurrentUser('user_id') id: number) {
    return this.userService.getProfile(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('profile')
  @Auth()
  async updateProfile(@CurrentUser('user_id') id: number, @Body() dto: UserDto) {
    const {password, ...user} = await this.userService.update(dto, id);
    return user;
  }

  @Get('booking')
  @Auth()
  async getTripHistory(@CurrentUser('user_id') id: number) {
    return this.userService.getTrips(id);
  }

  @Get('review')
  @Auth()
  async getReview(@CurrentUser('user_id') id: number) {
    return this.userService.getReviews(id);
  }

  @Get('role')
  @Auth()
  async getRole(@CurrentUser('user_id') id: number) {
    return this.userService.getUserRole(id);
  }
}
