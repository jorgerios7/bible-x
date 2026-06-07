import { bibleFiles, type BibleFileKey } from '../../data/bibleFiles';
import { bibleIndex } from '../../data/bibleIndex';
import { chapterCounts } from '../../data/chapterCounts';
import type { BibleBook, BibleChapter, BibleReference, SearchResult, Verse } from '../../types';
import { getDaySeed } from '../../utils/date';
import { formatReference } from '../../utils/format';
import { normalizeText } from '../../utils/sanitize';

type RawBibleBook = {
  book: string;
  abbrev: string;
  chapters: Record<string, { verse: Record<string, string> }>;
};

const asRawBook = (file: BibleFileKey) => bibleFiles[file] as RawBibleBook;

class BibleService {
  private allVersesCache: Verse[] | null = null;

  getBooks(): BibleBook[] {
    return bibleIndex.map((book) => {
      const raw = asRawBook(book.file);
      const chapters = chapterCounts[book.abbrev] ?? Object.keys(raw.chapters).length;

      return {
        ...book,
        chapters,
      };
    });
  }

  getBook(bookAbbrev: string): BibleBook {
    const book = this.getBooks().find((item) => item.abbrev === bookAbbrev);

    if (!book) {
      return this.getBooks()[0];
    }

    return book;
  }

  getChapter(bookAbbrev: string, chapter: number): BibleChapter {
    const book = this.getBook(bookAbbrev);
    const raw = asRawBook(book.file as BibleFileKey);
    const safeChapter = Math.min(Math.max(chapter, 1), book.chapters);
    const rawVerses = raw.chapters[String(safeChapter)]?.verse ?? {};

    const verses = Object.entries(rawVerses).map(([verseNumber, text]) => ({
      id: `${book.abbrev}-${safeChapter}-${verseNumber}`,
      book: book.name,
      bookAbbrev: book.abbrev,
      chapter: safeChapter,
      verse: Number(verseNumber),
      text,
    }));

    return {
      book,
      chapter: safeChapter,
      verses,
    };
  }

  getVerse(reference: BibleReference): Verse | undefined {
    const chapter = this.getChapter(reference.bookAbbrev, reference.chapter);

    if (!reference.verse) {
      return chapter.verses[0];
    }

    return chapter.verses.find((verse) => verse.verse === reference.verse);
  }

  getAllVerses(): Verse[] {
    if (this.allVersesCache) {
      return this.allVersesCache;
    }

    this.allVersesCache = this.getBooks().flatMap((book) => {
      const chapters = Array.from({ length: book.chapters }, (_, index) => index + 1);

      return chapters.flatMap((chapter) => this.getChapter(book.abbrev, chapter).verses);
    });

    return this.allVersesCache;
  }

  getVerseOfDay(): Verse {
    const verses = this.getAllVerses();
    const index = getDaySeed() % verses.length;

    return verses[index];
  }

  getAdjacentChapter(bookAbbrev: string, chapter: number, direction: 'previous' | 'next') {
    const books = this.getBooks();
    const currentBookIndex = books.findIndex((book) => book.abbrev === bookAbbrev);
    const currentBook = books[currentBookIndex] ?? books[0];

    if (direction === 'previous') {
      if (chapter > 1) {
        return { bookAbbrev: currentBook.abbrev, chapter: chapter - 1 };
      }

      const previousBook = books[currentBookIndex - 1];
      return previousBook
        ? { bookAbbrev: previousBook.abbrev, chapter: previousBook.chapters }
        : { bookAbbrev: currentBook.abbrev, chapter };
    }

    if (chapter < currentBook.chapters) {
      return { bookAbbrev: currentBook.abbrev, chapter: chapter + 1 };
    }

    const nextBook = books[currentBookIndex + 1];
    return nextBook
      ? { bookAbbrev: nextBook.abbrev, chapter: 1 }
      : { bookAbbrev: currentBook.abbrev, chapter };
  }

  search(query: string, limit = 40): SearchResult[] {
    const normalizedQuery = normalizeText(query);

    if (normalizedQuery.length < 2) {
      return [];
    }

    const terms = normalizedQuery.split(' ').filter(Boolean);
    const books = this.getBooks();

    return this.getAllVerses()
      .map((verse) => {
        const searchable = normalizeText(
          `${verse.book} ${verse.bookAbbrev} ${verse.chapter} ${verse.verse} ${verse.text}`,
        );
        const book = books.find((item) => item.abbrev === verse.bookAbbrev);
        const bookMatch = book ? normalizeText(`${book.name} ${book.abbrev}`) : '';
        const exactReference = normalizeText(formatReference(verse.book, verse.chapter, verse.verse));

        let score = 0;

        if (exactReference.includes(normalizedQuery)) {
          score += 18;
        }

        if (bookMatch.includes(normalizedQuery)) {
          score += 8;
        }

        terms.forEach((term) => {
          if (searchable.includes(term)) {
            score += 2;
          }

          if (verse.text.length > 0 && normalizeText(verse.text).includes(term)) {
            score += 4;
          }
        });

        return {
          verse,
          score,
          reason: score > 12 ? 'Referência direta' : score > 5 ? 'Alta relevância textual' : 'Termo relacionado',
        };
      })
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  semanticSearch(query: string, limit = 8): SearchResult[] {
    const themes: Record<string, string[]> = {
      amor: ['amor', 'amou', 'caridade', 'misericordia', 'graca'],
      fe: ['fe', 'crer', 'cre', 'confiar', 'esperanca'],
      ansiedade: ['temor', 'ansiedade', 'descanso', 'paz', 'cuidado'],
      perdao: ['perdoar', 'perdoou', 'pecado', 'confessar', 'misericordia'],
      sabedoria: ['sabedoria', 'entendimento', 'prudencia', 'conselho'],
    };

    const normalized = normalizeText(query);
    const expandedTerms = Object.entries(themes)
      .filter(([theme]) => normalized.includes(theme))
      .flatMap(([, terms]) => terms);

    const expandedQuery = [query, ...expandedTerms].join(' ');

    return this.search(expandedQuery, limit);
  }
}

export const bibleService = new BibleService();
