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
