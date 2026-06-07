import { useState } from 'react';

import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { ScreenContainer } from '../../components/ScreenContainer';
import { SectionHeader } from '../../components/SectionHeader';
import { VerseCard } from '../../components/VerseCard';
import { useBible } from '../../hooks/useBible';
import { useFavorites } from '../../hooks/useFavorites';
import type { Verse } from '../../types';
import { nowIso } from '../../utils/date';
import { BibleChapterPicker } from './components/BibleChapterPicker';
import { BibleToolbar } from './components/BibleToolbar';

export const BibleScreen = () => {
  const { books, currentChapter, isLoading, selectChapter, nextChapter, previousChapter } = useBible();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [refreshing, setRefreshing] = useState(false);

  const toggleFavorite = (verse: Verse) => {
    const favoriteId = `verse-${verse.id}`;

    if (isFavorite(favoriteId)) {
      removeFavorite(favoriteId).catch(() => undefined);
      return;
    }

    addFavorite({
      id: favoriteId,
      kind: 'verse',
      title: `${verse.book} ${verse.chapter}:${verse.verse}`,
      subtitle: verse.text,
      verse,
      createdAt: nowIso(),
    }).catch(() => undefined);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 450);
  };

  return (
    <ScreenContainer refreshing={refreshing} onRefresh={handleRefresh}>
      <SectionHeader
        title="Bíblia"
        subtitle="Selecione livros e capítulos, favorite versículos e compartilhe passagens."
      />
      <BibleChapterPicker
        books={books}
        selectedBook={currentChapter.book}
        selectedChapter={currentChapter.chapter}
        onSelect={selectChapter}
      />
      <BibleToolbar
        title={`${currentChapter.book.name} ${currentChapter.chapter}`}
        onPrevious={previousChapter}
        onNext={nextChapter}
      />
      {isLoading ? (
        <LoadingSkeleton rows={6} />
      ) : (
        currentChapter.verses.map((verse) => (
          <VerseCard
            key={verse.id}
            verse={verse}
            isFavorite={isFavorite(`verse-${verse.id}`)}
            onFavorite={toggleFavorite}
          />
        ))
      )}
    </ScreenContainer>
  );
};
