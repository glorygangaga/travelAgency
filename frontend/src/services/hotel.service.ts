import { axiosClassic, axiosWithAuth } from "@/api/interseptors";
import { createHotelType, getHotelWithCountryType, hotelType, hotelWithCountry, updateHotelType } from "@/shared/types/hotel.types";
import { options } from "@/shared/types/user.types";

class HotelService {
  private BASE_URL = "/hotel";

  async getHotels(pages: {pageNumber: number, pageSize: number}) {
    const response = await axiosClassic.get<getHotelWithCountryType>(this.BASE_URL, {params: pages});
    return response.data;
  }

  async getHotel(hotel_id: number) {
    const response = await axiosClassic.get<hotelWithCountry>(this.BASE_URL + `/${hotel_id}`);
    return response.data;
  }

  async createHotel(hotel: createHotelType) {
    const response = await axiosWithAuth.post<hotelType>(this.BASE_URL, hotel);
    return response.data;
  }

  async updateHotel(hotel: updateHotelType) {
    const response = await axiosWithAuth.put<hotelType>(this.BASE_URL, hotel);
    return response.data;
  }

  async deleteHotel(hotel_id: number) {
    const response = await axiosWithAuth.delete<hotelType>(this.BASE_URL + `/${hotel_id}`);
    return response.data;
  }

  async getCountriesForSelect() {
    const response = await axiosClassic.get<options[]>(this.BASE_URL + '/list/countires');
    return response.data;
  }

  async getHotelsByCountriesOptions(county_id: number) {
    const response = await axiosClassic.get<options[]>(this.BASE_URL + `/country/${county_id}`);
    return response.data;
  }
}

export const hotelService = new HotelService();