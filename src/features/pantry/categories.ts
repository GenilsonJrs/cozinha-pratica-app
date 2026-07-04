import { ingredients } from './catalog';
import { Ingredient, IngredientCategory } from './types';

export const categoryOrder: IngredientCategory[] = [
  'produce',
  'protein',
  'grains',
  'dairy',
  'seasonings',
  'canned',
  'bakery',
  'beverages',
];

export const categoryLabels: Record<IngredientCategory, string> = {
  produce: 'Hortifrúti',
  protein: 'Proteínas',
  grains: 'Grãos e massas',
  dairy: 'Laticínios e ovos',
  seasonings: 'Temperos',
  canned: 'Enlatados e conservas',
  bakery: 'Padaria',
  beverages: 'Bebidas e outros',
};

export interface CategoryGroup {
  category: IngredientCategory;
  title: string;
  ingredients: Ingredient[];
}

export function groupByCategory(items: Ingredient[]): CategoryGroup[] {
  return categoryOrder
    .map((category) => ({
      category,
      title: categoryLabels[category],
      ingredients: items
        .filter((ingredient) => ingredient.category === category)
        .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR')),
    }))
    .filter((group) => group.ingredients.length > 0);
}

export function ingredientsByIds(ids: string[]): Ingredient[] {
  const idSet = new Set(ids);
  return ingredients.filter((ingredient) => idSet.has(ingredient.id));
}
