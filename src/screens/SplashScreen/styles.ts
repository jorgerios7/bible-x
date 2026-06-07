import { StyleSheet } from 'react-native';

import { spacing } from '../../constants/layout';
import { typography } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.xxl,
  },
  loading: {
    width: '100%',
    maxWidth: 280,
    gap: spacing.md,
  },
  caption: {
    ...typography.subtitle,
    textAlign: 'center',
    fontSize: 14,
  },
});
