import { ingredients } from '@/features/pantry/catalog';

import { Recipe } from './types';

const namesById = new Map(ingredients.map((ingredient) => [ingredient.id, ingredient.name]));

function nameOf(id: string): string {
  return namesById.get(id) ?? id;
}

interface Candidate {
  id: string;
  frequency: number;
  unlocks: number;
}

export function suggestIngredients(
  recipes: Recipe[],
  pantryIds: string[],
  limit?: number,
): string[] {
  const available = new Set(pantryIds);
  const candidates = new Map<string, Candidate>();

  function candidateFor(id: string): Candidate {
    const existing = candidates.get(id);
    if (existing) {
      return existing;
    }
    const created: Candidate = { id, frequency: 0, unlocks: 0 };
    candidates.set(id, created);
    return created;
  }

  for (const recipe of recipes) {
    const missing = [
      ...new Set(
        recipe.ingredients.map((ingredient) => ingredient.id).filter((id) => !available.has(id)),
      ),
    ];

    for (const id of missing) {
      candidateFor(id).frequency += 1;
    }

    if (missing.length === 1) {
      candidateFor(missing[0]).unlocks += 1;
    }
  }

  return [...candidates.values()]
    .sort(
      (first, second) =>
        second.unlocks - first.unlocks ||
        second.frequency - first.frequency ||
        nameOf(first.id).localeCompare(nameOf(second.id), 'pt-BR'),
    )
    .map((candidate) => candidate.id)
    .slice(0, limit);
}
