import { darkColors, lightColors } from '../theme/colors';
import { darkNavigationTheme, lightNavigationTheme } from '../theme/navigation';

describe('navigation themes', () => {
  it('derives the light theme from the light tokens', () => {
    expect(lightNavigationTheme.colors.background).toBe(lightColors.background);
    expect(lightNavigationTheme.colors.card).toBe(lightColors.surface);
    expect(lightNavigationTheme.colors.text).toBe(lightColors.textPrimary);
    expect(lightNavigationTheme.colors.primary).toBe(lightColors.primary);
    expect(lightNavigationTheme.dark).toBe(false);
  });

  it('derives the dark theme from the dark tokens', () => {
    expect(darkNavigationTheme.colors.background).toBe(darkColors.background);
    expect(darkNavigationTheme.colors.card).toBe(darkColors.surface);
    expect(darkNavigationTheme.colors.text).toBe(darkColors.textPrimary);
    expect(darkNavigationTheme.colors.primary).toBe(darkColors.primary);
    expect(darkNavigationTheme.dark).toBe(true);
  });
});
