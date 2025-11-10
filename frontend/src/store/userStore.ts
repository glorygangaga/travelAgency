import { create } from "zustand";
import { User, UserStore, UserTypeResponse } from "@/shared/types/user.types";

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  error: null,
  favorites: [],

  setUserData: (user: UserTypeResponse) => {
    set({user})
  },

  logout: () => {
    set({user: null})
  },

  handleFavorite(tour_id: number) {
    set((state) => {
      const favorites = state.favorites;
      const isIn = favorites.findIndex(fav => fav === tour_id);
      if (isIn === -1) favorites.push(tour_id);
      else favorites.splice(isIn, 1)
      localStorage.setItem('favorites', JSON.stringify(favorites));
      return {...state, favorites};
    })
  },

  getFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '') as number[];
    set({favorites});
  }
}));
