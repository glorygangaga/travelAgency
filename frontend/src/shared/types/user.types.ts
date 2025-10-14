enum ROLE {
  USER,
  MODERATOR,
  ADMIN
}

export interface User {
  user_id: string;
  name: string;
  email: string;
  role_id: ROLE,
  date: Date | null;
  fullname: string | null;
  passport_number: string | null;
  phone: string | null;
  token: string;
}

export interface UserStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  fetchUserData: () => Promise<void>;
  setUserData: (user: User) => void;
  logout: () => void;
}

export type UserTypeUpdate = {
  password?: string;
  fullname?: string;
  date?: Date;
  passport_number?: string;
  phone?: string;
}

export type UserTypeUpdateRequest = {
  password?: string;
  firstname?: string;
  lastname?: string;
  date?: Date;
  passport_number?: string;
  phone?: string;
}

export type updateUserActionType = {
  data?: User;
  error?: {
    global?: {
      message: string;
      status: number;
    },
  } & UserTypeUpdateRequest
} & UserTypeUpdateRequest;