import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  type Unsubscribe,
} from 'firebase/firestore';

import { db } from '../../firebase/config';
import { chatsPath, messagesPath } from '../../firebase/firestorePaths';
import type { ChatMessage, ChatRole, ChatSession } from '../../types';
import { nowIso } from '../../utils/date';
import { sanitizeText } from '../../utils/sanitize';

type SaveMessageOptions = {
  title?: string;
  createdAt?: string;
};

const FALLBACK_SESSION_TITLE = 'Estudo sem título';
const WELCOME_MESSAGE =
  'Faça uma pergunta sobre uma passagem, tema ou personagem bíblico. Eu busco textos relacionados antes de responder.';

export const createChatId = () => `chat-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const createChatMessageId = (role: ChatRole) =>
  `${Date.now()}-${role}-${Math.random().toString(36).slice(2, 8)}`;

export const createWelcomeMessage = (chatId: string): ChatMessage => ({
  id: `welcome-${chatId}`,
  chatId,
  role: 'assistant',
  content: WELCOME_MESSAGE,
  createdAt: nowIso(),
});

const truncate = (value: string, maxLength: number) => value.slice(0, maxLength).trim();

const isChatRole = (role: unknown): role is ChatRole =>
  role === 'user' || role === 'assistant' || role === 'system';

const normalizeSession = (id: string, data: Partial<ChatSession>): ChatSession => {
  const updatedAt = typeof data.updatedAt === 'string' ? data.updatedAt : nowIso();
  const createdAt = typeof data.createdAt === 'string' ? data.createdAt : updatedAt;
  const title = typeof data.title === 'string' && data.title.trim() ? data.title : FALLBACK_SESSION_TITLE;

  return {
    id: typeof data.id === 'string' && data.id.trim() ? data.id : id,
    title,
    lastMessage: typeof data.lastMessage === 'string' ? data.lastMessage : '',
    createdAt,
    updatedAt,
  };
};

const normalizeMessage = (id: string, data: Partial<ChatMessage>): ChatMessage | null => {
  if (!isChatRole(data.role) || typeof data.content !== 'string') {
    return null;
  }

  return {
    id: typeof data.id === 'string' && data.id.trim() ? data.id : id,
    chatId: typeof data.chatId === 'string' ? data.chatId : '',
    role: data.role,
    content: data.content,
    sources: Array.isArray(data.sources) ? data.sources : undefined,
    createdAt: typeof data.createdAt === 'string' ? data.createdAt : nowIso(),
  };
};

class ChatSessionService {
  subscribeChatSessions(
    userId: string,
    onNext: (sessions: ChatSession[]) => void,
    onError?: (error: Error) => void,
  ): Unsubscribe {
    const sessionsQuery = query(collection(db, chatsPath(userId)), orderBy('updatedAt', 'desc'));

    return onSnapshot(
      sessionsQuery,
      (snapshot) => {
        onNext(snapshot.docs.map((item) => normalizeSession(item.id, item.data() as Partial<ChatSession>)));
      },
      (error) => onError?.(error),
    );
  }

  async getMessages(userId: string, chatId: string): Promise<ChatMessage[]> {
    const messagesQuery = query(collection(db, messagesPath(userId, chatId)), orderBy('createdAt', 'asc'));
    const snapshot = await getDocs(messagesQuery);

    return snapshot.docs
      .map((item) => normalizeMessage(item.id, item.data() as Partial<ChatMessage>))
      .filter((message): message is ChatMessage => message !== null)
      .map((message) => ({ ...message, chatId }));
  }

  async saveMessage(
    userId: string,
    chatId: string,
    message: ChatMessage,
    options: SaveMessageOptions = {},
  ) {
    const content = message.role === 'user' ? sanitizeText(message.content) : message.content.trim();
    const safeMessage = {
      ...message,
      content,
    };

    const sessionPayload: Partial<ChatSession> = {
      id: chatId,
      lastMessage: truncate(content, 140),
      updatedAt: message.createdAt,
    };

    if (options.title) {
      sessionPayload.title = truncate(sanitizeText(options.title), 48) || FALLBACK_SESSION_TITLE;
      sessionPayload.createdAt = options.createdAt ?? message.createdAt;
    }

    await setDoc(doc(db, messagesPath(userId, chatId), message.id), safeMessage);
    await setDoc(doc(db, chatsPath(userId), chatId), sessionPayload, { merge: true });
  }
}

export const chatSessionService = new ChatSessionService();
