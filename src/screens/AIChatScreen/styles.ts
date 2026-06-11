import { StyleSheet } from 'react-native';

import { colors } from '../../constants/colors';
import { radius, spacing } from '../../constants/layout';
import { typography } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  header: {
    gap: spacing.xs,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  headerCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    ...typography.title,
    fontSize: 28,
  },
  subtitle: {
    ...typography.subtitle,
    color: colors.textSecondary,
  },
  activeStudy: {
    ...typography.label,
    fontSize: 12,
    color: colors.textSecondary,
  },
  headerMenuButton: {
    margin: 0,
  },
  menuContent: {
    maxWidth: 320,
    maxHeight: 420,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
  },
  stateText: {
    ...typography.label,
    fontSize: 12,
    color: colors.textSecondary,
  },
  errorText: {
    ...typography.label,
    fontSize: 12,
    color: colors.accentRed,
  },
  messages: {
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  loadingState: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  bubble: {
    maxWidth: '88%',
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(30,136,255,0.26)',
  },
  assistantBubble: {
    alignSelf: 'flex-start',
    backgroundColor: colors.glass,
  },
  messageText: {
    ...typography.body,
    lineHeight: 22,
  },
  pendingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    maxHeight: 130,
    backgroundColor: colors.glass,
  },
  inputOutline: {
    borderRadius: radius.lg,
  },
});
