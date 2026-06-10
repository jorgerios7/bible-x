import { useQuery } from '@tanstack/react-query';

import { bibleService } from '../services/bible/bibleService';
import { useBibleStore } from '../store/bibleStore';

export const useBible = () => {
  const { selectedBook, selectedChapter, setBook, setSelection, pushRecent, recentReadings } = useBibleStore();
  const hasChapterSelection = selectedBook !== null && selectedChapter !== null;

  const chapterQuery = useQuery({
    queryKey: ['bible-chapter', selectedBook, selectedChapter],
    queryFn: () => {
      if (!hasChapterSelection) {
        throw new Error('Cannot load a Bible chapter without a selected reference.');
      }

      return bibleService.getChapter(selectedBook, selectedChapter);
    },
    enabled: hasChapterSelection,
  });

  const selectBook = (bookAbbrev: string) => {
    const book = bibleService.getBook(bookAbbrev);
    setBook(book.abbrev);
  };

  const selectChapter = (bookAbbrev: string, chapter: number) => {
    const book = bibleService.getBook(bookAbbrev);
    setSelection(book.abbrev, chapter);
    pushRecent({ book: book.name, bookAbbrev: book.abbrev, chapter });
  };

  const currentChapter = hasChapterSelection
    ? chapterQuery.data ?? bibleService.getChapter(selectedBook, selectedChapter)
    : null;

  return {
    books: bibleService.getBooks(),
    currentChapter,
    isLoading: chapterQuery.isLoading,
    recentReadings,
    selectedBook: selectedBook ? bibleService.getBook(selectedBook) : null,
    selectedChapter,
    selectBook,
    selectChapter,
    nextChapter: () => {
      if (!hasChapterSelection) {
        return;
      }

      const next = bibleService.getAdjacentChapter(selectedBook, selectedChapter, 'next');
      selectChapter(next.bookAbbrev, next.chapter);
    },
    previousChapter: () => {
      if (!hasChapterSelection) {
        return;
      }

      const previous = bibleService.getAdjacentChapter(selectedBook, selectedChapter, 'previous');
      selectChapter(previous.bookAbbrev, previous.chapter);
    },
  };
};
