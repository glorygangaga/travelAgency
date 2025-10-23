import { axiosClassic, axiosWithAuth } from "@/api/interseptors";
import { countryType, createCountryType, getCountryTypeResponse } from "@/shared/types/country.types";

class CountryService {
  private BASE_URL = '/country';

  async getCountries(pages: {pageNumber: number, pageSize: number}) {
    const response = await axiosClassic.get<getCountryTypeResponse>(this.BASE_URL, {params: pages});
    return response.data;
  }

  async getCountry(country_id: number) {
    const response = await axiosClassic.get<countryType>(this.BASE_URL + `/${country_id}`);
    return response.data;
  }

  async createCountry(country: createCountryType) {
    const response = await axiosWithAuth.post<countryType>(this.BASE_URL, country);
    return response.data;
  }

  async updateCountry(country: countryType) {
    const response = await axiosWithAuth.put<countryType>(this.BASE_URL, country);
    return response.data;
  }

  async deleteCountry(country_id: number) {
    const response = await axiosWithAuth.delete<countryType>(this.BASE_URL + `/${country_id}`);
    return response.data;
  } 
}

export const countryService = new CountryService();