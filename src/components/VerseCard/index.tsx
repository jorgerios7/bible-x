import { Share, Text, View } from 'react-native';
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
};

export const VerseCard = ({ verse, isFavorite, onFavorite, onPress }: VerseCardProps) => {
  const reference = formatReference(verse.book, verse.chapter, verse.verse);

  const shareVerse = () => {
    Share.share({
      title: reference,
      message: `${reference}\n\n${verse.text}`,
    }).catch(() => undefined);
  };

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
