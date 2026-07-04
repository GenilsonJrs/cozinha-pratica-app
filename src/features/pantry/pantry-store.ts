import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { ingredients } from './catalog';

const catalogIds = new Set(ingredients.map((ingredient) => ingredient.id));

interface PersistedPantryState {
  ingredientIds: string[];
  essentialsResolved: boolean;
}

export interface PantryState extends PersistedPantryState {
  hasHydrated: boolean;
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  resolveEssentials: (acceptedIds: string[]) => void;
}

export const usePantryStore = create<PantryState>()(
  persist(
    (set, get) => ({
      ingredientIds: [],
      essentialsResolved: false,
      hasHydrated: false,
      add: (id) => {
        if (!catalogIds.has(id) || get().ingredientIds.includes(id)) {
          return;
        }
        set({ ingredientIds: [...get().ingredientIds, id] });
      },
      remove: (id) => {
        set({ ingredientIds: get().ingredientIds.filter((item) => item !== id) });
      },
      clear: () => {
        set({ ingredientIds: [] });
      },
      resolveEssentials: (acceptedIds) => {
        if (get().essentialsResolved) {
          return;
        }
        const acceptedInCatalog = acceptedIds.filter((id) => catalogIds.has(id));
        set({
          ingredientIds: [...new Set([...get().ingredientIds, ...acceptedInCatalog])],
          essentialsResolved: true,
        });
      },
    }),
    {
      name: 'pantry-storage',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        ingredientIds: state.ingredientIds,
        essentialsResolved: state.essentialsResolved,
      }),
      migrate: (persistedState) => persistedState as PersistedPantryState,
      onRehydrateStorage: () => (state, error) => {
        if (error || !state) {
          usePantryStore.setState({ hasHydrated: true });
          return;
        }
        usePantryStore.setState({
          ingredientIds: state.ingredientIds.filter((id) => catalogIds.has(id)),
          hasHydrated: true,
        });
      },
    },
  ),
);
