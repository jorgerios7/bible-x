import { create } from 'zustand';

import type { BibleReference } from '../types';

type BibleState = {
  selectedBook: string;
  selectedChapter: number;
  recentReadings: BibleReference[];
  setSelection: (bookAbbrev: string, chapter: number) => void;
  pushRecent: (reference: BibleReference) => void;
};

export const useBibleStore = create<BibleState>((set) => ({
  selectedBook: 'jo',
  selectedChapter: 3,
  recentReadings: [],
  setSelection: (bookAbbrev, chapter) =>
    set({
      selectedBook: bookAbbrev,
      selectedChapter: chapter,
    }),
  pushRecent: (reference) =>
    set((state) => ({
      recentReadings: [
        reference,
        ...state.recentReadings.filter(
          (item) => !(item.bookAbbrev === reference.bookAbbrev && item.chapter === reference.chapter),
        ),
      ].slice(0, 8),
    })),
}));
