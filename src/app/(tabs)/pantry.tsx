import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { EmptyPantryIllustration } from '@/components/illustrations/empty-pantry';
import { EmptyState } from '@/components/ui/empty-state';
import { FadeIn } from '@/components/ui/fade-in';
import { PantryRow } from '@/features/pantry/components/pantry-row';
import { LoadingView } from '@/components/ui/loading-view';
import { Screen } from '@/components/ui/screen';
import { Section } from '@/components/ui/section';
import { groupByCategory, ingredientsByIds } from '@/features/pantry/categories';
import { EssentialsPrompt } from '@/features/pantry/components/essentials-prompt';
import { usePantryStore } from '@/features/pantry/pantry-store';
import { spacing } from '@/theme/spacing';
import { fonts, typography } from '@/theme/typography';
import { useTheme } from '@/theme/use-theme';

export default function PantryScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const ingredientIds = usePantryStore((state) => state.ingredientIds);
  const hasHydrated = usePantryStore((state) => state.hasHydrated);
  const essentialsResolved = usePantryStore((state) => state.essentialsResolved);
  const remove = usePantryStore((state) => state.remove);
  const clear = usePantryStore((state) => state.clear);
  const quantities = usePantryStore((state) => state.quantities);
  const increment = usePantryStore((state) => state.increment);
  const decrement = usePantryStore((state) => state.decrement);

  const [revealKey, setRevealKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setRevealKey((current) => current + 1);
    }, [])
  );

  const groups = useMemo(() => groupByCategory(ingredientsByIds(ingredientIds)), [ingredientIds]);
  const itemCount = ingredientIds.length;
  const counterLabel = itemCount === 1 ? '1 ingrediente' : `${itemCount} ingredientes`;
  const openAddModal = () => router.push('/pantry-add');

  const confirmClear = () => {
    Alert.alert('Esvaziar despensa', 'Tirar todos os ingredientes da sua despensa?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Esvaziar', style: 'destructive', onPress: clear },
    ]);
  };

  if (!hasHydrated) {
    return <LoadingView />;
  }

  if (!essentialsResolved) {
    return <EssentialsPrompt />;
  }

  return (
    <Screen>
      <View style={styles.header}>
        <View>
          <Text style={[typography.screenTitle, { color: colors.textPrimary }]}>Despensa</Text>
          <Text style={[typography.caption, { color: colors.textSecondary }]}>{counterLabel}</Text>
        </View>
        {itemCount > 0 && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Esvaziar despensa"
            onPress={confirmClear}
            hitSlop={spacing.md}
            style={styles.headerButton}
          >
            <Ionicons name="trash-outline" size={24} color={colors.danger} />
          </Pressable>
        )}
      </View>

      {itemCount > 0 && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Adicionar ingredientes"
          onPress={openAddModal}
          style={[styles.addBar, { backgroundColor: colors.primary }]}
        >
          <Ionicons name="add" size={22} color={colors.onPrimary} />
          <Text style={[styles.addBarLabel, { color: colors.onPrimary }]}>
            Adicionar ingredientes
          </Text>
        </Pressable>
      )}
      {itemCount === 0 ? (
        <EmptyState
          illustration={<EmptyPantryIllustration />}
          title="Vamos encher essa despensa?"
          message="Adicione o que você já tem em casa — mesmo que sejam só três ingredientes."
          actionLabel="Adicionar ingredientes"
          onActionPress={openAddModal}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {groups.map((group, index) => (
            <FadeIn key={`${group.category}-${revealKey}`} delay={index * 70} distance={22}>
              <Section title={group.title}>
                {group.ingredients.map((ingredient) => (
                  <PantryRow
                    key={ingredient.id}
                    ingredient={ingredient}
                    quantity={quantities[ingredient.id] ?? 1}
                    onIncrement={() => increment(ingredient.id)}
                    onDecrement={() => decrement(ingredient.id)}
                    onRemove={() => remove(ingredient.id)}
                  />
                ))}
              </Section>
            </FadeIn>
          ))}
        </ScrollView>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  headerButton: {
    padding: spacing.xs,
  },
  addBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    height: 48,
    borderRadius: 24,
    marginBottom: spacing.lg,
  },
  addBarLabel: {
    fontSize: 15,
    fontFamily: fonts.bold,
  },
  list: {
    paddingBottom: spacing.xl,
  },
});
