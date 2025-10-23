import { Body, Controller, Get, HttpCode, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UserDto } from './dto/user.dto';
import { AuthRole } from 'src/decorators/role.decorator';

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

  @Get('role')
  @Auth()
  async getRole(@CurrentUser('user_id') id: number) {
    return this.userService.getUserRole(id);
  }

  @Get('all')
  @AuthRole('admin')
  async getAllUsers(@Query('pageNumber') pageNumber: string, @Query('pageSize') pageSize: string) {
    return this.userService.getAllUsers(+pageNumber, +pageSize);
  }
}
