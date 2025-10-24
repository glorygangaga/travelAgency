export type hotelType = {
  hotel_id: number;
  country_id: string;
  hotel_name: string;
  category: string;
  description: string;
};

export type hotelWithCountry = {
  country: {
    country_name: string,
  } 
} & hotelType;

export type getHotelWithCountryType = {
  hotel:  hotelWithCountry[]
  total: number

};

export type getHotelTypeResponse = {
  hotel: hotelType[],
  total: number
};

export type createHotelType = {
  country_id: string
  hotel_name: string
  category: string
  description: string
}

export type updateHotelType = {
  hotel_id: number;
} & createHotelType;