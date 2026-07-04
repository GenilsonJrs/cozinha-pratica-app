import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

interface IngredientRowProps {
  name: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  accessibilityLabel: string;
  onPress: () => void;
}

export function IngredientRow({
  name,
  iconName,
  iconColor,
  accessibilityLabel,
  onPress,
}: IngredientRowProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
    >
      <Text style={styles.name}>{name}</Text>
      <Ionicons name={iconName} size={22} color={iconColor} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  rowPressed: {
    opacity: 0.6,
  },
  name: {
    fontSize: 16,
  },
});
