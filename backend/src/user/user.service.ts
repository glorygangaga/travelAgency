import { hash } from 'argon2';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { RoleService } from 'src/role/role.service';
import { UserDto } from './dto/user.dto';
import { craeteUserByAdminDto } from '../auth/dto/createByAdmin.dto';

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

  async getAllUsers(pageNumber: number, pageSize: number) {
    const skip = pageSize * (pageNumber - 1);

    const users = await this.prisma.user.findMany({
      take: pageSize,
      skip,
      select: {
        user_id: true,
        email: true,
        fullname: true,
        date: true,
        phone: true,
        created_at: true,
        updated_at: true,
        role_id: true
      }
    });

    const total = await this.prisma.user.count();

    return {users, total};
  }

  async adminCreate(dto: craeteUserByAdminDto) {
    const role = await this.roleService.getRoleByRoleId(dto.role_id);
    if (!role) throw new BadRequestException("can't craete new user. Role is not valid.");
    const user = {
      email: dto.email,
      password: await hash(dto.password),
      role_id: role.role_id 
    }
    return this.prisma.user.create({
      data: user,
    })
  }

}
