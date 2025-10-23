import { RoleEnum } from "@prisma/client";
import { IsEnum, IsString, Min } from "class-validator";

export class craeteUserByAdminDto {
  @IsString()
  email: string;

  @IsString()
  @Min(6)
  password: string;

  @IsEnum(RoleEnum)
  role_id: RoleEnum;
}