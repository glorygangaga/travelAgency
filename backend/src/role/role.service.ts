import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RoleEnum } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async getRoleByName(role: RoleEnum) {
    return this.prisma.role.findUnique({
      where: { role_name: role },
    })
  }
}
