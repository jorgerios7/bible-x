import { StyleSheet } from 'react-native';

import { colors } from '../../constants/colors';
import { radius, spacing } from '../../constants/layout';

export const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  row: {
    height: 18,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceSoft,
  },
  shortRow: {
    width: '62%',
  },
});
