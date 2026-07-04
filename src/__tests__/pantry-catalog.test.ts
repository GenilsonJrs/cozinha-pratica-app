import { ingredients } from '../features/pantry/catalog';
import { essentialIngredientIds } from '../features/pantry/essentials';
import { IngredientCategory } from '../features/pantry/types';

const allCategories: IngredientCategory[] = [
  'produce',
  'protein',
  'grains',
  'dairy',
  'seasonings',
  'canned',
  'bakery',
  'beverages',
];

describe('catalog', () => {
  it('has at least 120 ingredients', () => {
    expect(ingredients.length).toBeGreaterThanOrEqual(120);
  });

  it('has unique ids', () => {
    const ids = ingredients.map((ingredient) => ingredient.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has unique names', () => {
    const names = ingredients.map((ingredient) => ingredient.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('uses kebab-case ids without accents', () => {
    for (const ingredient of ingredients) {
      expect(ingredient.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it('has ingredients in every category', () => {
    for (const category of allCategories) {
      const count = ingredients.filter((ingredient) => ingredient.category === category).length;
      expect(count).toBeGreaterThan(0);
    }
  });
});

describe('essentials', () => {
  it('only references ingredients that exist in the catalog', () => {
    const catalogIds = new Set(ingredients.map((ingredient) => ingredient.id));
    for (const id of essentialIngredientIds) {
      expect(catalogIds.has(id)).toBe(true);
    }
  });

  it('has no duplicates', () => {
    expect(new Set(essentialIngredientIds).size).toBe(essentialIngredientIds.length);
  });
});
