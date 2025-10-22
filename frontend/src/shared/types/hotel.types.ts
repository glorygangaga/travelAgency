export type hotelType = {
  hotel_id: number;
  country_id: number;
  hotel_name: string;
  category: string;
  description: string;
};

export type getHotelTypeResponse = hotelType[];

export type createHotelType = {
  country_id: number
  hotel_name: string
  category: string
  description: string
}

export type updateHotelType = {
  hotel_id: number;
} & createHotelType;