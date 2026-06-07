import { StyleSheet } from 'react-native';

import { spacing } from '../../constants/layout';

export const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },
  flexContent: {
    flex: 1,
  },
});
