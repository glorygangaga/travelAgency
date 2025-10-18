import { create } from "zustand";
import { User, UserStore } from "@/shared/types/user.types";

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  error: null,

  setUserData: (user: User) => {
    set({user})
  },

  logout: () => {
    set({user: null})
  }
}));
