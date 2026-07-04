import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { groupByCategory, ingredientsByIds } from '@/features/pantry/categories';
import { CategorySection } from '@/features/pantry/components/category-section';
import { EssentialsPrompt } from '@/features/pantry/components/essentials-prompt';
import { IngredientRow } from '@/features/pantry/components/ingredient-row';
import { PantryEmptyState } from '@/features/pantry/components/pantry-empty-state';
import { usePantryStore } from '@/features/pantry/pantry-store';

export default function PantryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const ingredientIds = usePantryStore((state) => state.ingredientIds);
  const hasHydrated = usePantryStore((state) => state.hasHydrated);
  const essentialsResolved = usePantryStore((state) => state.essentialsResolved);
  const remove = usePantryStore((state) => state.remove);
  const clear = usePantryStore((state) => state.clear);

  const groups = useMemo(() => groupByCategory(ingredientsByIds(ingredientIds)), [ingredientIds]);
  const itemCount = ingredientIds.length;
  const openAddModal = () => router.push('/pantry-add');

  const confirmClear = () => {
    Alert.alert('Esvaziar despensa', 'Remover todos os itens da sua despensa?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Esvaziar', style: 'destructive', onPress: clear },
    ]);
  };

  if (!hasHydrated) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!essentialsResolved) {
    return <EssentialsPrompt />;
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Despensa</Text>
          <Text style={styles.counter}>{itemCount === 1 ? '1 item' : `${itemCount} itens`}</Text>
        </View>
        <View style={styles.headerActions}>
          {itemCount > 0 && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Esvaziar despensa"
              onPress={confirmClear}
              style={styles.headerButton}
            >
              <Ionicons name="trash-outline" size={24} color="#DC2626" />
            </Pressable>
          )}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Adicionar ingredientes"
            onPress={openAddModal}
            style={styles.headerButton}
          >
            <Ionicons name="add-circle" size={28} color="#208AEF" />
          </Pressable>
        </View>
      </View>
      {itemCount === 0 ? (
        <PantryEmptyState onAddPress={openAddModal} />
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {groups.map((group) => (
            <CategorySection key={group.category} title={group.title}>
              {group.ingredients.map((ingredient) => (
                <IngredientRow
                  key={ingredient.id}
                  name={ingredient.name}
                  iconName="close-circle-outline"
                  iconColor="#9CA3AF"
                  accessibilityLabel={`Remover ${ingredient.name}`}
                  onPress={() => remove(ingredient.id)}
                />
              ))}
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
    paddingHorizontal: 16,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerButton: {
    padding: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  counter: {
    fontSize: 14,
    color: '#6B7280',
  },
  list: {
    paddingBottom: 24,
  },
});
