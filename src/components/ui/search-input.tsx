import { StyleSheet, TextInput } from 'react-native';

import { radius, spacing, touchTarget } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { useTheme } from '@/theme/use-theme';

interface SearchInputProps {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  accessibilityLabel: string;
}

export function SearchInput({
  value,
  onChangeText,
  placeholder,
  accessibilityLabel,
}: SearchInputProps) {
  const { colors } = useTheme();
  return (
    <TextInput
      style={[
        styles.input,
        typography.body,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          color: colors.textPrimary,
        },
      ]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.textSecondary}
      autoCorrect={false}
      autoCapitalize="none"
      accessibilityLabel={accessibilityLabel}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: touchTarget.minHeight,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
  },
});
