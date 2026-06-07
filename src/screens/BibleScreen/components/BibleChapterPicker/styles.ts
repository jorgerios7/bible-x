import { StyleSheet } from 'react-native';

import { colors } from '../../../../constants/colors';
import { radius, spacing } from '../../../../constants/layout';
import { typography } from '../../../../theme';

export const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  button: {
    flex: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.glass,
  },
  chapterButton: {
    minWidth: 92,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.glass,
  },
  menu: {
    maxHeight: 420,
    backgroundColor: colors.surface,
  },
  menuScroll: {
    maxHeight: 360,
  },
  chips: {
    gap: spacing.xs,
    alignItems: 'center',
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.glass,
  },
  selectedChip: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(30,136,255,0.25)',
  },
  chipText: {
    ...typography.label,
    fontSize: 13,
  },
  moreText: {
    ...typography.subtitle,
    paddingHorizontal: spacing.sm,
  },
});
