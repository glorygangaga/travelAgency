import { IsNumber } from "class-validator";

export class CreateBookingDto {
  
  @IsNumber()
  tour_id: number;

  @IsNumber()
  num_people: number;

  @IsNumber()
  total_price: number;
}