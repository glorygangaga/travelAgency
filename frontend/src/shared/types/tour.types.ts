export enum FoodEnum {
  RO = "RO",
  BB = "BB",
  HB = "HB",
  FB = "FB",
  AI = "AI"
}

export type TourType = {
  hotel_id: string;
  country_id: string;
  description: string;
  tour_id: number;
  title: string;
  start_date: string;
  end_date: string;
  duration_days: number;
  tour_type: string;
  food_type: FoodEnum;
  price_person: number;
  available_slots: number;
}

export type TourTypeRes = {
  country: {
    country_name: string;
  };
  hotel: {
    hotel_name: string;
  };
} & TourType;

export type TourResponseType = {
  tours: TourTypeRes[]
  total: number;
}

export type FoodType = {
  value: string;
  id: number,
  exitValue: FoodEnum
}[]

export type TourCreateType = {
  title: string;
  hotel_id: string;
  country_id: string;
  start_date: string;
  end_date: string;
  food_type: FoodEnum;
  tour_type: string;
  price_person: number;
  available_slots: number;
  description: string;
}

export type TourListCountriesDesc = {
  country_id: number;
  description: string;
  country_name: string;
}[];