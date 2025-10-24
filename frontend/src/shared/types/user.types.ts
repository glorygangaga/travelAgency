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

export const RoleNames: Record<ROLE_ID, string> = {
  [ROLE_ID.USER]: 'User',
  [ROLE_ID.ADMIN]: 'Admin',
  [ROLE_ID.MODERATOR]: 'Manager',
};


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

export type UserTypeResponse = {
  user_id: number;
  role_id: number;
  email: string;
  fullname: string | null;
  date: Date | null;
  passport_number: string | null;
  phone: string | null;
  created_at: Date;
  updated_at: Date;
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

export type GetUserByAdmin = {
  user_id: number;
  role_id: ROLE_ID;
  email: string;
  fullname: string | null;
  date: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export type getAllUsersType = {
  users: GetUserByAdmin[],
  total: number
}

export type createUserByAdminType = {
  email: string;
  password: string;
  role_id: ROLE;
}

export type options = {
  id: number,
  value: string,
  exitValue: any
}