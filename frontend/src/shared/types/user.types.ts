export enum ROLE {
  USER = "user",
  MODERATOR = "manager",
  ADMIN = "admin"
}

export enum ROLE_ID {
  USER = 1,
  ADMIN,
  MODERATOR,
}

export interface User {
  user_id: string;
  name: string;
  email: string;
  role_id: ROLE_ID,
  date: string | null;
  fullname: string | null;
  passport_number: string | null;
  phone: string | null;
  token: string;
}

export interface UserStore {
  user: User | null;
  loading: boolean;
  error: string | null;
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
  date?: string;
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
  } & UserTypeUpdateRequest & {date?: string}
} & UserTypeUpdateRequest;

export type getReviewsTypeResponse = {
  user_id: number;
  created_at: Date;
  tour_id: number;
  review_id: number;
  rating: number;
  comment: string;
  is_approved: boolean;
}[];