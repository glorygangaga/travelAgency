import { IsBoolean, IsNumber } from "class-validator";

export class ApproveReviewDto {
  @IsNumber()
  review_id: number;

  @IsBoolean()
  is_approved: boolean;
}