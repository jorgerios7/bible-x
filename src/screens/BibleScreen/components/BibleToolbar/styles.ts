import { StyleSheet } from 'react-native';

import { colors } from '../../../../constants/colors';
import { radius } from '../../../../constants/layout';
import { typography } from '../../../../theme';

export const styles = StyleSheet.create({
  container: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: radius.lg,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  title: {
    ...typography.title,
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
  },
});
