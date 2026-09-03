import { ColorSchemeName, useColorScheme } from 'react-native';

import {
  darkColors,
  darkIllustration,
  IllustrationColors,
  lightColors,
  lightIllustration,
  ThemeColors,
} from './colors';
import { ArtPalettes, darkArt, lightArt } from './ingredient-art';
import { darkTints, lightTints, Tint, TintName } from './ingredient-tints';

export interface Theme {
  scheme: 'light' | 'dark';
  colors: ThemeColors;
  illustration: IllustrationColors;
  tints: Record<TintName, Tint>;
  art: ArtPalettes;
}

export function themeForScheme(scheme: ColorSchemeName | null | undefined): Theme {
  if (scheme === 'dark') {
    return {
      scheme: 'dark',
      colors: darkColors,
      illustration: darkIllustration,
      tints: darkTints,
      art: darkArt,
    };
  }
  return {
    scheme: 'light',
    colors: lightColors,
    illustration: lightIllustration,
    tints: lightTints,
    art: lightArt,
  };
}

export function useTheme(): Theme {
  return themeForScheme(useColorScheme());
}
