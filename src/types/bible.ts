export type Testament = 'old' | 'new';

export interface Verse {
  id: string;
  book: string;
  bookAbbrev: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface BibleBook {
  name: string;
  abbrev: string;
  file: string;
  testament: Testament;
  chapters: number;
}

export interface BibleChapter {
  book: BibleBook;
  chapter: number;
  verses: Verse[];
}

export interface BibleReference {
  book: string;
  bookAbbrev: string;
  chapter: number;
  verse?: number;
}

export interface SearchResult {
  verse: Verse;
  score: number;
  reason: string;
}
