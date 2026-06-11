import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Text, View } from 'react-native';
import { ActivityIndicator, Divider, IconButton, Menu, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppBackground } from '../../components/AppBackground';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/layout';
import { firebaseAiLogicService } from '../../services/ai/firebaseAiLogicService';
import {
  chatSessionService,
  createChatId,
  createChatMessageId,
  createWelcomeMessage,
} from '../../services/firebase/chatSessionService';
import { useAuthStore } from '../../store/authStore';
import type { ChatMessage, ChatSession } from '../../types';
import { nowIso } from '../../utils/date';
import { sanitizeText } from '../../utils/sanitize';
import { styles } from './styles';

const truncateTitle = (value: string, maxLength = 34) =>
  value.length > maxLength ? `${value.slice(0, maxLength - 1)}...` : value;

const getSessionTitle = (session?: ChatSession) => session?.title || 'Novo estudo';

export const AIChatScreen = () => {
  const insets = useSafeAreaInsets();
  const userId = useAuthStore((state) => state.firebaseUser?.uid);
  const listRef = useRef<FlatList<ChatMessage>>(null);
  const hasLoadedSavedSessionRef = useRef(false);
  const [activeChatId, setActiveChatId] = useState(createChatId);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [createWelcomeMessage(activeChatId)]);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [text, setText] = useState('');
  const [isSending, setSending] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isSessionsLoading, setSessionsLoading] = useState(false);
  const [isLoadingMessages, setLoadingMessages] = useState(false);
  const [sessionsError, setSessionsError] = useState<string | null>(null);

  const activeSession = useMemo(
    () => sessions.find((session) => session.id === activeChatId),
    [activeChatId, sessions],
  );

  const resetToNewChat = useCallback(() => {
    const nextChatId = createChatId();

    setActiveChatId(nextChatId);
    setMessages([createWelcomeMessage(nextChatId)]);
    setText('');
    setLoadingMessages(false);
    setMenuVisible(false);
  }, []);

  const loadSession = useCallback(
    async (chatId: string) => {
      if (!userId) {
        return;
      }

      setActiveChatId(chatId);
      setMenuVisible(false);
      setLoadingMessages(true);
      setSessionsError(null);

      try {
        const savedMessages = await chatSessionService.getMessages(userId, chatId);
        setMessages(savedMessages.length ? savedMessages : [createWelcomeMessage(chatId)]);
      } catch {
        setSessionsError('Não foi possível carregar este estudo agora.');
        setMessages([createWelcomeMessage(chatId)]);
      } finally {
        setLoadingMessages(false);
        requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: false }));
      }
    },
    [userId],
  );

  useEffect(() => {
    hasLoadedSavedSessionRef.current = false;
    setSessions([]);
    setSessionsError(null);

    if (!userId) {
      setSessionsLoading(false);
      resetToNewChat();
      return undefined;
    }

    setSessionsLoading(true);

    return chatSessionService.subscribeChatSessions(
      userId,
      (nextSessions) => {
        setSessions(nextSessions);
        setSessionsLoading(false);

        if (!hasLoadedSavedSessionRef.current && nextSessions.length) {
          hasLoadedSavedSessionRef.current = true;
          void loadSession(nextSessions[0].id);
        }
      },
      () => {
        setSessionsError('Não foi possível carregar os estudos salvos.');
        setSessionsLoading(false);
      },
    );
  }, [loadSession, resetToNewChat, userId]);

  const persistMessage = useCallback(
    async (message: ChatMessage, title?: string) => {
      if (!userId) {
        return;
      }

      try {
        await chatSessionService.saveMessage(userId, activeChatId, message, {
          title,
          createdAt: message.createdAt,
        });
      } catch {
        setSessionsError('A resposta apareceu, mas não consegui salvar o estudo no Firestore.');
      }
    },
    [activeChatId, userId],
  );

  const sendMessage = async () => {
    const content = sanitizeText(text);

    if (!content || isSending) {
      return;
    }

    const history = messages.filter((message) => !message.id.startsWith('welcome-'));
    const shouldCreateSession = Boolean(userId && !activeSession && !history.some((message) => message.role === 'user'));
    const userMessage: ChatMessage = {
      id: createChatMessageId('user'),
      chatId: activeChatId,
      role: 'user',
      content,
      createdAt: nowIso(),
    };

    setText('');
    setMessages((current) => [...current, userMessage]);
    setSending(true);
    setSessionsError(null);

    try {
      await persistMessage(userMessage, shouldCreateSession ? content : undefined);
      const answer = await firebaseAiLogicService.answer({
        question: content,
        chatId: activeChatId,
        history,
      });
      setMessages((current) => [...current, answer.message]);
      await persistMessage(answer.message);
    } catch {
      const errorMessage: ChatMessage = {
        id: createChatMessageId('assistant'),
        chatId: activeChatId,
        role: 'assistant',
        content: 'Não consegui responder agora. Tente novamente em instantes.',
        createdAt: nowIso(),
      };

      setMessages((current) => [...current, errorMessage]);
    } finally {
      setSending(false);
      requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
    }
  };

  return (
    <AppBackground>
      <KeyboardAvoidingView
        style={[
          styles.container,
          {
            paddingTop: spacing.lg + insets.top,
            paddingBottom: spacing.sm + insets.bottom,
            marginBottom: spacing.xl,
          },
        ]}
        behavior="padding"
      >
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerCopy}>
              <Text style={styles.title}>IA Bible X</Text>
              <Text style={styles.subtitle}>Firebase AI Logic com contexto bíblico local</Text>
              <Text style={styles.activeStudy} numberOfLines={1}>
                {getSessionTitle(activeSession)}
              </Text>
            </View>
            <Menu
              visible={isMenuVisible}
              onDismiss={() => setMenuVisible(false)}
              contentStyle={styles.menuContent}
              anchor={
                <IconButton
                  icon="menu"
                  mode="contained-tonal"
                  iconColor={colors.textPrimary}
                  containerColor={colors.surfaceSoft}
                  style={styles.headerMenuButton}
                  onPress={() => setMenuVisible(true)}
                />
              }
            >
              <Menu.Item leadingIcon="plus" title="Novo estudo" onPress={resetToNewChat} />
              <Divider />
              {isSessionsLoading ? <Menu.Item leadingIcon="progress-clock" title="Carregando..." disabled /> : null}
              {!isSessionsLoading && !userId ? (
                <Menu.Item leadingIcon="account-lock" title="Entre para ver estudos" disabled />
              ) : null}
              {!isSessionsLoading && userId && !sessions.length ? (
                <Menu.Item leadingIcon="history" title="Nenhum estudo salvo" disabled />
              ) : null}
              {sessions.map((session) => (
                <Menu.Item
                  key={session.id}
                  leadingIcon={session.id === activeChatId ? 'check' : 'history'}
                  title={truncateTitle(session.title)}
                  onPress={() => void loadSession(session.id)}
                />
              ))}
            </Menu>
          </View>
          {sessionsError ? (
            <Text selectable style={styles.errorText}>
              {sessionsError}
            </Text>
          ) : null}
        </View>
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.messages}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
          ListHeaderComponent={
            isLoadingMessages ? (
              <View style={styles.loadingState}>
                <ActivityIndicator color={colors.primary} />
                <Text style={styles.stateText}>Carregando estudo...</Text>
              </View>
            ) : null
          }
          ListFooterComponent={
            isSending ? (
              <View style={[styles.bubble, styles.assistantBubble, styles.pendingBubble]}>
                <ActivityIndicator color={colors.primary} />
                <Text style={styles.messageText}>Pensando...</Text>
              </View>
            ) : null
          }
          renderItem={({ item }) => (
            <View style={[styles.bubble, item.role === 'user' ? styles.userBubble : styles.assistantBubble]}>
              <Text selectable style={styles.messageText}>
                {item.content}
              </Text>
            </View>
          )}
        />
        <View style={styles.composer}>
          <TextInput
            mode="outlined"
            value={text}
            onChangeText={setText}
            placeholder="Pergunte sobre João 3, fé, ansiedade..."
            multiline
            textColor={colors.textPrimary}
            outlineColor={colors.border}
            activeOutlineColor={colors.primary}
            style={styles.input}
            outlineStyle={styles.inputOutline}
          />
          <IconButton
            icon={isSending ? 'progress-clock' : 'send'}
            mode="contained"
            containerColor={colors.primary}
            iconColor={colors.textPrimary}
            disabled={isSending}
            onPress={sendMessage}
          />
        </View>
      </KeyboardAvoidingView>
    </AppBackground>
  );
};
