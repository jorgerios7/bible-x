import { StyleSheet } from 'react-native';

import { colors } from '../../constants/colors';
import { spacing } from '../../constants/layout';
import { typography } from '../../theme';

export const styles = StyleSheet.create({
  card: {
    gap: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  reference: {
    ...typography.label,
    flex: 1,
    color: colors.primary,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    ...typography.body,
    fontSize: 16,
    lineHeight: 25,
    color: colors.textPrimary,
  },
});
