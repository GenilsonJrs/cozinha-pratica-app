import { darkColors, lightColors } from '../theme/colors';
import { themeForScheme } from '../theme/use-theme';

describe('themeForScheme', () => {
  it('maps light scheme to light colors', () => {
    expect(themeForScheme('light')).toEqual({ scheme: 'light', colors: lightColors });
  });

  it('maps dark scheme to dark colors', () => {
    expect(themeForScheme('dark')).toEqual({ scheme: 'dark', colors: darkColors });
  });

  it('falls back to light when the scheme is unknown', () => {
    expect(themeForScheme(null)).toEqual({ scheme: 'light', colors: lightColors });
    expect(themeForScheme(undefined)).toEqual({ scheme: 'light', colors: lightColors });
  });
});
