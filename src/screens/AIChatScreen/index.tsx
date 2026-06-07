import { useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Text, View } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';

import { AppBackground } from '../../components/AppBackground';
import { colors } from '../../constants/colors';
import { ragService } from '../../services/ai/ragService';
import { firestoreService } from '../../services/firebase/firestoreService';
import { useAuthStore } from '../../store/authStore';
import type { ChatMessage } from '../../types';
import { nowIso } from '../../utils/date';
import { sanitizeText } from '../../utils/sanitize';
import { styles } from './styles';

const chatId = 'default-rag-chat';

const initialMessage: ChatMessage = {
  id: 'welcome',
  chatId,
  role: 'assistant',
  content: 'Faça uma pergunta sobre uma passagem, tema ou personagem bíblico. Eu busco textos relacionados antes de responder.',
  createdAt: nowIso(),
};

export const AIChatScreen = () => {
  const userId = useAuthStore((state) => state.firebaseUser?.uid);
  const listRef = useRef<FlatList<ChatMessage>>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [text, setText] = useState('');
  const [isSending, setSending] = useState(false);

  const sendMessage = async () => {
    const content = sanitizeText(text);

    if (!content) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      chatId,
      role: 'user',
      content,
      createdAt: nowIso(),
    };

    setText('');
    setMessages((current) => [...current, userMessage]);
    setSending(true);

    try {
      if (userId) {
        await firestoreService.saveMessage(userId, chatId, userMessage);
      }

      const answer = await ragService.answer(content, chatId);
      setMessages((current) => [...current, answer.message]);

      if (userId) {
        await firestoreService.saveMessage(userId, chatId, answer.message);
      }
    } finally {
      setSending(false);
      requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
    }
  };

  return (
    <AppBackground>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.header}>
          <Text style={styles.title}>IA Bible X</Text>
          <Text style={styles.subtitle}>RAG preparado com fontes bíblicas locais</Text>
        </View>
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.messages}
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
