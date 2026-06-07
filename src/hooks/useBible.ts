import { useQuery } from '@tanstack/react-query';

import { bibleService } from '../services/bible/bibleService';
import { useBibleStore } from '../store/bibleStore';

export const useBible = () => {
  const { selectedBook, selectedChapter, setSelection, pushRecent, recentReadings } = useBibleStore();

  const chapterQuery = useQuery({
    queryKey: ['bible-chapter', selectedBook, selectedChapter],
    queryFn: () => bibleService.getChapter(selectedBook, selectedChapter),
  });

  const selectChapter = (bookAbbrev: string, chapter: number) => {
    const book = bibleService.getBook(bookAbbrev);
    setSelection(book.abbrev, chapter);
    pushRecent({ book: book.name, bookAbbrev: book.abbrev, chapter });
  };

  return {
    books: bibleService.getBooks(),
    currentChapter: chapterQuery.data ?? bibleService.getChapter(selectedBook, selectedChapter),
    isLoading: chapterQuery.isLoading,
    recentReadings,
    selectChapter,
    nextChapter: () => {
      const next = bibleService.getAdjacentChapter(selectedBook, selectedChapter, 'next');
      selectChapter(next.bookAbbrev, next.chapter);
    },
    previousChapter: () => {
      const previous = bibleService.getAdjacentChapter(selectedBook, selectedChapter, 'previous');
      selectChapter(previous.bookAbbrev, previous.chapter);
    },
  };
};
