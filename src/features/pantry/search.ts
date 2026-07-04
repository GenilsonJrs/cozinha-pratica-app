import { ingredients } from './catalog';
import { Ingredient } from './types';

export function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function searchCatalog(query: string): Ingredient[] {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) {
    return ingredients;
  }
  return ingredients.filter((ingredient) =>
    normalizeText(ingredient.name).includes(normalizedQuery),
  );
}
