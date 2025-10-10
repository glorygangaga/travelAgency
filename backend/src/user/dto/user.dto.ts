import { IsDate, IsOptional, IsString, MinLength } from "class-validator";

export class UserDto {
  @IsOptional()
  @IsString()
  @MinLength(6, {message: 'password must be at least 6 characters logn'})
  password?: string;

  @IsOptional()
  @IsString()
  fullname?: string;

  @IsOptional()
  @IsDate()
  date?: Date;

  @IsOptional()
  @IsString()
  passport_number?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}