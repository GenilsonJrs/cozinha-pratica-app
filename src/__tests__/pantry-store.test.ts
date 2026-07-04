import AsyncStorage from '@react-native-async-storage/async-storage';

import { usePantryStore } from '../features/pantry/pantry-store';

describe('pantry store', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
    usePantryStore.setState({
      ingredientIds: [],
      essentialsResolved: false,
      hasHydrated: false,
    });
  });

  it('adds a catalog ingredient', () => {
    usePantryStore.getState().add('tomate');
    expect(usePantryStore.getState().ingredientIds).toEqual(['tomate']);
  });

  it('is idempotent when adding the same ingredient twice', () => {
    usePantryStore.getState().add('tomate');
    usePantryStore.getState().add('tomate');
    expect(usePantryStore.getState().ingredientIds).toEqual(['tomate']);
  });

  it('rejects ids that are not in the catalog', () => {
    usePantryStore.getState().add('unicornio');
    expect(usePantryStore.getState().ingredientIds).toEqual([]);
  });

  it('removes an ingredient', () => {
    usePantryStore.getState().add('tomate');
    usePantryStore.getState().add('cebola');
    usePantryStore.getState().remove('tomate');
    expect(usePantryStore.getState().ingredientIds).toEqual(['cebola']);
  });

  it('clears all ingredients', () => {
    usePantryStore.getState().add('tomate');
    usePantryStore.getState().clear();
    expect(usePantryStore.getState().ingredientIds).toEqual([]);
  });

  it('resolves essentials only once', () => {
    usePantryStore.getState().resolveEssentials(['sal', 'alho']);
    usePantryStore.getState().resolveEssentials(['acucar']);
    const state = usePantryStore.getState();
    expect(state.ingredientIds).toEqual(['sal', 'alho']);
    expect(state.essentialsResolved).toBe(true);
  });

  it('marks essentials as resolved even when skipped with an empty list', () => {
    usePantryStore.getState().resolveEssentials([]);
    const state = usePantryStore.getState();
    expect(state.ingredientIds).toEqual([]);
    expect(state.essentialsResolved).toBe(true);
  });

  it('ignores invalid ids when resolving essentials', () => {
    usePantryStore.getState().resolveEssentials(['sal', 'unicornio']);
    expect(usePantryStore.getState().ingredientIds).toEqual(['sal']);
  });

  it('keeps essentials resolved after clearing the pantry', () => {
    usePantryStore.getState().resolveEssentials(['sal']);
    usePantryStore.getState().clear();
    const state = usePantryStore.getState();
    expect(state.ingredientIds).toEqual([]);
    expect(state.essentialsResolved).toBe(true);
  });
});

describe('pantry store hydration', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
    usePantryStore.setState({
      ingredientIds: [],
      essentialsResolved: false,
      hasHydrated: false,
    });
  });

  it('drops persisted ids that no longer exist in the catalog', async () => {
    await AsyncStorage.setItem(
      'pantry-storage',
      JSON.stringify({
        state: { ingredientIds: ['tomate', 'ingrediente-extinto'], essentialsResolved: true },
        version: 1,
      }),
    );
    await usePantryStore.persist.rehydrate();
    const state = usePantryStore.getState();
    expect(state.ingredientIds).toEqual(['tomate']);
    expect(state.essentialsResolved).toBe(true);
    expect(state.hasHydrated).toBe(true);
  });

  it('falls back to the initial state on corrupted payload', async () => {
    await AsyncStorage.setItem('pantry-storage', 'not-json{');
    await usePantryStore.persist.rehydrate();
    const state = usePantryStore.getState();
    expect(state.ingredientIds).toEqual([]);
    expect(state.essentialsResolved).toBe(false);
    expect(state.hasHydrated).toBe(true);
  });

  it('flips hasHydrated after rehydration with empty storage', async () => {
    await usePantryStore.persist.rehydrate();
    expect(usePantryStore.getState().hasHydrated).toBe(true);
  });
});
