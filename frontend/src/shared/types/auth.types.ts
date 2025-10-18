import { User } from "./user.types";

export type AuthTypeRequest = {
  email: string;
  password: string;
}

export type AuthRegisterTypeRequest = {
  confPassword: string;
} & AuthTypeRequest;


export type LoginActionType = {
  login?: string;
  password?: string;
  data?: AuthRegisterResponse;
  error?: {
    login?: string;
    password?: string;
    global?: {
      message: string,
      status: number;
    }
  }
};

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
