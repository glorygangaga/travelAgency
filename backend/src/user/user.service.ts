import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { RoleService } from 'src/role/role.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private roleService: RoleService
  ) {}

  async getById(user_id: number) {
    return this.prisma.user.findUnique({
      where: {user_id},
    })
  }

  async getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {email}
    })
  }

  async create(dto: AuthDto) {
    const role = await this.roleService.getRoleByName('user');
    if (!role) throw new BadRequestException('Role "user" not found. Run `npm run seed` first.');
  
    const user = {
      email: dto.email,
      password: await hash(dto.password),
      role_id: role.role_id
    }

    return this.prisma.user.create({
      data: user,
    })
  }

  async update(dto: UserDto, id: number) {
    let data: any = dto;

    if (dto.password) data = {...data, password: await hash(dto.password)};
    if (dto.date) data = {...data, date: new Date(dto.date)}
    return this.prisma.user.update({
      where: {user_id: id},
      data
    })
  }

  async getProfile(id: number) {
    const response = await this.getById(id);
    if (response) {
      const {password, ...user} = response;
      return user;
    }
    
    return response;
  }

  async getTrips(user_id: number) {
    const response = await this.prisma.user.findFirst({
      where: {user_id},
      select: { bookings: true }
    });
    if (response) {
      const {bookings} = response;
      return bookings;
    }
    return response;
  }

  async getReviews(user_id: number) {
    const response = await this.prisma.user.findFirst({
      where: {user_id},
      select: {reviews: true}
    });
    if (response) {
      const {reviews} = response;
      return reviews;
    }
    return response;
  }

  async getUserRole(user_id: number) {
    const response = await this.prisma.user.findFirst({
      where: {user_id},
      select: {role: true}
    });
    if (response) {
      const {role} = response;
      return role.role_name;
    }
    return response;
  }
}
