import { useState } from 'react';
import { Text, View } from 'react-native';
import { Chip } from 'react-native-paper';

import { EmptyState } from '../../components/EmptyState';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { ScreenContainer } from '../../components/ScreenContainer';
import { SearchInput } from '../../components/SearchInput';
import { SectionHeader } from '../../components/SectionHeader';
import { VerseCard } from '../../components/VerseCard';
import { colors } from '../../constants/colors';
import { useFavorites } from '../../hooks/useFavorites';
import { useSemanticSearch } from '../../hooks/useSemanticSearch';
import type { Verse } from '../../types';
import { nowIso } from '../../utils/date';
import { styles } from './styles';

const suggestions = ['João 3:16', 'fé', 'ansiedade', 'sabedoria', 'perdão', 'amor'];

export const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const { data = [], isFetching } = useSemanticSearch(query);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const toggleFavorite = (verse: Verse) => {
    const id = `verse-${verse.id}`;

    if (isFavorite(id)) {
      removeFavorite(id).catch(() => undefined);
      return;
    }

    addFavorite({
      id,
      kind: 'verse',
      title: `${verse.book} ${verse.chapter}:${verse.verse}`,
      subtitle: verse.text,
      verse,
      createdAt: nowIso(),
    }).catch(() => undefined);
  };

  return (
    <ScreenContainer>
      <SectionHeader title="Pesquisa" subtitle="Busque por livro, capítulo, versículo, palavra-chave ou tema." />
      <SearchInput value={query} onChangeText={setQuery} placeholder="Ex.: João 3:16, graça, ansiedade" />
      <View style={styles.suggestions}>
        {suggestions.map((item) => (
          <Chip
            key={item}
            onPress={() => setQuery(item)}
            style={styles.chip}
            textStyle={styles.chipText}
            selected={query === item}
            selectedColor={colors.textPrimary}
          >
            {item}
          </Chip>
        ))}
      </View>

      {query.trim().length < 2 ? (
        <EmptyState
          icon="text-search"
          title="Comece uma busca"
          description="A pesquisa combina referência bíblica, palavras e busca semântica local."
        />
      ) : isFetching ? (
        <LoadingSkeleton rows={5} />
      ) : data.length ? (
        <>
          <Text style={styles.resultCount}>{data.length} resultados relacionados</Text>
          {data.map((result) => (
            <VerseCard
              key={result.verse.id}
              verse={result.verse}
              isFavorite={isFavorite(`verse-${result.verse.id}`)}
              onFavorite={toggleFavorite}
            />
          ))}
        </>
      ) : (
        <EmptyState
          icon="magnify-close"
          title="Nada encontrado"
          description="Tente uma referência como Romanos 8 ou um tema como fé, perdão ou sabedoria."
        />
      )}
    </ScreenContainer>
  );
};
