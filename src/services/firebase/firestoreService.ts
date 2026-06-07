import { collection, deleteDoc, doc, getDocs, orderBy, query, setDoc } from 'firebase/firestore';

import { db } from '../../firebase/config';
import type { ChatMessage, FavoriteItem, Note, ReadingPlan } from '../../types';
import { sanitizeText } from '../../utils/sanitize';

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
    await setDoc(doc(db, 'users', userId, 'chats', chatId, 'messages', message.id), message);
    await setDoc(
      doc(db, 'users', userId, 'chats', chatId),
      {
        id: chatId,
        title: message.content.slice(0, 48),
        lastMessage: message.content.slice(0, 140),
        updatedAt: message.createdAt,
      },
      { merge: true },
    );
  },

  async saveReadingPlan(userId: string, plan: ReadingPlan) {
    await setDoc(doc(db, 'users', userId, 'readingPlans', plan.id), plan, { merge: true });
  },
};
