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
  aiTabButton: {
    top: -18,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
  },
  aiTabButtonPressed: {
    opacity: 0.82,
  },
  aiButton: {
    width: 58,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    backgroundColor: colors.primary,
  },
});
