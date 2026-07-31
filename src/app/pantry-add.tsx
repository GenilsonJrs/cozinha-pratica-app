import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { NoResultsIllustration } from '@/components/illustrations/no-results';
import { EmptyState } from '@/components/ui/empty-state';
import { FadeIn } from '@/components/ui/fade-in';
import { Screen } from '@/components/ui/screen';
import { SearchInput } from '@/components/ui/search-input';
import { Section } from '@/components/ui/section';
import { ingredients } from '@/features/pantry/catalog';
import { categoryLabels, categoryOrder, groupByCategory } from '@/features/pantry/categories';
import { IngredientCard } from '@/features/pantry/components/ingredient-card';
import { commonIngredientIds } from '@/features/pantry/essentials';
import { usePantryStore } from '@/features/pantry/pantry-store';
import { searchCatalog } from '@/features/pantry/search';
import { IngredientCategory } from '@/features/pantry/types';
import { spacing } from '@/theme/spacing';
import { fonts, typography } from '@/theme/typography';
import { useTheme } from '@/theme/use-theme';

type Filter = 'all' | IngredientCategory;

const byId = new Map(ingredients.map((ingredient) => [ingredient.id, ingredient]));
const commonIngredients = commonIngredientIds
  .map((id) => byId.get(id))
  .filter((ingredient) => ingredient !== undefined);

export default function PantryAddScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const quantities = usePantryStore((state) => state.quantities);
  const add = usePantryStore((state) => state.add);
  const increment = usePantryStore((state) => state.increment);
  const decrement = usePantryStore((state) => state.decrement);

  const results = useMemo(() => searchCatalog(query), [query]);
  const filtered = useMemo(
    () => (filter === 'all' ? results : results.filter((item) => item.category === filter)),
    [results, filter]
  );
  const groups = useMemo(() => groupByCategory(filtered), [filtered]);

  const isBrowsing = query.trim().length === 0 && filter === 'all';
  const selectedCount = Object.keys(quantities).length;

  const renderCard = (id: string) => {
    const ingredient = byId.get(id);
    if (!ingredient) {
      return null;
    }
    return (
      <View key={ingredient.id} style={styles.cell}>
        <IngredientCard
          ingredient={ingredient}
          quantity={quantities[ingredient.id] ?? 0}
          onAdd={() => add(ingredient.id)}
          onIncrement={() => increment(ingredient.id)}
          onDecrement={() => decrement(ingredient.id)}
        />
      </View>
    );
  };

  return (
    <Screen withTopInset={false}>
      <SearchInput
        value={query}
        onChangeText={setQuery}
        placeholder="Buscar ingrediente (ex.: tomate)"
        accessibilityLabel="Buscar ingrediente"
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipsRow}
        contentContainerStyle={styles.chips}
        keyboardShouldPersistTaps="handled"
      >
        {(['all', ...categoryOrder] as Filter[]).map((option) => {
          const active = filter === option;
          return (
            <Pressable
              key={option}
              onPress={() => setFilter(option)}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={option === 'all' ? 'Todos' : categoryLabels[option]}
              style={[
                styles.chip,
                {
                  backgroundColor: active ? colors.primary : colors.surface,
                  borderColor: active ? colors.primary : colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.chipLabel,
                  { color: active ? colors.onPrimary : colors.textSecondary },
                ]}
              >
                {option === 'all' ? 'Todos' : categoryLabels[option]}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {groups.length === 0 ? (
        <EmptyState
          illustration={<NoResultsIllustration />}
          title="Não achamos esse ingrediente"
          message="Tente outro nome ou uma grafia diferente. O catálogo cresce a cada versão."
        />
      ) : (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={styles.scroll}
          contentContainerStyle={styles.list}
        >
          {isBrowsing && (
            <Section title="Comuns na cozinha">
              <Text style={[typography.caption, styles.hint, { color: colors.textSecondary }]}>
                Os que quase toda casa tem. Toque para adicionar.
              </Text>
              <View style={styles.grid}>
                {commonIngredients.map((ingredient) => renderCard(ingredient.id))}
              </View>
            </Section>
          )}

          {groups.map((group) => (
            <Section key={group.category} title={group.title}>
              <View style={styles.grid}>
                {group.ingredients.map((ingredient) => renderCard(ingredient.id))}
              </View>
            </Section>
          ))}

        </ScrollView>
      )}

      <FadeIn
        delay={120}
        distance={28}
        style={[styles.bar, { paddingBottom: insets.bottom + spacing.sm }]}
      >
        <View style={[styles.barInner, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.barCount}>
            <Text style={[styles.barNumber, { color: colors.primary }]}>{selectedCount}</Text>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>
              {selectedCount === 1 ? 'ingrediente' : 'ingredientes'}
            </Text>
          </View>
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Concluir e voltar para a despensa"
            style={({ pressed }) => [
              styles.done,
              { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <Text style={[styles.doneLabel, { color: colors.onPrimary }]}>Concluir</Text>
          </Pressable>
        </View>
      </FadeIn>
    </Screen>
  );
}

const styles = StyleSheet.create({
  chipsRow: {
    flexGrow: 0,
    flexShrink: 0,
  },
  chips: {
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    paddingRight: spacing.md,
  },
  chip: {
    paddingHorizontal: spacing.md,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipLabel: {
    fontSize: 13,
    fontFamily: fonts.semibold,
  },
  scroll: {
    flex: 1,
  },
  list: {
    paddingBottom: spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  cell: {
    width: '31.5%',
  },
  hint: {
    marginBottom: spacing.sm,
  },
  bar: {
    paddingTop: spacing.sm,
  },
  barInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 28,
    paddingLeft: spacing.lg,
    paddingRight: spacing.xs,
    height: 56,
  },
  barCount: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
  },
  barNumber: {
    fontSize: 22,
    fontFamily: fonts.extrabold,
  },
  done: {
    height: 44,
    paddingHorizontal: spacing.xl,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneLabel: {
    fontSize: 15,
    fontFamily: fonts.bold,
  },
});
