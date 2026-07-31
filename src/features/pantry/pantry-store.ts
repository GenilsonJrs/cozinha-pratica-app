import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { ingredients } from './catalog';

const catalogIds = new Set(ingredients.map((ingredient) => ingredient.id));

export const MAX_QUANTITY = 99;

interface PersistedPantryState {
  ingredientIds: string[];
  quantities: Record<string, number>;
  essentialsResolved: boolean;
}

export interface PantryState extends PersistedPantryState {
  hasHydrated: boolean;
  add: (id: string) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clear: () => void;
  resolveEssentials: (acceptedIds: string[]) => void;
}

function withoutKey(source: Record<string, number>, key: string): Record<string, number> {
  const next = { ...source };
  delete next[key];
  return next;
}

function fillQuantities(ids: string[], current: Record<string, number>): Record<string, number> {
  return ids.reduce<Record<string, number>>((accumulator, id) => {
    accumulator[id] = current[id] ?? 1;
    return accumulator;
  }, {});
}

export const usePantryStore = create<PantryState>()(
  persist(
    (set, get) => ({
      ingredientIds: [],
      quantities: {},
      essentialsResolved: false,
      hasHydrated: false,
      add: (id) => {
        if (!catalogIds.has(id) || get().ingredientIds.includes(id)) {
          return;
        }
        set({
          ingredientIds: [...get().ingredientIds, id],
          quantities: { ...get().quantities, [id]: 1 },
        });
      },
      remove: (id) => {
        set({
          ingredientIds: get().ingredientIds.filter((item) => item !== id),
          quantities: withoutKey(get().quantities, id),
        });
      },
      setQuantity: (id, quantity) => {
        if (!catalogIds.has(id)) {
          return;
        }
        if (quantity <= 0) {
          get().remove(id);
          return;
        }
        const capped = Math.min(Math.floor(quantity), MAX_QUANTITY);
        const isKnown = get().ingredientIds.includes(id);
        set({
          ingredientIds: isKnown ? get().ingredientIds : [...get().ingredientIds, id],
          quantities: { ...get().quantities, [id]: capped },
        });
      },
      increment: (id) => {
        get().setQuantity(id, (get().quantities[id] ?? 0) + 1);
      },
      decrement: (id) => {
        get().setQuantity(id, (get().quantities[id] ?? 0) - 1);
      },
      clear: () => {
        set({ ingredientIds: [], quantities: {} });
      },
      resolveEssentials: (acceptedIds) => {
        if (get().essentialsResolved) {
          return;
        }
        const acceptedInCatalog = acceptedIds.filter((id) => catalogIds.has(id));
        const mergedIds = [...new Set([...get().ingredientIds, ...acceptedInCatalog])];
        set({
          ingredientIds: mergedIds,
          quantities: fillQuantities(mergedIds, get().quantities),
          essentialsResolved: true,
        });
      },
    }),
    {
      name: 'pantry-storage',
      version: 2,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        ingredientIds: state.ingredientIds,
        quantities: state.quantities,
        essentialsResolved: state.essentialsResolved,
      }),
      migrate: (persistedState) => {
        const state = persistedState as Partial<PersistedPantryState>;
        const ids = state?.ingredientIds ?? [];
        return {
          ingredientIds: ids,
          quantities: fillQuantities(ids, state?.quantities ?? {}),
          essentialsResolved: state?.essentialsResolved ?? false,
        } as PersistedPantryState;
      },
      onRehydrateStorage: () => (state, error) => {
        if (error || !state) {
          usePantryStore.setState({ hasHydrated: true });
          return;
        }
        const validIds = state.ingredientIds.filter((id) => catalogIds.has(id));
        usePantryStore.setState({
          ingredientIds: validIds,
          quantities: fillQuantities(validIds, state.quantities ?? {}),
          hasHydrated: true,
        });
      },
    }
  )
);
