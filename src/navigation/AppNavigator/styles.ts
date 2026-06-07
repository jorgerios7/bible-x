import { StyleSheet } from 'react-native';

import { colors } from '../../constants/colors';
import { radius } from '../../constants/layout';
import { typography } from '../../theme';

export const styles = StyleSheet.create({
  stackContent: {
    backgroundColor: colors.background,
  },
  tabBar: {
    height: 74,
    paddingTop: 8,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: colors.glassBorder,
    backgroundColor: 'rgba(15, 23, 42, 0.94)',
  },
  tabBarItem: {
    borderRadius: radius.md,
  },
  tabBarLabel: {
    ...typography.label,
    fontSize: 11,
  },
});
