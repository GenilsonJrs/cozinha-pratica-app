import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { groupByCategory } from '@/features/pantry/categories';
import { CategorySection } from '@/features/pantry/components/category-section';
import { IngredientRow } from '@/features/pantry/components/ingredient-row';
import { usePantryStore } from '@/features/pantry/pantry-store';
import { searchCatalog } from '@/features/pantry/search';

export default function PantryAddScreen() {
  const [query, setQuery] = useState('');
  const ingredientIds = usePantryStore((state) => state.ingredientIds);
  const add = usePantryStore((state) => state.add);
  const remove = usePantryStore((state) => state.remove);

  const selectedIds = useMemo(() => new Set(ingredientIds), [ingredientIds]);
  const groups = useMemo(() => groupByCategory(searchCatalog(query)), [query]);

  const toggle = (id: string) => {
    if (selectedIds.has(id)) {
      remove(id);
    } else {
      add(id);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar ingrediente (ex.: tomate)"
        value={query}
        onChangeText={setQuery}
        autoCorrect={false}
        autoCapitalize="none"
        accessibilityLabel="Buscar ingrediente"
      />
      {groups.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Nenhum ingrediente encontrado</Text>
          <Text style={styles.emptyMessage}>
            Esse ingrediente ainda não está no catálogo do Cozinha Prática.
          </Text>
        </View>
      ) : (
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.list}>
          {groups.map((group) => (
            <CategorySection key={group.category} title={group.title}>
              {group.ingredients.map((ingredient) => {
                const isSelected = selectedIds.has(ingredient.id);
                return (
                  <IngredientRow
                    key={ingredient.id}
                    name={ingredient.name}
                    iconName={isSelected ? 'checkmark-circle' : 'add-circle-outline'}
                    iconColor={isSelected ? '#16A34A' : '#9CA3AF'}
                    accessibilityLabel={
                      isSelected ? `Remover ${ingredient.name}` : `Adicionar ${ingredient.name}`
                    }
                    onPress={() => toggle(ingredient.id)}
                  />
                );
              })}
            </CategorySection>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  list: {
    paddingBottom: 24,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyMessage: {
    fontSize: 15,
    textAlign: 'center',
    color: '#6B7280',
  },
});
