import { useEffect } from 'react';

import { firestoreService } from '../services/firebase/firestoreService';
import { useAuthStore } from '../store/authStore';
import { useFavoritesStore } from '../store/favoritesStore';
import type { FavoriteItem } from '../types';

export const useFavorites = () => {
  const userId = useAuthStore((state) => state.firebaseUser?.uid);
  const store = useFavoritesStore();

  useEffect(() => {
    if (!userId) {
      return;
    }

    firestoreService
      .getFavorites(userId)
      .then(store.setFavorites)
      .catch(() => undefined);
  }, [store.setFavorites, userId]);

  const addFavorite = async (favorite: FavoriteItem) => {
    store.addFavorite(favorite);

    if (userId) {
      await firestoreService.saveFavorite(userId, favorite);
    }
  };

  const removeFavorite = async (favoriteId: string) => {
    store.removeFavorite(favoriteId);

    if (userId) {
      await firestoreService.removeFavorite(userId, favoriteId);
    }
  };

  return {
    ...store,
    addFavorite,
    removeFavorite,
  };
};
