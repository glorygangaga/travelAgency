import { FoodEnum } from "@prisma/client";
import { Type } from "class-transformer";
import { IsBoolean, IsDateString, IsEnum, IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class TourQueryDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  hotel_id?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  country_id?: number;

  @IsEnum(FoodEnum)
  @IsOptional()
  food?: FoodEnum;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  maxPrice?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  minPrice?: number;

  @IsDateString()
  @IsOptional()
  minDateStart?: string;

  @IsDateString()
  @IsOptional()
  maxDateEnd?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  minSlots?: number;

  @IsString()
  @IsOptional()
  q?: string;

  @IsBoolean()
  @IsOptional()
  filterByPriceMax?: boolean;

  @IsBoolean()
  @IsOptional()
  filterByPriceMin?: boolean;

  @IsInt()
  @Type(() => Number)
  pageNumber: number;

  @IsInt()
  @Type(() => Number)
  pageSize: number;
}