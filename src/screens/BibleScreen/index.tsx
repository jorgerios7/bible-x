import { useMemo, useState } from 'react';
import { Share, View } from 'react-native';
import { Portal } from 'react-native-paper';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { ScreenContainer } from '../../components/ScreenContainer';
import { SectionHeader } from '../../components/SectionHeader';
import { VerseCard } from './components/VerseCard';
import { useBible } from '../../hooks/useBible';
import { useFavorites } from '../../hooks/useFavorites';
import type { Verse } from '../../types';
import { nowIso } from '../../utils/date';
import { formatReference } from '../../utils/format';
import { BibleChapterPicker } from './components/BibleChapterPicker';
import { BibleToolbar } from './components/BibleToolbar';
import { styles } from './styles';
import { VerseEditorModal } from './components/VerseEditorModal.tsx';
import { SelectionBar } from './components/SelectionBar';

export const BibleScreen = () => {
  const { books, currentChapter, isLoading, selectChapter, nextChapter, previousChapter } = useBible();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedVerses, setSelectedVerses] = useState<Verse[]>([]);
  const [editorVisible, setEditorVisible] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const selectionMode = selectedVerses.length > 0;

  const selectedVerseIds = useMemo(
    () => new Set(selectedVerses.map((verse) => verse.id)),
    [selectedVerses],
  );

  const selectedVersesContent = useMemo(
    () =>
      selectedVerses
        .map((verse) => `${formatReference(verse.book, verse.chapter, verse.verse)}\n${verse.text}`)
        .join('\n\n'),
    [selectedVerses],
  );

  const getVerseFavoriteId = (verse: Verse) => `verse-${verse.id}`;

  const favoriteVerse = (verse: Verse) => {
    const favoriteId = getVerseFavoriteId(verse);

    if (isFavorite(favoriteId)) {
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

  const toggleFavorite = (verse: Verse) => {
    const favoriteId = getVerseFavoriteId(verse);

    if (isFavorite(favoriteId)) {
      removeFavorite(favoriteId).catch(() => undefined);
      return;
    }

    favoriteVerse(verse);
  };

  const favoriteSelectedVerses = () => {
    if (!selectedVerses.length) {
      return;
    }

    selectedVerses.forEach(favoriteVerse);
    setSelectedVerses([]);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 450);
  };

  const toggleVerseSelection = (verse: Verse) => {
    setSelectedVerses((current) =>
      current.some((selectedVerse) => selectedVerse.id === verse.id)
        ? current.filter((selectedVerse) => selectedVerse.id !== verse.id)
        : [...current, verse],
    );
  };

  const startVerseSelection = (verse: Verse) => {
    setSelectedVerses((current) =>
      current.some((selectedVerse) => selectedVerse.id === verse.id) ? current : [...current, verse],
    );
  };

  const shareSelectedVerses = () => {
    if (!selectedVerses.length) {
      return;
    }

    Share.share({
      title: `${selectedVerses.length} versículo(s) selecionado(s)`,
      message: selectedVersesContent,
    })
      .then(() => setSelectedVerses([]))
      .catch(() => undefined);
  };

  const shareEditorContent = () => {
    const content = editorContent.trim();

    if (!content) {
      return;
    }

    Share.share({
      title: 'Estudo Bible X',
      message: content,
    }).catch(() => undefined);
  };

  const openSelectedVersesEditor = () => {
    setEditorContent(selectedVersesContent);
    setEditorVisible(true);
  };

  const clearVerseSelection = () => {
    setSelectedVerses([]);
    setEditorVisible(false);
    setEditorContent('');
  };

  return (
    <ScreenContainer refreshing={refreshing} onRefresh={handleRefresh}>
      <SectionHeader
        title="Bíblia"
        subtitle="Toque e segure um versículo para selecionar e compartilhar passagens."
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

      <SelectionBar
        visible={selectionMode}
        input={selectedVerses}
        onClear={clearVerseSelection}
        onPressVersesEditor={openSelectedVersesEditor}
        onShareVerses={shareSelectedVerses}
        onFavoriteVerses={favoriteSelectedVerses}
      />

      {isLoading ? (
        <LoadingSkeleton rows={6} />
      ) : (
        <View style={styles.verses}>
          {currentChapter.verses.map((verse) => (
            <VerseCard
              key={verse.id}
              verse={verse}
              isFavorite={isFavorite(getVerseFavoriteId(verse))}
              onFavorite={toggleFavorite}
              onLongPress={() => startVerseSelection(verse)}
              onPress={() => toggleVerseSelection(verse)}
              selected={selectedVerseIds.has(verse.id)}
              selectionMode={selectionMode}
            />
          ))}
        </View>
      )}
      <Portal>
        <VerseEditorModal
          editorVisible={editorVisible}
          editorContent={editorContent}
          onChangeEditorContent={setEditorContent}
          onShare={shareEditorContent}
          onDismiss={() => setEditorVisible(false)}
        />
      </Portal>
    </ScreenContainer>
  );
};
