import { axiosClassic, axiosWithAuth } from "@/api/interseptors";
import { FullTourData, TourCreateType, TourListCountriesDesc, TourResponseType, TourType } from "@/shared/types/tour.types";
import { options } from "@/shared/types/user.types";

class TourService {
  private BASE_URL = '/tour';

  async getTours(pages: {pageNumber: number, pageSize: number}) {
    const response = await axiosClassic.get<TourResponseType>(this.BASE_URL, {params: pages});
    return response.data;
  }

  async getTour(tour_id: number) {
    const response = await axiosClassic.get<TourType & {reviews: any[]}>(this.BASE_URL + `/${tour_id}`);
    return response.data;
  }

  async getFullTour(tour_id: number) {
    const response = await axiosClassic.get<FullTourData>(this.BASE_URL + `/full/${tour_id}`);
    return response.data;
  }

  async createTour(tour: TourCreateType) {
    const response = await axiosWithAuth.post<TourType>(this.BASE_URL, tour);
    return response.data;
  }

  async updateTour(tour: TourType) {
    const response = await axiosWithAuth.put<TourType>(this.BASE_URL, tour);
    return response.data;
  }

  async deleteTour(tour_id: number) {
    const response = await axiosWithAuth.delete<TourType>(this.BASE_URL + `/${tour_id}`);
    return response.data;
  }

  async getHotelsForSelect() {
    const response = await axiosClassic.get<options[]>(this.BASE_URL + '/list/hotels');
    return response.data
  }

  async getCountiesByDesc(total: number) {
    const response = await axiosClassic.get<TourListCountriesDesc>(this.BASE_URL + `/list/country/most/${total}`);
    return response.data;
  }

  async getToursByCountry({country_id, pageNumber, pageSize}: {country_id: number, pageNumber: number, pageSize: number}) {
    const response = await axiosClassic.get<TourResponseType>(this.BASE_URL + `/country/${country_id}`, {params: {pageNumber, pageSize}});
    return response.data;
  }

  async getToursByQuery({country_id, query}: { country_id: number; query: string }) {
    let data: { country_id?: number; q?: string } = {q: query, country_id};
    if (country_id === -1) data.country_id = undefined;
    if (!query) data.q = undefined;
    const response = await axiosClassic.get<FullTourData[]>(this.BASE_URL + '/search', {params: data});
    return response.data;
  }

  async getToursByHotelId({hotel_id, pageNumber, pageSize}: {hotel_id: number, pageNumber: number, pageSize: number}) {
    const response = await axiosClassic.get<TourResponseType>(this.BASE_URL + `/hotel/${hotel_id}`, {params: {pageNumber, pageSize}});
    return response.data;
  }
}

export const tourService = new TourService();