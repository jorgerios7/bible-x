import { StyleSheet } from 'react-native';

import { colors } from '../../constants/colors';
import { radius, spacing } from '../../constants/layout';
import { typography } from '../../theme';

export const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    gap: spacing.xl,
  },
  header: {
    gap: spacing.sm,
  },
  title: {
    ...typography.title,
    fontSize: 28,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.subtitle,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  form: {
    gap: spacing.md,
  },
  input: {
    backgroundColor: colors.glass,
  },
  inputOutline: {
    borderRadius: radius.lg,
  },
});
