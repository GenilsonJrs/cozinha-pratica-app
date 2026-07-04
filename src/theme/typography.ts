export const fonts = {
  regular: 'Nunito_400Regular',
  semibold: 'Nunito_600SemiBold',
  bold: 'Nunito_700Bold',
  extrabold: 'Nunito_800ExtraBold',
} as const;

export const typography = {
  screenTitle: {
    fontSize: 28,
    fontFamily: fonts.extrabold,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: fonts.bold,
    letterSpacing: 0.6,
    textTransform: 'uppercase' as const,
  },
  body: {
    fontSize: 16,
    fontFamily: fonts.regular,
  },
  bodyStrong: {
    fontSize: 16,
    fontFamily: fonts.semibold,
  },
  caption: {
    fontSize: 13,
    fontFamily: fonts.regular,
  },
} as const;
