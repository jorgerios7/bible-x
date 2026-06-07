import { StyleSheet } from 'react-native';

import { colors } from '../../constants/colors';
import { radius, spacing } from '../../constants/layout';
import { typography } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.md,
    gap: spacing.md,
  },
  header: {
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
  messages: {
    gap: spacing.md,
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
