import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/layout';
import { typography } from '@/theme';
import { StyleSheet } from 'react-native';


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
    width: 200,
    alignItems: 'center',

    backgroundColor: 'red'
  },
  text: {
    ...typography.body,
    fontSize: 16,
    lineHeight: 25,
    color: colors.textPrimary,
  },
  readerCard: {
    position: 'relative',
    paddingRight: 10,
  },
  readerCardFavorite: {
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: colors.textPrimary,
    borderRadius: 15,
    marginVertical: 1
  },
  readerPressable: {
    paddingVertical: 2,
  },
  readerPressed: {
    opacity: 0.72,
  },
  readerLine: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  verseNumber: {
    ...typography.label,
    width: 23,
    paddingTop: 1,
    color: colors.primary,
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'right',
    fontVariant: ['tabular-nums'],
  },
  verseNumberSelected: {
    color: colors.accentOrange,
  },
  readerText: {
    ...typography.body,
    flex: 1,
    color: colors.textPrimary,
    fontSize: 17,
    lineHeight: 27,
  },
  readerTextSelected: {
    color: colors.textSecondary,
  },
  readerFavorite: {
    position: 'absolute',
    right: -5,
    top: 30,
    margin: 0,
  },
});
