import { collection, deleteDoc, doc, getDocs, orderBy, query, setDoc } from 'firebase/firestore';

import { db } from '../../firebase/config';
import type { ChatMessage, FavoriteItem, Note, ReadingPlan } from '../../types';
import { sanitizeText } from '../../utils/sanitize';
import { chatSessionService } from './chatSessionService';

export const firestoreService = {
  async saveFavorite(userId: string, favorite: FavoriteItem) {
    await setDoc(doc(db, 'users', userId, 'favorites', favorite.id), favorite, { merge: true });
  },

  async removeFavorite(userId: string, favoriteId: string) {
    await deleteDoc(doc(db, 'users', userId, 'favorites', favoriteId));
  },

  async getFavorites(userId: string): Promise<FavoriteItem[]> {
    const snapshot = await getDocs(
      query(collection(db, 'users', userId, 'favorites'), orderBy('createdAt', 'desc')),
    );

    return snapshot.docs.map((item) => item.data() as FavoriteItem);
  },

  async saveNote(userId: string, note: Note) {
    const payload = {
      ...note,
      title: sanitizeText(note.title),
      content: sanitizeText(note.content),
    };

    await setDoc(doc(db, 'users', userId, 'notes', note.id), payload, { merge: true });
  },

  async saveMessage(userId: string, chatId: string, message: ChatMessage) {
    await chatSessionService.saveMessage(userId, chatId, message, {
      title: message.role === 'user' ? message.content : undefined,
      createdAt: message.createdAt,
    });
  },

  async saveReadingPlan(userId: string, plan: ReadingPlan) {
    await setDoc(doc(db, 'users', userId, 'readingPlans', plan.id), plan, { merge: true });
  },
};
