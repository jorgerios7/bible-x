import { StyleSheet } from 'react-native';

import { colors } from '../../constants/colors';
import { radius } from '../../constants/layout';

export const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.glass,
  },
  outline: {
    borderRadius: radius.lg,
  },
});
