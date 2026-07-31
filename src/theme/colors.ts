export interface ThemeColors {
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  primary: string;
  onPrimary: string;
  secondary: string;
  accent: string;
  success: string;
  danger: string;
  border: string;
  disabled: string;
}

export const lightColors: ThemeColors = {
  background: '#FDF6EF',
  surface: '#FFFFFF',
  textPrimary: '#3B2F2A',
  textSecondary: '#63544A',
  primary: '#BC4B26',
  onPrimary: '#FFFFFF',
  secondary: '#3E6B4F',
  accent: '#B45309',
  success: '#2F6B45',
  danger: '#B3261E',
  border: '#E8DCD1',
  disabled: '#B4A79B',
};

export interface IllustrationColors {
  terracottaFrom: string;
  terracottaTo: string;
  yolkFrom: string;
  yolkTo: string;
  discFrom: string;
  discTo: string;
  eggWhite: string;
  outline: string;
  green: string;
  greenDeep: string;
  shine: string;
}

export const lightIllustration: IllustrationColors = {
  terracottaFrom: '#E0703F',
  terracottaTo: '#A63C1B',
  yolkFrom: '#F9CB6B',
  yolkTo: '#E28C29',
  discFrom: '#F7E8D3',
  discTo: '#E8D2B4',
  eggWhite: '#FDF6EF',
  outline: '#3B2F2A',
  green: '#3E6B4F',
  greenDeep: '#2C5240',
  shine: '#FFF8EE',
};

export const darkIllustration: IllustrationColors = {
  terracottaFrom: '#FF8A5C',
  terracottaTo: '#C4552C',
  yolkFrom: '#F9CB6B',
  yolkTo: '#E9A03C',
  discFrom: '#3A2C24',
  discTo: '#2A201B',
  eggWhite: '#F3EAE2',
  outline: '#C4B5A8',
  green: '#8FC2A2',
  greenDeep: '#5E9476',
  shine: '#FFFFFF',
};

export const darkColors: ThemeColors = {
  background: '#1B1310',
  surface: '#2A201B',
  textPrimary: '#F3EAE2',
  textSecondary: '#C4B5A8',
  primary: '#FF8A5C',
  onPrimary: '#2B1408',
  secondary: '#8FC2A2',
  accent: '#F2B04A',
  success: '#7CC29A',
  danger: '#FF8177',
  border: '#4A3B32',
  disabled: '#77675C',
};
