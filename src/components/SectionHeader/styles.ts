import { StyleSheet } from 'react-native';

import { spacing } from '../../constants/layout';
import { typography } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  title: {
    ...typography.title,
    fontSize: 22,
  },
  subtitle: {
    ...typography.subtitle,
    fontSize: 14,
    lineHeight: 20,
  },
});
