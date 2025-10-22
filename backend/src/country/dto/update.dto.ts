import { IsNumber, IsString } from "class-validator"

export class UpdateCountryDto {
  @IsNumber()
  country_id: number

  @IsString()
  country_name: string

  @IsString()
  description: string
}