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
