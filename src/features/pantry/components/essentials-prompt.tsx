import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ingredientsByIds } from '../categories';
import { essentialIngredientIds } from '../essentials';
import { usePantryStore } from '../pantry-store';
import { IngredientRow } from './ingredient-row';
import { PrimaryButton } from './primary-button';

export function EssentialsPrompt() {
  const insets = useSafeAreaInsets();
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
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <Text style={styles.title}>Vamos montar sua despensa</Text>
      <Text style={styles.message}>
        A maioria das cozinhas tem estes itens básicos. Desmarque o que você não tem — dá para
        ajustar tudo depois.
      </Text>
      <ScrollView contentContainerStyle={styles.list}>
        {essentials.map((ingredient) => {
          const isSelected = selectedIds.has(ingredient.id);
          return (
            <IngredientRow
              key={ingredient.id}
              name={ingredient.name}
              iconName={isSelected ? 'checkmark-circle' : 'ellipse-outline'}
              iconColor={isSelected ? '#16A34A' : '#9CA3AF'}
              accessibilityLabel={
                isSelected ? `Desmarcar ${ingredient.name}` : `Marcar ${ingredient.name}`
              }
              onPress={() => toggle(ingredient.id)}
            />
          );
        })}
      </ScrollView>
      <View style={styles.actions}>
        <PrimaryButton
          label={`Confirmar (${selectedIds.size})`}
          onPress={() => resolveEssentials([...selectedIds])}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Pular"
          onPress={() => resolveEssentials([])}
          style={styles.skipButton}
        >
          <Text style={styles.skipLabel}>Pular e começar do zero</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 8,
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
  },
  actions: {
    gap: 8,
    paddingBottom: 24,
  },
  skipButton: {
    paddingVertical: 10,
  },
  skipLabel: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
  },
});
