import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { ListRow } from '@/components/ui/list-row';
import { Screen } from '@/components/ui/screen';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { useTheme } from '@/theme/use-theme';

import { ingredientsByIds } from '../categories';
import { essentialIngredientIds } from '../essentials';
import { usePantryStore } from '../pantry-store';

export function EssentialsPrompt() {
  const { colors } = useTheme();
  const resolveEssentials = usePantryStore((state) => state.resolveEssentials);
  const [selectedIds, setSelectedIds] = useState(() => new Set(essentialIngredientIds));

  const essentials = ingredientsByIds(essentialIngredientIds);

  const toggle = (id: string) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <Screen>
      <Text style={[typography.screenTitle, { color: colors.textPrimary }]}>
        Vamos montar sua despensa
      </Text>
      <Text style={[typography.body, styles.message, { color: colors.textSecondary }]}>
        Quase toda cozinha tem estes básicos. Desmarque o que faltar por aí — dá para ajustar quando
        quiser.
      </Text>
      <ScrollView contentContainerStyle={styles.list}>
        {essentials.map((ingredient) => {
          const isSelected = selectedIds.has(ingredient.id);
          return (
            <ListRow
              key={ingredient.id}
              title={ingredient.name}
              iconName={isSelected ? 'checkmark-circle' : 'ellipse-outline'}
              iconColor={isSelected ? colors.success : colors.textSecondary}
              accessibilityLabel={
                isSelected ? `Desmarcar ${ingredient.name}` : `Marcar ${ingredient.name}`
              }
              onPress={() => toggle(ingredient.id)}
            />
          );
        })}
      </ScrollView>
      <View style={styles.actions}>
        <Button
          label={`Confirmar (${selectedIds.size})`}
          onPress={() => resolveEssentials([...selectedIds])}
        />
        <Button
          label="Pular e começar do zero"
          variant="ghost"
          onPress={() => resolveEssentials([])}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  message: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  list: {
    paddingBottom: spacing.lg,
  },
  actions: {
    gap: spacing.sm,
    paddingBottom: spacing.xl,
  },
});
