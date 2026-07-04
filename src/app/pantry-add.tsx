import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { EmptyState } from '@/components/ui/empty-state';
import { ListRow } from '@/components/ui/list-row';
import { Screen } from '@/components/ui/screen';
import { SearchInput } from '@/components/ui/search-input';
import { Section } from '@/components/ui/section';
import { groupByCategory } from '@/features/pantry/categories';
import { usePantryStore } from '@/features/pantry/pantry-store';
import { searchCatalog } from '@/features/pantry/search';
import { spacing } from '@/theme/spacing';
import { useTheme } from '@/theme/use-theme';

export default function PantryAddScreen() {
  const { colors } = useTheme();
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
    <Screen withTopInset={false}>
      <SearchInput
        value={query}
        onChangeText={setQuery}
        placeholder="Buscar ingrediente (ex.: tomate)"
        accessibilityLabel="Buscar ingrediente"
      />
      {groups.length === 0 ? (
        <EmptyState
          emoji="🔍"
          title="Nenhum ingrediente encontrado"
          message="Esse ainda não está no nosso catálogo — ele cresce a cada versão."
        />
      ) : (
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.list}>
          {groups.map((group) => (
            <Section key={group.category} title={group.title}>
              {group.ingredients.map((ingredient) => {
                const isSelected = selectedIds.has(ingredient.id);
                return (
                  <ListRow
                    key={ingredient.id}
                    title={ingredient.name}
                    iconName={isSelected ? 'checkmark-circle' : 'add-circle-outline'}
                    iconColor={isSelected ? colors.success : colors.textSecondary}
                    accessibilityLabel={
                      isSelected ? `Remover ${ingredient.name}` : `Adicionar ${ingredient.name}`
                    }
                    onPress={() => toggle(ingredient.id)}
                  />
                );
              })}
            </Section>
          ))}
        </ScrollView>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
});
