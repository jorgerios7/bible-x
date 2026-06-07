import { Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';

import { colors } from '../../../../constants/colors';
import { styles } from './styles';

type BibleToolbarProps = {
  title: string;
  onPrevious: () => void;
  onNext: () => void;
};

export const BibleToolbar = ({ title, onPrevious, onNext }: BibleToolbarProps) => (
  <View style={styles.container}>
    <IconButton icon="chevron-left" iconColor={colors.textPrimary} size={28} onPress={onPrevious} />
    <Text style={styles.title}>{title}</Text>
    <IconButton icon="chevron-right" iconColor={colors.textPrimary} size={28} onPress={onNext} />
  </View>
);
