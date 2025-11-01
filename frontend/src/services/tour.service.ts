import { axiosClassic, axiosWithAuth } from "@/api/interseptors";
import { TourCreateType, TourListCountriesDesc, TourResponseType, TourType } from "@/shared/types/tour.types";
import { options } from "@/shared/types/user.types";

class TourService {
  private BASE_URL = '/tour';

  async getTours(pages: {pageNumber: number, pageSize: number}) {
    const response = await axiosClassic.get<TourResponseType>(this.BASE_URL, {params: pages});
    return response.data;
  }

  async getTour(tour_id: number) {
    const response = await axiosClassic.get<TourType>(this.BASE_URL + `/${tour_id}`);
    return response.data;
  }

  async createTour(tour: TourCreateType) {
    const response = await axiosWithAuth.post<TourType>(this.BASE_URL, tour);
    return response.data;
  }

  async updateTour(tour: TourType) {
    const response = await axiosWithAuth.put<TourType>(this.BASE_URL + `/${tour.tour_id}`, tour);
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
}

export const tourService = new TourService();