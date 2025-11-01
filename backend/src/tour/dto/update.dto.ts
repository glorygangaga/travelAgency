import { FoodEnum } from "@prisma/client";
import { IsDateString, IsEnum, IsNumber, IsString } from "class-validator";

export class UpdateTourDto {
  @IsNumber()
  tour_id: number;

  @IsNumber()
  hotel_id: number;

  @IsNumber()
  country_id: number;

  @IsString()
  title: string;

  @IsDateString()
  start_date: string;

  @IsDateString()
  end_date: string;

  @IsString()
  tour_type: string;

  @IsEnum(FoodEnum)
  food_type: FoodEnum;

  @IsNumber()
  price_person: number;

  @IsNumber()
  available_slots: number;

  @IsString()
  description: string;
}

