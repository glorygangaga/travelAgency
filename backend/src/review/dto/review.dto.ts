import { IsNumber, IsString, Max, Min } from "class-validator";

export class ReviewDto {
  @IsNumber()
  tour_id: number;

  @IsNumber()
  @Max(5)
  @Min(1)
  rating: number;

  @IsString()
  comment: string;
}