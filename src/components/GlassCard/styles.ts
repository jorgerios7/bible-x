import { StyleSheet } from 'react-native';

import { colors } from '../../constants/colors';
import { radius, spacing } from '../../constants/layout';

export const styles = StyleSheet.create({
  card: {
    gap: spacing.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: radius.lg,
    backgroundColor: colors.glass,
    overflow: 'hidden',
  },
  pressableCard: {
    flex: 1,
  },
});
