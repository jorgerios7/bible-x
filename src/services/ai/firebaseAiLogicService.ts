import { getGenerativeModel, type Content } from 'firebase/ai';

import { firebaseAI } from '../../firebase/config';
import type { ChatMessage, Verse } from '../../types';
import { nowIso } from '../../utils/date';
import { ragService } from './ragService';

type AnswerParams = {
  question: string;
  chatId: string;
  history?: ChatMessage[];
};

type AiLogicAnswer = {
  message: ChatMessage;
  sources: Verse[];
};

const MODEL_NAME = process.env.EXPO_PUBLIC_FIREBASE_AI_MODEL || 'gemini-3.5-flash';

const SYSTEM_INSTRUCTION = [
  'Você é o assistente de estudos bíblicos do Bible X.',
  'Responda em português do Brasil, com tom pastoral, claro e respeitoso.',
  'Use o contexto bíblico local quando ele for fornecido e cite as referências relevantes.',
  'Se o contexto local não for suficiente, diga isso com honestidade e sugira como aprofundar o estudo.',
].join(' ');

const createId = () => `${Date.now()}-assistant-${Math.random().toString(36).slice(2, 8)}`;

const cleanAiText = (value: string) => value.replace(/[<>]/g, '').trim();

const toFirebaseHistory = (messages: ChatMessage[] = []): Content[] =>
  messages
    .filter((message) => message.role === 'user' || message.role === 'assistant')
    .filter((message) => message.content.trim() && !message.id.startsWith('welcome-'))
    .slice(-12)
    .map((message) => {
      const role: Content['role'] = message.role === 'assistant' ? 'model' : 'user';

      return {
        role,
        parts: [{ text: message.content }],
      };
    });

const buildPrompt = (question: string, sourceText: string) =>
  [
    'Pergunta do usuário:',
    question,
    'Contexto bíblico local encontrado no app:',
    sourceText || 'Nenhuma passagem local foi encontrada para esta pergunta.',
    'Monte uma resposta em formato de estudo curto. Inclua observação, aplicação prática e, quando possível, referências.',
  ].join('\n\n');

class FirebaseAiLogicService {
  private model = getGenerativeModel(firebaseAI, {
    model: MODEL_NAME,
    systemInstruction: SYSTEM_INSTRUCTION,
  });

  async answer({ question, chatId, history = [] }: AnswerParams): Promise<AiLogicAnswer> {
    const sources = ragService.getSources(question, 5);
    const sourceText = ragService.formatSources(sources, 5);

    try {
      const chat = this.model.startChat({
        history: toFirebaseHistory(history),
        generationConfig: {
          temperature: 0.35,
          maxOutputTokens: 900,
        },
      });
      const result = await chat.sendMessage(buildPrompt(question, sourceText));
      const content = cleanAiText(result.response.text());

      if (!content) {
        throw new Error('Firebase AI Logic returned an empty response.');
      }

      return {
        sources,
        message: {
          id: createId(),
          chatId,
          role: 'assistant',
          content,
          sources,
          createdAt: nowIso(),
        },
      };
    } catch (error) {
      console.warn('Firebase AI Logic request failed.', error);

      return {
        sources,
        message: {
          id: createId(),
          chatId,
          role: 'assistant',
          content: ragService.buildLocalStudyResponse(question, sources, {
            prefix:
              'Não consegui concluir a chamada ao Firebase AI Logic agora. Mantive um estudo local com as passagens encontradas:',
          }),
          sources,
          createdAt: nowIso(),
        },
      };
    }
  }
}

export const firebaseAiLogicService = new FirebaseAiLogicService();
