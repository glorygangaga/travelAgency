import { axiosClassic, axiosWithAuth } from "@/api/interseptors";
import { approveReviewType, createReviewType, getReviewTypeResponse, ReviewType, updateReviewType } from "@/shared/types/reviews.types";

class ReviewService {
  private BASE_URL = '/review';

  async getReviewsByTour(tour_id: number, pages: {pageNumber: number, pageSize: number}) {
    const response = await axiosClassic.get<getReviewTypeResponse>(this.BASE_URL + `/${tour_id}`, {params: {
      ...pages
    }});
    return response.data;
  }

  async getReviewsByUser(pages: {pageNumber: number, pageSize: number}) {
    const response = await axiosWithAuth.get(this.BASE_URL, {params: pages});
    return response.data;
  }

  async getReviewByUser(review_id: number) {
    const response = await axiosWithAuth.get<ReviewType>(this.BASE_URL + `/user/${review_id}`);
    return response.data;
  }

  async createReview(review: createReviewType) {
    const response = await axiosWithAuth.post<ReviewType>(this.BASE_URL + '', review);
    return response.data;
  }

  async updateReview(review: updateReviewType) {
    const response = await axiosWithAuth.put<ReviewType>(this.BASE_URL, review);
    return response.data;
  }

  async approveReview(review: approveReviewType) {
    const response = await axiosWithAuth.put<ReviewType>(this.BASE_URL + '/approve', review);
    return response.data;
  }

  async deleteReview(review_id: number) {
    const response = await axiosWithAuth.delete<ReviewType>(this.BASE_URL + `/${review_id}`);
    return response.data;
  }
}

export const reviewService = new ReviewService();