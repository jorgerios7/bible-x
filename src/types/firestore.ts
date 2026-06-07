import type { Verse } from './bible';

export interface UserStats {
  readingStreak: number;
  chaptersRead: number;
  minutesStudied: number;
  favoriteCount: number;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  stats: UserStats;
}

export type FavoriteKind = 'verse' | 'study' | 'chat';

export interface FavoriteItem {
  id: string;
  kind: FavoriteKind;
  title: string;
  subtitle?: string;
  verse?: Verse;
  createdAt: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  reference?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Study {
  id: string;
  title: string;
  category: 'Temático' | 'Personagem' | 'Livro';
  description: string;
  references: string[];
  estimatedMinutes: number;
}

export interface ReadingPlan {
  id: string;
  title: string;
  description: string;
  days: number;
  progress: number;
  passages: string[];
}

export type ChatRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  chatId: string;
  role: ChatRole;
  content: string;
  sources?: Verse[];
  createdAt: string;
}

export interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  createdAt: string;
  updatedAt: string;
}
