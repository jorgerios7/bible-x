import { Pressable, Share, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';

import { colors } from '../../constants/colors';
import type { Verse } from '../../types';
import { formatReference } from '../../utils/format';
import { GlassCard } from '../GlassCard';
import { styles } from './styles';

type VerseCardProps = {
  verse: Verse;
  isFavorite?: boolean;
  onFavorite?: (verse: Verse) => void;
  onPress?: () => void;
  onLongPress?: () => void;
  selected?: boolean;
  selectionMode?: boolean;
  variant?: 'card' | 'reader';
};

export const VerseCard = ({
  verse,
  isFavorite,
  onFavorite,
  onPress,
  onLongPress,
  selected,
  selectionMode,
  variant = 'card',
}: VerseCardProps) => {
  const reference = formatReference(verse.book, verse.chapter, verse.verse);

  const shareVerse = () => {
    Share.share({
      title: reference,
      message: `${reference}\n\n${verse.text}`,
    }).catch(() => undefined);
  };

  if (variant === 'reader') {
    return (
      <View style={[styles.readerCard, selected && styles.readerCardSelected]}>
        <Pressable
          delayLongPress={850}
          onLongPress={onLongPress}
          onPress={selectionMode ? onPress : undefined}
          style={({ pressed }) => [styles.readerPressable, pressed && styles.readerPressed]}
        >
          <View style={styles.readerLine}>
            <Text style={[styles.verseNumber, selected && styles.verseNumberSelected]}>{verse.verse}</Text>
            <Text style={[styles.readerText, selected && styles.readerTextSelected]}>{verse.text}</Text>
          </View>
        </Pressable>
        <IconButton
          icon={isFavorite ? 'heart' : 'heart-outline'}
          iconColor={isFavorite ? colors.accentRed : colors.textDisabled}
          size={18}
          style={styles.readerFavorite}
          onPress={() => onFavorite?.(verse)}
        />
      </View>
    );
  }

  return (
    <GlassCard onPress={onPress} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.reference}>{reference}</Text>
        <View style={styles.actions}>
          <IconButton
            icon={isFavorite ? 'heart' : 'heart-outline'}
            iconColor={isFavorite ? colors.accentRed : colors.textSecondary}
            size={22}
            onPress={() => onFavorite?.(verse)}
          />
          <IconButton icon="share-variant" iconColor={colors.textSecondary} size={22} onPress={shareVerse} />
        </View>
      </View>
      <Text selectable style={styles.text}>
        {verse.text}
      </Text>
    </GlassCard>
  );
};
