import { StyleSheet } from 'react-native';

import { colors } from '../../constants/colors';
import { radius, spacing } from '../../constants/layout';
import { typography } from '../../theme';

export const styles = StyleSheet.create({
  hero: {
    gap: spacing.lg,
  },
  heroText: {
    gap: spacing.sm,
  },
  title: {
    ...typography.title,
    fontSize: 34,
  },
  subtitle: {
    ...typography.subtitle,
    fontSize: 16,
    lineHeight: 24,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  quickCardContainer: {
    flexBasis: '47%',
    flexGrow: 1,
  },
  quickCard: {
    minHeight: 112,
    justifyContent: 'space-between',
  },
  quickTitle: {
    ...typography.label,
    fontSize: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  cardTitle: {
    ...typography.title,
    flex: 1,
    fontSize: 18,
  },
  cardDescription: {
    ...typography.subtitle,
    lineHeight: 21,
  },
  historyText: {
    ...typography.body,
    fontSize: 16,
  },
  percent: {
    ...typography.label,
    color: colors.success,
    fontVariant: ['tabular-nums'],
  },
  progress: {
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
  },
});
