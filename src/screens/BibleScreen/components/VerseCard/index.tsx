import { Pressable, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { styles } from './styles';
import { Verse } from '@/types';
import { colors } from '@/constants/colors';

type VerseCardProps = {
  verse: Verse;
  isFavorite?: boolean;
  onFavorite?: (verse: Verse) => void;
  onPress?: () => void;
  onLongPress?: () => void;
  selected?: boolean;
  selectionMode?: boolean;
};

export const VerseCard = ({
  verse,
  isFavorite,
  onFavorite,
  onPress,
  onLongPress,
  selected,
  selectionMode,
}: VerseCardProps) => {

  return (
    <View style={[styles.readerCard, isFavorite && styles.readerCardFavorite]}>
      <Pressable
        delayLongPress={300}
        onLongPress={onLongPress}
        onPress={selectionMode ? onPress : undefined}
        style={({ pressed }) => [styles.readerPressable, pressed && styles.readerPressed]}
      >
        <View style={styles.readerLine}>
          <Text style={[styles.verseNumber, selected && styles.verseNumberSelected]}>{verse.verse}</Text>
          <Text style={[styles.readerText, selected && styles.readerTextSelected]}>{verse.text}</Text>
        </View>
      </Pressable>
      {isFavorite && (
        <View style={styles.readerFavorite}>
          <IconButton
            icon={isFavorite ? 'heart' : 'heart-outline'}
            iconColor={isFavorite ? colors.accentRed : colors.textDisabled}
            size={18}
            onPress={() => onFavorite?.(verse)}
          />
        </View>
      )}
    </View>
  );
};
