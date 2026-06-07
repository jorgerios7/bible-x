import { StyleSheet } from 'react-native';

import { colors } from '../../constants/colors';
import { spacing } from '../../constants/layout';
import { typography } from '../../theme';

export const styles = StyleSheet.create({
  settingRow: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  textGroup: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    ...typography.label,
    fontSize: 16,
  },
  description: {
    ...typography.subtitle,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
