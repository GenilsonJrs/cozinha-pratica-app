import { Pressable, StyleSheet, Text, View } from 'react-native';

import { IngredientIcon } from '@/components/ui/ingredient-icon';
import { spacing } from '@/theme/spacing';
import { fonts } from '@/theme/typography';
import { useTheme } from '@/theme/use-theme';

import { iconFor } from '../ingredient-icons';
import { Ingredient } from '../types';

interface IngredientCardProps {
  ingredient: Ingredient;
  quantity: number;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function IngredientCard({
  ingredient,
  quantity,
  onAdd,
  onIncrement,
  onDecrement,
}: IngredientCardProps) {
  const { colors } = useTheme();
  const icon = iconFor(ingredient.id, ingredient.category);
  const isSelected = quantity > 0;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: isSelected ? colors.primary : colors.border,
          borderWidth: isSelected ? 2 : 1,
        },
      ]}
    >
      <Pressable
        onPress={onAdd}
        disabled={isSelected}
        accessibilityRole="button"
        accessibilityLabel={
          isSelected ? `${ingredient.name} na despensa` : `Adicionar ${ingredient.name}`
        }
        style={styles.body}
      >
        <IngredientIcon shape={icon.shape} tint={icon.tint} size={52} />
        <Text numberOfLines={2} style={[styles.name, { color: colors.textPrimary }]}>
          {ingredient.name}
        </Text>
      </Pressable>

      {isSelected ? (
        <View style={[styles.counter, { borderTopColor: colors.border }]}>
          <Pressable
            onPress={onDecrement}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={`Diminuir ${ingredient.name}`}
            style={styles.step}
          >
            <Text style={[styles.stepLabel, { color: colors.primary }]}>−</Text>
          </Pressable>
          <Text style={[styles.quantity, { color: colors.textPrimary }]}>{quantity}</Text>
          <Pressable
            onPress={onIncrement}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={`Aumentar ${ingredient.name}`}
            style={styles.step}
          >
            <Text style={[styles.stepLabel, { color: colors.primary }]}>+</Text>
          </Pressable>
        </View>
      ) : (
        <View style={[styles.counter, { borderTopColor: colors.border }]}>
          <Text style={[styles.addHint, { color: colors.textSecondary }]}>Toque para add</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 18,
    overflow: 'hidden',
  },
  body: {
    alignItems: 'center',
    gap: spacing.xs,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.xs,
    paddingBottom: spacing.sm,
    minHeight: 108,
  },
  name: {
    fontSize: 12.5,
    fontFamily: fonts.semibold,
    textAlign: 'center',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    height: 40,
    paddingHorizontal: spacing.sm,
  },
  step: {
    width: 34,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepLabel: {
    fontSize: 20,
    fontFamily: fonts.bold,
    lineHeight: 24,
  },
  quantity: {
    fontSize: 15,
    fontFamily: fonts.bold,
    minWidth: 24,
    textAlign: 'center',
  },
  addHint: {
    flex: 1,
    fontSize: 11,
    fontFamily: fonts.regular,
    textAlign: 'center',
  },
});
