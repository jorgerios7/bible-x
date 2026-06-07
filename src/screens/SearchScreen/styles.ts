import { StyleSheet } from 'react-native';

import { colors } from '../../constants/colors';
import { spacing } from '../../constants/layout';
import { typography } from '../../theme';

export const styles = StyleSheet.create({
  suggestions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.glass,
  },
  chipText: {
    ...typography.label,
    fontSize: 13,
  },
  resultCount: {
    ...typography.subtitle,
    color: colors.textSecondary,
  },
});
