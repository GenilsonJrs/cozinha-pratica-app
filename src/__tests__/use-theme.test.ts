import { darkColors, darkIllustration, lightColors, lightIllustration } from '../theme/colors';
import { darkArt, lightArt } from '../theme/ingredient-art';
import { darkTints, lightTints } from '../theme/ingredient-tints';
import { themeForScheme } from '../theme/use-theme';

const lightTheme = {
  scheme: 'light',
  colors: lightColors,
  illustration: lightIllustration,
  tints: lightTints,
  art: lightArt,
};

const darkTheme = {
  scheme: 'dark',
  colors: darkColors,
  illustration: darkIllustration,
  tints: darkTints,
  art: darkArt,
};

describe('themeForScheme', () => {
  it('maps light scheme to light colors', () => {
    expect(themeForScheme('light')).toEqual(lightTheme);
  });

  it('maps dark scheme to dark colors', () => {
    expect(themeForScheme('dark')).toEqual(darkTheme);
  });

  it('falls back to light when the scheme is unknown', () => {
    expect(themeForScheme(null)).toEqual(lightTheme);
    expect(themeForScheme(undefined)).toEqual(lightTheme);
  });

  it('gives each scheme its own outline on the bold arts', () => {
    expect(themeForScheme('light').art.cebola.line).not.toBe(
      themeForScheme('dark').art.cebola.line,
    );
  });

  it('gives each scheme its own illustration palette', () => {
    expect(themeForScheme('light').illustration.outline).not.toBe(
      themeForScheme('dark').illustration.outline,
    );
  });
});
