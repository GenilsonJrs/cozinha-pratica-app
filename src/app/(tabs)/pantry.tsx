import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { EmptyState } from '@/components/ui/empty-state';
import { ListRow } from '@/components/ui/list-row';
import { LoadingView } from '@/components/ui/loading-view';
import { Screen } from '@/components/ui/screen';
import { Section } from '@/components/ui/section';
import { groupByCategory, ingredientsByIds } from '@/features/pantry/categories';
import { EssentialsPrompt } from '@/features/pantry/components/essentials-prompt';
import { usePantryStore } from '@/features/pantry/pantry-store';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { useTheme } from '@/theme/use-theme';

export default function PantryScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const ingredientIds = usePantryStore((state) => state.ingredientIds);
  const hasHydrated = usePantryStore((state) => state.hasHydrated);
  const essentialsResolved = usePantryStore((state) => state.essentialsResolved);
  const remove = usePantryStore((state) => state.remove);
  const clear = usePantryStore((state) => state.clear);

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
        <View style={styles.headerActions}>
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
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Adicionar ingredientes"
            onPress={openAddModal}
            hitSlop={spacing.md}
            style={styles.headerButton}
          >
            <Ionicons name="add-circle" size={30} color={colors.primary} />
          </Pressable>
        </View>
      </View>
      {itemCount === 0 ? (
        <EmptyState
          emoji="🧺"
          title="Sua despensa está vazia"
          message="Marque o que você tem em casa e a gente te mostra o que dá para cozinhar."
          actionLabel="Adicionar ingredientes"
          onActionPress={openAddModal}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {groups.map((group) => (
            <Section key={group.category} title={group.title}>
              {group.ingredients.map((ingredient) => (
                <ListRow
                  key={ingredient.id}
                  title={ingredient.name}
                  iconName="close-circle-outline"
                  iconColor={colors.textSecondary}
                  accessibilityLabel={`Remover ${ingredient.name}`}
                  onPress={() => remove(ingredient.id)}
                />
              ))}
            </Section>
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  headerButton: {
    padding: spacing.xs,
  },
  list: {
    paddingBottom: spacing.xl,
  },
});
