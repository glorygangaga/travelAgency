import { IsNumber } from "class-validator"
import { CreateHotelDto } from "./create.dto"

export class UpdateHotelDto extends CreateHotelDto {
  @IsNumber()
  hotel_id: number;
}