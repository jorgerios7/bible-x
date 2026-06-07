import { StyleSheet } from 'react-native';

import { colors } from '../../constants/colors';
import { radius, spacing } from '../../constants/layout';
import { typography } from '../../theme';

export const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    gap: spacing.lg,
  },
  header: {
    gap: spacing.sm,
  },
  title: {
    ...typography.title,
    fontSize: 30,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.subtitle,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  input: {
    backgroundColor: colors.glass,
  },
  inputOutline: {
    borderRadius: radius.lg,
  },
});
