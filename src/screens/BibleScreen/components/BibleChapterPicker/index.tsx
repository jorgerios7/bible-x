import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, Chip, Menu } from 'react-native-paper';

import { colors } from '../../../../constants/colors';
import type { BibleBook } from '../../../../types';
import { styles } from './styles';

type BibleChapterPickerProps = {
  books: BibleBook[];
  selectedBook: BibleBook | null;
  selectedChapter: number | null;
  onSelectBook: (bookAbbrev: string) => void;
  onSelect: (bookAbbrev: string, chapter: number) => void;
};

export const BibleChapterPicker = ({
  books,
  selectedBook,
  selectedChapter,
  onSelectBook,
  onSelect,
}: BibleChapterPickerProps) => {
  const [bookMenuVisible, setBookMenuVisible] = useState(false);
  const [chapterMenuVisible, setChapterMenuVisible] = useState(false);
  const chapters = selectedBook ? Array.from({ length: selectedBook.chapters }, (_, index) => index + 1) : [];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Menu
          visible={bookMenuVisible}
          onDismiss={() => setBookMenuVisible(false)}
          contentStyle={styles.menu}
          anchor={
            <Button
              mode="outlined"
              icon="book-open-page-variant-outline"
              textColor={colors.textPrimary}
              style={styles.button}
              onPress={() => setBookMenuVisible(true)}
            >
              {selectedBook?.name ?? 'Selecionar livro'}
            </Button>
          }
        >
          <ScrollView style={styles.menuScroll}>
            {books.map((book) => (
              <Menu.Item
                key={book.abbrev}
                title={book.name}
                onPress={() => {
                  onSelectBook(book.abbrev);
                  setBookMenuVisible(false);
                  setChapterMenuVisible(false);
                }}
              />
            ))}
          </ScrollView>
        </Menu>
        <Menu
          visible={chapterMenuVisible}
          onDismiss={() => setChapterMenuVisible(false)}
          contentStyle={styles.menu}
          anchor={
            <Button
              mode="outlined"
              icon="format-list-numbered"
              textColor={selectedBook ? colors.textPrimary : colors.textSecondary}
              style={styles.chapterButton}
              disabled={!selectedBook}
              onPress={() => setChapterMenuVisible(true)}
            >
              {selectedChapter ?? 'Capítulo'}
            </Button>
          }
        >
          <ScrollView style={styles.menuScroll}>
            {chapters.map((chapter) => (
              <Menu.Item
                key={chapter}
                title={`Capítulo ${chapter}`}
                onPress={() => {
                  if (selectedBook) {
                    onSelect(selectedBook.abbrev, chapter);
                  }

                  setChapterMenuVisible(false);
                }}
              />
            ))}
          </ScrollView>
        </Menu>
      </View>
      {selectedBook ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {chapters.slice(0, 20).map((chapter) => (
            <Chip
              key={chapter}
              selected={chapter === selectedChapter}
              showSelectedOverlay={false}
              selectedColor={colors.textPrimary}
              style={[styles.chip, chapter === selectedChapter && styles.selectedChip]}
              textStyle={styles.chipText}
              onPress={() => onSelect(selectedBook.abbrev, chapter)}
            >
              {chapter}
            </Chip>
          ))}
          {chapters.length > 20 ? <Text style={styles.moreText}>+{chapters.length - 20}</Text> : null}
        </ScrollView>
      ) : null}
    </View>
  );
};
