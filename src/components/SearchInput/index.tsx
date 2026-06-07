import { TextInput } from 'react-native-paper';

import { colors } from '../../constants/colors';
import { styles } from './styles';

type SearchInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
};

export const SearchInput = ({ value, onChangeText, placeholder = 'Buscar' }: SearchInputProps) => (
  <TextInput
    mode="outlined"
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    left={<TextInput.Icon icon="magnify" color={colors.textSecondary} />}
    textColor={colors.textPrimary}
    placeholderTextColor={colors.textDisabled}
    outlineColor={colors.border}
    activeOutlineColor={colors.primary}
    style={styles.input}
    outlineStyle={styles.outline}
  />
);
