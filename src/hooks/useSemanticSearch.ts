import { useQuery } from '@tanstack/react-query';

import { bibleService } from '../services/bible/bibleService';

export const useSemanticSearch = (query: string) =>
  useQuery({
    queryKey: ['semantic-search', query],
    queryFn: () => bibleService.semanticSearch(query, 24),
    enabled: query.trim().length > 1,
  });
