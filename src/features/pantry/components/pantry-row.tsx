import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { IngredientIcon } from '@/components/ui/ingredient-icon';
import { spacing } from '@/theme/spacing';
import { fonts } from '@/theme/typography';
import { useTheme } from '@/theme/use-theme';

import { iconFor } from '../ingredient-icons';
import { Ingredient } from '../types';

interface PantryRowProps {
  ingredient: Ingredient;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

export function PantryRow({
  ingredient,
  quantity,
  onIncrement,
  onDecrement,
  onRemove,
}: PantryRowProps) {
  const { colors } = useTheme();
  const icon = iconFor(ingredient.id, ingredient.category);

  return (
    <View style={[styles.row, { borderBottomColor: colors.border }]}>
      <IngredientIcon shape={icon.shape} tint={icon.tint} size={44} />

      <Text numberOfLines={1} style={[styles.name, { color: colors.textPrimary }]}>
        {ingredient.name}
      </Text>

      <View style={styles.stepper}>
        <Pressable
          onPress={onDecrement}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={`Diminuir ${ingredient.name}`}
          style={[styles.step, { borderColor: colors.border }]}
        >
          <Text style={[styles.stepLabel, { color: colors.primary }]}>−</Text>
        </Pressable>
        <Text style={[styles.quantity, { color: colors.textPrimary }]}>{quantity}</Text>
        <Pressable
          onPress={onIncrement}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={`Aumentar ${ingredient.name}`}
          style={[styles.step, { borderColor: colors.border }]}
        >
          <Text style={[styles.stepLabel, { color: colors.primary }]}>+</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={onRemove}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={`Remover ${ingredient.name}`}
        style={styles.remove}
      >
        <Ionicons name="close" size={20} color={colors.textSecondary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    minHeight: 60,
  },
  name: {
    flex: 1,
    fontSize: 15,
    fontFamily: fonts.semibold,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  step: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepLabel: {
    fontSize: 17,
    fontFamily: fonts.bold,
    lineHeight: 20,
  },
  quantity: {
    fontSize: 15,
    fontFamily: fonts.bold,
    minWidth: 22,
    textAlign: 'center',
  },
  remove: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
