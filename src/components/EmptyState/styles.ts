import { StyleSheet } from 'react-native';

import { colors } from '../../constants/colors';
import { spacing } from '../../constants/layout';
import { typography } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xl,
  },
  title: {
    ...typography.title,
    fontSize: 18,
    textAlign: 'center',
  },
  description: {
    ...typography.subtitle,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
