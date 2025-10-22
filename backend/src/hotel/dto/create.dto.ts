import { IsNumber, IsString } from "class-validator";

export class CreateHotelDto {
  @IsNumber()
  country_id: number

  @IsString()
  hotel_name: string

  @IsString()
  category: string

  @IsString()
  description: string
}