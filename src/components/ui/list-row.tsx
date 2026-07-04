import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

import { spacing, touchTarget } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { useTheme } from '@/theme/use-theme';

interface ListRowProps {
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  accessibilityLabel: string;
  onPress: () => void;
}

export function ListRow({ title, iconName, iconColor, accessibilityLabel, onPress }: ListRowProps) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <Text style={[typography.body, { color: colors.textPrimary }]}>{title}</Text>
      <Ionicons name={iconName} size={22} color={iconColor} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: touchTarget.minHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  pressed: {
    opacity: 0.6,
  },
});
