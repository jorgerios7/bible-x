import { StyleSheet } from 'react-native';

import { colors } from '../../constants/colors';
import { radius, spacing } from '../../constants/layout';
import { typography } from '../../theme';

export const styles = StyleSheet.create({
  selectionBar: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: 'rgba(30, 136, 255, 0.14)',
  },
  selectionCounter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  selectionCount: {
    ...typography.label,
    flex: 1,
    color: colors.textPrimary,
    fontSize: 14,
    fontVariant: ['tabular-nums'],
  },
  cancelSelectionButton: {
    width: 34,
    height: 34,
    margin: 0,
  },
  selectionActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  selectionActionButton: {
    width: 40,
    height: 40,
    margin: 0,
  },
  verses: {
    gap: 0,
  },
});
