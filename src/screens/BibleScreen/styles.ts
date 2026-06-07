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
  editorModalWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    margin: 0,
  },
  editorModal: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
  },
  editorKeyboardContainer: {
    flex: 1,
    gap: spacing.md,
  },
  editorHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  editorTitleGroup: {
    flex: 1,
    gap: spacing.xs,
  },
  editorTitle: {
    ...typography.title,
    fontSize: 20,
  },
  editorSubtitle: {
    ...typography.subtitle,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  editorInput: {
    flex: 1,
    minHeight: 120,
    backgroundColor: 'rgba(15, 23, 42, 0.64)',
    textAlignVertical: 'top',
  },
  editorInputContent: {
    paddingTop: spacing.lg,
  },
  editorInputOutline: {
    borderRadius: radius.lg,
  },
  editorActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
});
