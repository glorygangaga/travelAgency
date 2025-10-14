import { AuthRegisterResponse, AuthTypeRequest, EnumTokens } from "@/shared/types/auth.types";
import { User, UserTypeUpdate } from "@/shared/types/user.types";
import { cookies } from "next/headers";

export class ApiError extends Error {
  status: number;
  cause?: unknown;

  constructor(message: string, status: number, cause?: unknown) {
    super(message);
    this.status = status;
    this.cause = cause;
  }
}

class ApiClient {
  private BASE_URL = process.env.NEXT_PUBLIC_API_URL + '/api';
  private REVALIDATE_URL = '/auth/login/access-token';

  private async getAccessToken() {
    const cookie = await cookies();
    return cookie.get(EnumTokens.ACCESS_TOKEN)?.value;
  }

  private async setCookie(name: string, data: string) {
    const cookie = await cookies();
    cookie.set(name, data, {
      path: '/',
      sameSite: 'lax',
    });
  }

  private async refreshAccessToken(): Promise<boolean> {
    try {
      const res = await fetch(`${this.BASE_URL}${this.REVALIDATE_URL}`, {
        method: 'POST',
        credentials: 'include'
      });

      if (!res.ok) return false;
      const data = await res.json();
      this.setCookie(EnumTokens.ACCESS_TOKEN, data.accessToken);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  private async request<TRes, Tbody = unknown>(url: string, options: RequestInit & {body?: Tbody}, retry = true): Promise<TRes> {
    const headers = new Headers(options.headers || {});
    headers.set('Content-Type', 'application/json');
    const accessToken = await this.getAccessToken();
    if (accessToken) headers.set('Authorization',`Bearer ${accessToken}`);

    const preparedBody =
    options.body && typeof options.body !== 'string'
      ? JSON.stringify(options.body)
      : options.body;

    const res = await fetch(`${this.BASE_URL}${url}`, {
      ...options,
      body: preparedBody as BodyInit, 
      headers,
      credentials: 'include'
    });

    if (res.status === 401 && retry)
    {
      const updated = await this.refreshAccessToken();
      if (updated) this.request(url, options, retry = false);
    }

    const data = await res.json();

    if (!res.ok)
      throw new ApiError(data.message || res.statusText, res.status);

    return data as Promise<TRes>;
  }

  auth = {
    DEFAULT_URL: '/auth',
    logout: () => this.request<boolean>(this.auth.DEFAULT_URL + '/logout', {method: "POST"}),
    login: ({ login, password }: AuthTypeRequest) => this.request<AuthRegisterResponse>(
      this.auth.DEFAULT_URL + '/login',
      {method: 'POST', body: JSON.stringify({ email: login, password })}
    ),
    register: ({login, password}: AuthTypeRequest) => this.request<AuthRegisterResponse>(
      this.auth.DEFAULT_URL + '/register',
      {method: 'POST', body: JSON.stringify({ email: login, password })}
    ),
  }
  user = {
    DEFAULT_URL: "/user",
    profile: () => this.request<AuthRegisterResponse>(this.user.DEFAULT_URL + '/profile', {method: "GET"}),
    profileUpdate: (body: UserTypeUpdate) => this.request<User>(
      this.user.DEFAULT_URL + '/profile', {
        method: 'PUT',
        body: JSON.stringify(body)
      }
    )
  }
}

export const api = new ApiClient;