import { ColorSchemeName, useColorScheme } from 'react-native';

import { darkColors, lightColors, ThemeColors } from './colors';

export interface Theme {
  scheme: 'light' | 'dark';
  colors: ThemeColors;
}

export function themeForScheme(scheme: ColorSchemeName | null | undefined): Theme {
  if (scheme === 'dark') {
    return { scheme: 'dark', colors: darkColors };
  }
  return { scheme: 'light', colors: lightColors };
}

export function useTheme(): Theme {
  return themeForScheme(useColorScheme());
}
