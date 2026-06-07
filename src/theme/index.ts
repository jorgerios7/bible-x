import { MD3DarkTheme } from 'react-native-paper';
import type { Theme } from '@react-navigation/native';

import { colors } from '../constants/colors';

export const paperTheme = {
  ...MD3DarkTheme,
  dark: true,
  roundness: 18,
  colors: {
    ...MD3DarkTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    tertiary: colors.accentOrange,
    error: colors.accentRed,
    background: colors.background,
    surface: colors.surface,
    surfaceVariant: colors.surfaceSoft,
    outline: colors.border,
    onPrimary: colors.textPrimary,
    onSecondary: colors.textPrimary,
    onSurface: colors.textPrimary,
    onSurfaceVariant: colors.textSecondary,
    onBackground: colors.textPrimary,
    inverseSurface: colors.textPrimary,
    inverseOnSurface: colors.background,
  },
};

export const navigationTheme: Theme = {
  dark: true,
  colors: {
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.textPrimary,
    border: colors.border,
    notification: colors.accentRed,
  },
  fonts: {
    regular: {
      fontFamily: 'Inter_400Regular',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'Inter_600SemiBold',
      fontWeight: '600',
    },
    bold: {
      fontFamily: 'Inter_700Bold',
      fontWeight: '700',
    },
    heavy: {
      fontFamily: 'Inter_800ExtraBold',
      fontWeight: '800',
    },
  },
};

export const typography = {
  title: {
    fontFamily: 'Inter_700Bold',
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: 'Inter_500Medium',
    color: colors.textSecondary,
  },
  body: {
    fontFamily: 'Inter_400Regular',
    color: colors.textPrimary,
  },
  label: {
    fontFamily: 'Inter_600SemiBold',
    color: colors.textPrimary,
  },
};
