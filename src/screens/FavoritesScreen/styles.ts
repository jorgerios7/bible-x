import { StyleSheet } from 'react-native';

import { colors } from '../../constants/colors';
import { spacing } from '../../constants/layout';
import { typography } from '../../theme';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  textGroup: {
    flex: 1,
    gap: spacing.xs,
  },
  kind: {
    ...typography.label,
    color: colors.primary,
    textTransform: 'uppercase',
    fontSize: 11,
  },
  title: {
    ...typography.title,
    fontSize: 18,
  },
  subtitle: {
    ...typography.subtitle,
    lineHeight: 20,
  },
});
