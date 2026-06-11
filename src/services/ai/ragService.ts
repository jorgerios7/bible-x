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
  getSources(question: string, limit = 5): Verse[] {
    const safeQuestion = sanitizeText(question);

    return bibleService.semanticSearch(safeQuestion, limit).map((result) => result.verse);
  }

  formatSources(sources: Verse[], limit = 3): string {
    return sources
      .slice(0, limit)
      .map((verse) => `${formatReference(verse.book, verse.chapter, verse.verse)}: ${verse.text}`)
      .join('\n\n');
  }

  buildLocalStudyResponse(
    question: string,
    sources: Verse[],
    options: { prefix?: string } = {},
  ): string {
    const safeQuestion = sanitizeText(question);
    const sourceText = this.formatSources(sources, 3);

    return [
      options.prefix ?? `Aqui vai um caminho de estudo para a sua pergunta: "${safeQuestion}".`,
      sourceText
        ? `\nPassagens relacionadas:\n${sourceText}`
        : '\nNão encontrei uma referência direta no índice local, mas posso ajudar a refinar a busca por tema, livro ou palavra-chave.',
      '\n\nSugestão: observe o contexto da passagem, procure palavras repetidas e transforme a leitura em uma oração prática.',
    ].join('');
  }

  async answer(question: string, chatId = 'local-chat'): Promise<RagAnswer> {
    const sources = this.getSources(question, 5);

    const content = this.buildLocalStudyResponse(question, sources);

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
