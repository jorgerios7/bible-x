import { StyleSheet } from 'react-native';

import { colors } from '../../constants/colors';
import { radius, spacing } from '../../constants/layout';
import { typography } from '../../theme';

export const styles = StyleSheet.create({
  categoryRow: {
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
    color: colors.textPrimary,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  titleGroup: {
    flex: 1,
    gap: spacing.xs,
  },
  cardTitle: {
    ...typography.title,
    fontSize: 20,
  },
  meta: {
    ...typography.subtitle,
    color: colors.primary,
  },
  description: {
    ...typography.subtitle,
    lineHeight: 22,
  },
  references: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  referenceChip: {
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  referenceText: {
    ...typography.label,
    fontSize: 12,
    color: colors.textSecondary,
  },
});
