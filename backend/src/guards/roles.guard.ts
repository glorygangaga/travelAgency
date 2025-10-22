import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/decorators/role.decorator";
import { PrismaService } from "src/prisma.service";

@Injectable() 
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!user) throw new ForbiddenException('No user found in request');

    const dbUser = await this.prisma.user.findUnique({
      where: { user_id: user.user_id },
      select: { role: true },
    });

    if (!dbUser) throw new ForbiddenException('User not found');
    if (!requiredRoles.includes(dbUser.role.role_name)) throw new ForbiddenException('Access denied: insufficient role');

    return true;
  }
}