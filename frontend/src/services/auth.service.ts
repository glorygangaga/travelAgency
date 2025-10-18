import { axiosClassic } from "@/api/interseptors";
import { AuthRegisterResponse, AuthTypeRequest } from "@/shared/types/auth.types";
import { removeAccessToken, saveAccessToken } from "./auth-token.service";

class AuthService {
  async main(type: 'login' | 'register', data: AuthTypeRequest) {
    const response = await axiosClassic.post<AuthRegisterResponse>(
      `/auth/${type}`,
      data
    );

    if (response.data.accessToken) saveAccessToken(response.data.accessToken);
    return response.data;
  }

  async getNewTokens() {
    const response = await axiosClassic.post<AuthRegisterResponse>(`/auth/login/access-token`);

    if (response.data.accessToken) saveAccessToken(response.data.accessToken);
    return response;
  }

  async logout() {
    const response = await axiosClassic.post<boolean>(`/auth/logout`);
    if (response) removeAccessToken();
    return response;
  }
};

export const authService = new AuthService();