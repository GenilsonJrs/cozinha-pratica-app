import { ColorSchemeName, useColorScheme } from 'react-native';

import {
  darkColors,
  darkIllustration,
  IllustrationColors,
  lightColors,
  lightIllustration,
  ThemeColors,
} from './colors';
import { darkTints, lightTints, Tint, TintName } from './ingredient-tints';

export interface Theme {
  scheme: 'light' | 'dark';
  colors: ThemeColors;
  illustration: IllustrationColors;
  tints: Record<TintName, Tint>;
}

export function themeForScheme(scheme: ColorSchemeName | null | undefined): Theme {
  if (scheme === 'dark') {
    return {
      scheme: 'dark',
      colors: darkColors,
      illustration: darkIllustration,
      tints: darkTints,
    };
  }
  return {
    scheme: 'light',
    colors: lightColors,
    illustration: lightIllustration,
    tints: lightTints,
  };
}

export function useTheme(): Theme {
  return themeForScheme(useColorScheme());
}
