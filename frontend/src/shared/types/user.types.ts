export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  fetchUserData: () => Promise<void>;
}
