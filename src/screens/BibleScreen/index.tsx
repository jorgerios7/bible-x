import { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Share, Text, View } from 'react-native';
import { Button, IconButton, Modal, Portal, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { ScreenContainer } from '../../components/ScreenContainer';
import { SectionHeader } from '../../components/SectionHeader';
import { VerseCard } from '../../components/VerseCard';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/layout';
import { useBible } from '../../hooks/useBible';
import { useFavorites } from '../../hooks/useFavorites';
import type { Verse } from '../../types';
import { nowIso } from '../../utils/date';
import { formatReference } from '../../utils/format';
import { BibleChapterPicker } from './components/BibleChapterPicker';
import { BibleToolbar } from './components/BibleToolbar';
import { styles } from './styles';

export const BibleScreen = () => {
  const insets = useSafeAreaInsets();
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
      {selectionMode ? (
        <View style={styles.selectionBar}>
          <View style={styles.selectionCounter}>
            <Text style={styles.selectionCount}>
              {selectedVerses.length} {selectedVerses.length === 1 ? 'versículo selecionado' : 'versículos selecionados'}
            </Text>
            <IconButton
              icon="close-circle-outline"
              accessibilityLabel="Cancelar seleção"
              iconColor={colors.textSecondary}
              size={22}
              style={styles.cancelSelectionButton}
              onPress={clearVerseSelection}
            />
          </View>
          <View style={styles.selectionActions}>
            <IconButton
              icon="note-edit-outline"
              accessibilityLabel="Editar versículos selecionados"
              mode="contained"
              containerColor="rgba(255,255,255,0.10)"
              iconColor={colors.textPrimary}
              size={22}
              style={styles.selectionActionButton}
              onPress={openSelectedVersesEditor}
            />
            <IconButton
              icon="share-variant"
              accessibilityLabel="Compartilhar versículos selecionados"
              mode="contained"
              containerColor={colors.primary}
              iconColor={colors.textPrimary}
              size={22}
              style={styles.selectionActionButton}
              onPress={shareSelectedVerses}
            />
          </View>
        </View>
      ) : null}
      {isLoading ? (
        <LoadingSkeleton rows={6} />
      ) : (
        <View style={styles.verses}>
          {currentChapter.verses.map((verse) => (
            <VerseCard
              key={verse.id}
              verse={verse}
              isFavorite={isFavorite(`verse-${verse.id}`)}
              onFavorite={toggleFavorite}
              onLongPress={() => startVerseSelection(verse)}
              onPress={() => toggleVerseSelection(verse)}
              selected={selectedVerseIds.has(verse.id)}
              selectionMode={selectionMode}
              variant="reader"
            />
          ))}
        </View>
      )}
      <Portal>
        <Modal
          visible={editorVisible}
          onDismiss={() => setEditorVisible(false)}
          style={styles.editorModalWrapper}
          contentContainerStyle={[
            styles.editorModal,
            {
              paddingTop: spacing.lg + insets.top,
              paddingBottom: spacing.lg + insets.bottom,
            },
          ]}
        >
          <KeyboardAvoidingView
            behavior={process.env.EXPO_OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={0}
            style={styles.editorKeyboardContainer}
          >
            <View style={styles.editorHeader}>
              <View style={styles.editorTitleGroup}>
                <Text style={styles.editorTitle}>Editor de versículos</Text>
                <Text style={styles.editorSubtitle}>Escreva notas, organize o texto e compartilhe quando quiser.</Text>
              </View>
              <IconButton
                icon="close"
                accessibilityLabel="Fechar editor"
                iconColor={colors.textSecondary}
                onPress={() => setEditorVisible(false)}
              />
            </View>
            <TextInput
              mode="outlined"
              value={editorContent}
              onChangeText={setEditorContent}
              multiline
              textColor={colors.textPrimary}
              outlineColor={colors.border}
              activeOutlineColor={colors.primary}
              placeholder="Escreva suas notas junto dos versículos selecionados..."
              placeholderTextColor={colors.textDisabled}
              style={styles.editorInput}
              contentStyle={styles.editorInputContent}
              outlineStyle={styles.editorInputOutline}
            />
            <View style={styles.editorActions}>
              <Button mode="text" textColor={colors.textSecondary} onPress={() => setEditorVisible(false)}>
                Fechar
              </Button>
              <Button
                mode="contained"
                icon="share-variant"
                buttonColor={colors.primary}
                textColor={colors.textPrimary}
                onPress={shareEditorContent}
              >
                Compartilhar
              </Button>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </Portal>
    </ScreenContainer>
  );
};
