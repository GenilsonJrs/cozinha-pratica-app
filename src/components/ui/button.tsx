import { Pressable, StyleSheet, Text } from 'react-native';

import { radius, spacing, touchTarget } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { Theme, useTheme } from '@/theme/use-theme';

type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
}

function variantStyles(theme: Theme, variant: ButtonVariant, disabled: boolean) {
  const { colors } = theme;
  if (disabled) {
    return {
      backgroundColor: colors.disabled,
      borderColor: colors.disabled,
      labelColor: colors.surface,
    };
  }
  switch (variant) {
    case 'primary':
      return {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        labelColor: colors.onPrimary,
      };
    case 'destructive':
      return {
        backgroundColor: colors.danger,
        borderColor: colors.danger,
        labelColor: colors.onPrimary,
      };
    case 'secondary':
      return {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        labelColor: colors.textPrimary,
      };
    case 'ghost':
      return {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        labelColor: colors.textSecondary,
      };
  }
}

export function Button({ label, onPress, variant = 'primary', disabled = false }: ButtonProps) {
  const theme = useTheme();
  const { backgroundColor, borderColor, labelColor } = variantStyles(theme, variant, disabled);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor, borderColor },
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, typography.bodyStrong, { color: labelColor }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: touchTarget.minHeight,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
  label: {
    textAlign: 'center',
  },
});
