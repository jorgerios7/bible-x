import { create } from 'zustand';

import type { FavoriteItem } from '../types';

type FavoritesState = {
  favorites: FavoriteItem[];
  setFavorites: (favorites: FavoriteItem[]) => void;
  addFavorite: (favorite: FavoriteItem) => void;
  removeFavorite: (favoriteId: string) => void;
  isFavorite: (favoriteId: string) => boolean;
};

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  setFavorites: (favorites) => set({ favorites }),
  addFavorite: (favorite) =>
    set((state) => ({
      favorites: [favorite, ...state.favorites.filter((item) => item.id !== favorite.id)],
    })),
  removeFavorite: (favoriteId) =>
    set((state) => ({
      favorites: state.favorites.filter((item) => item.id !== favoriteId),
    })),
  isFavorite: (favoriteId) => get().favorites.some((item) => item.id === favoriteId),
}));
