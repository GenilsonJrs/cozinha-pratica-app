import { darkColors, lightColors, ThemeColors } from '../theme/colors';

function channelToLinear(channel: number): number {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string): number {
  const value = hex.replace('#', '');
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return 0.2126 * channelToLinear(r) + 0.7152 * channelToLinear(g) + 0.0722 * channelToLinear(b);
}

function contrastRatio(foreground: string, background: string): number {
  const l1 = relativeLuminance(foreground);
  const l2 = relativeLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const textPairs: [keyof ThemeColors, keyof ThemeColors][] = [
  ['textPrimary', 'background'],
  ['textPrimary', 'surface'],
  ['textSecondary', 'background'],
  ['textSecondary', 'surface'],
  ['onPrimary', 'primary'],
  ['danger', 'background'],
  ['success', 'background'],
  ['accent', 'background'],
];

const largeTextPairs: [keyof ThemeColors, keyof ThemeColors][] = [
  ['primary', 'background'],
  ['secondary', 'background'],
];

const themes = [
  ['light', lightColors],
  ['dark', darkColors],
] as const;

describe.each(themes)('%s theme contrast (WCAG AA)', (_name, colors) => {
  it.each(textPairs)('%s on %s reaches 4.5:1', (foreground, background) => {
    expect(contrastRatio(colors[foreground], colors[background])).toBeGreaterThanOrEqual(4.5);
  });

  it.each(largeTextPairs)('%s on %s reaches 3:1', (foreground, background) => {
    expect(contrastRatio(colors[foreground], colors[background])).toBeGreaterThanOrEqual(3);
  });
});
