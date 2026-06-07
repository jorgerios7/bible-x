import { StyleSheet } from 'react-native';

import { colors } from '../../constants/colors';
import { spacing } from '../../constants/layout';
import { typography } from '../../theme';

export const styles = StyleSheet.create({
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  profileText: {
    flex: 1,
    gap: spacing.xs,
  },
  name: {
    ...typography.title,
    fontSize: 21,
  },
  email: {
    ...typography.subtitle,
    color: colors.textSecondary,
  },
  cardTitle: {
    ...typography.title,
    fontSize: 19,
  },
  menuRow: {
    minHeight: 66,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  menuText: {
    flex: 1,
    gap: spacing.xs,
  },
  menuTitle: {
    ...typography.label,
    fontSize: 16,
  },
  menuDescription: {
    ...typography.subtitle,
    color: colors.textSecondary,
  },
});
