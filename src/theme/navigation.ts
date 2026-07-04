import { DarkTheme, DefaultTheme } from 'expo-router';

import { darkColors, lightColors, ThemeColors } from './colors';

type NavigationTheme = typeof DefaultTheme;

function buildNavigationTheme(base: NavigationTheme, colors: ThemeColors): NavigationTheme {
  return {
    ...base,
    colors: {
      ...base.colors,
      background: colors.background,
      card: colors.surface,
      text: colors.textPrimary,
      border: colors.border,
      primary: colors.primary,
      notification: colors.danger,
    },
  };
}

export const lightNavigationTheme = buildNavigationTheme(DefaultTheme, lightColors);
export const darkNavigationTheme = buildNavigationTheme(DarkTheme, darkColors);
