import { axiosWithAuth } from "@/api/interseptors";
import { getBookingsTypeResponse, getReviewsTypeResponse, ROLE, User, UserTypeUpdateRequest } from "@/shared/types/user.types";

class UserService {
  private BASE_URL = '/user/profile';

  async getProfile() {
    const response = await axiosWithAuth.get<User>(this.BASE_URL);
    return response.data;
  }

  async update(data: UserTypeUpdateRequest) {
    const response = await axiosWithAuth.put<User>(this.BASE_URL, data);
    return response.data;
  }

  async getBookings() {
    const response = await axiosWithAuth.get<getBookingsTypeResponse>('/user/booking');
    return response;
  }

  async getReviews() {
    const response = await axiosWithAuth.get<getReviewsTypeResponse>('/user/review');
    return response;
  }
};

export const userService = new UserService();