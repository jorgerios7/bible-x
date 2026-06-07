import { StyleSheet } from 'react-native';

import { colors } from '../../constants/colors';
import { radius, spacing } from '../../constants/layout';
import { typography } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    height: 178,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
  },
  track: {
    width: '100%',
    height: 110,
    justifyContent: 'flex-end',
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.07)',
    overflow: 'hidden',
  },
  bar: {
    width: '100%',
    borderRadius: radius.pill,
  },
  value: {
    ...typography.label,
    fontSize: 14,
    fontVariant: ['tabular-nums'],
  },
  label: {
    ...typography.subtitle,
    color: colors.textSecondary,
    fontSize: 11,
    textAlign: 'center',
  },
});
