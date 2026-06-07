import { StyleSheet } from 'react-native';

import { colors } from '../../constants/colors';
import { radius, spacing } from '../../constants/layout';
import { typography } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.md,
  },
  mark: {
    width: 82,
    height: 82,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.xl,
  },
  markText: {
    ...typography.title,
    fontSize: 28,
    color: colors.textPrimary,
  },
  markTextSmall: {
    fontSize: 18,
  },
  textGroup: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  name: {
    ...typography.title,
    fontSize: 32,
  },
  nameSmall: {
    fontSize: 22,
  },
  subtitle: {
    ...typography.subtitle,
    fontSize: 14,
  },
});
