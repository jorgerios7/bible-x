import { useMemo } from 'react';

import { useAuthStore } from '../store/authStore';
import { useBibleStore } from '../store/bibleStore';
import { useFavoritesStore } from '../store/favoritesStore';

export const useReadingStats = () => {
  const profile = useAuthStore((state) => state.profile);
  const recentReadings = useBibleStore((state) => state.recentReadings);
  const favorites = useFavoritesStore((state) => state.favorites);

  return useMemo(
    () => [
      {
        label: 'Sequência',
        value: profile?.stats.readingStreak ?? Math.max(1, recentReadings.length),
        colorIndex: 0,
      },
      {
        label: 'Capítulos',
        value: profile?.stats.chaptersRead ?? recentReadings.length,
        colorIndex: 1,
      },
      {
        label: 'Favoritos',
        value: favorites.length,
        colorIndex: 2,
      },
      {
        label: 'Minutos',
        value: profile?.stats.minutesStudied ?? recentReadings.length * 8,
        colorIndex: 4,
      },
    ],
    [favorites.length, profile, recentReadings.length],
  );
};
