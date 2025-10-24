import {  IsNumber, IsString, Min } from "class-validator";

export class craeteUserByAdminDto {
  @IsString()
  email: string;

  @IsString()
  @Min(6)
  password: string;

  @IsNumber()
  role_id: number;
}