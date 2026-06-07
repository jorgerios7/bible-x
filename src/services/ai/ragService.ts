import type { ChatMessage, Verse } from '../../types';
import { nowIso } from '../../utils/date';
import { formatReference } from '../../utils/format';
import { sanitizeText } from '../../utils/sanitize';
import { bibleService } from '../bible/bibleService';

type RagAnswer = {
  message: ChatMessage;
  sources: Verse[];
};

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

class RagService {
  async answer(question: string, chatId = 'local-chat'): Promise<RagAnswer> {
    const safeQuestion = sanitizeText(question);
    const sources = bibleService.semanticSearch(safeQuestion, 5).map((result) => result.verse);
    const sourceText = sources
      .slice(0, 3)
      .map((verse) => `${formatReference(verse.book, verse.chapter, verse.verse)}: ${verse.text}`)
      .join('\n\n');

    const content = [
      `Aqui vai um caminho de estudo para a sua pergunta: "${safeQuestion}".`,
      sourceText
        ? `\nPassagens relacionadas:\n${sourceText}`
        : '\nNão encontrei uma referência direta no índice local, mas posso ajudar a refinar a busca por tema, livro ou palavra-chave.',
      '\n\nArquitetura preparada para RAG: busca semântica local -> versículos relacionados -> chamada segura a um backend com OpenAI -> resposta final com fontes. A chamada ao modelo deve ficar em backend/API, não no app cliente.',
    ].join('');

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
  }
}

export const ragService = new RagService();
