import { axiosWithAuth } from "@/api/interseptors";
import { getAllUsersType,  User,  UserTypeResponse, UserTypeUpdateRequest } from "@/shared/types/user.types";

class UserService {
  private BASE_URL = '/user/profile';

  async getProfile() {
    const response = await axiosWithAuth.get<UserTypeResponse>(this.BASE_URL);
    return response.data;
  }

  async update(data: UserTypeUpdateRequest) {
    const response = await axiosWithAuth.put<User>(this.BASE_URL, data);
    return response.data;
  }

  async getAllUsers(pages: {pageNumber: number, pageSize: number}) {
    const response = await axiosWithAuth.get<getAllUsersType>('/user/all', {params: pages});
    return response.data;
  }

  async getRole() {
    const response = await axiosWithAuth<null | "admin" | 'user' | 'manager'>('/user/role');
    return response.data;
  }
};

export const userService = new UserService();