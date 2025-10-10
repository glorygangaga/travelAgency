import { create } from "zustand";
import { fetchUser } from "@/lib/auth";
import { User, UserStore } from "@/shared/types/user.types";

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  error: null,

  fetchUserData: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchUser();
      if (!data) throw new Error('Unauthorized');
      set({user: data});
    } catch(error: any) {
      set({error: error.message, user: null});
    } finally {
      set({loading: false});
    }
  },

  setUserData: (user: User) => {
    set({user})
  },

  logout: () => {
    set({user: null})
  }
}));
