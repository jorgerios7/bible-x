import { create } from 'zustand';

import type { BibleReference } from '../types';

type BibleState = {
  selectedBook: string | null;
  selectedChapter: number | null;
  recentReadings: BibleReference[];
  setBook: (bookAbbrev: string) => void;
  setSelection: (bookAbbrev: string, chapter: number) => void;
  pushRecent: (reference: BibleReference) => void;
};

export const useBibleStore = create<BibleState>((set) => ({
  selectedBook: null,
  selectedChapter: null,
  recentReadings: [],
  setBook: (bookAbbrev) =>
    set({
      selectedBook: bookAbbrev,
      selectedChapter: null,
    }),
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
