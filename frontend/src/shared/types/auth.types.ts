import { User } from "./user.types";

export type LoginActionType = {
  login?: string;
  password?: string;
  data?: any;
  error?: {
    login?: string;
    password?: string;
    global?: {
      message: string,
      status: number;
    }
  }
}

export type RegisterActionType = {
  login?: string;
  password?: string;
  confPassword?: string;
  data?: AuthRegisterResponse;
  error?: {
    login?: string;
    password?: string;
    confPassword?: string;
    global?: {
      message: string,
      status: number;
    }
  }
}

export type AuthRegisterResponse = {
  user: User;
  accessToken: string;
}

export enum EnumTokens {
  "ACCESS_TOKEN" = 'accessToken',
  "REFRESH_TOKEN" = 'refreshToken'
}