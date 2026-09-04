import { ingredients } from '@/features/pantry/catalog';
import { recipes } from '@/features/recipes/catalog';
import { embeddedRecipeSource } from '@/features/recipes/source';

const catalogIds = new Set(ingredients.map((ingredient) => ingredient.id));

describe('recipe catalog integrity', () => {
  it('has recipes', () => {
    expect(recipes.length).toBeGreaterThan(0);
  });

  it('has unique recipe ids', () => {
    const ids = recipes.map((recipe) => recipe.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(recipes.map((recipe) => [recipe.id, recipe] as const))(
    '%s only references ingredients that exist in the pantry catalog',
    (_id, recipe) => {
      const unknown = recipe.ingredients
        .map((ingredient) => ingredient.id)
        .filter((id) => !catalogIds.has(id));
      expect(unknown).toEqual([]);
    },
  );

  it.each(recipes.map((recipe) => [recipe.id, recipe] as const))(
    '%s has no duplicated ingredients',
    (_id, recipe) => {
      const ids = recipe.ingredients.map((ingredient) => ingredient.id);
      expect(new Set(ids).size).toBe(ids.length);
    },
  );

  it.each(recipes.map((recipe) => [recipe.id, recipe] as const))(
    '%s has ingredients and steps',
    (_id, recipe) => {
      expect(recipe.ingredients.length).toBeGreaterThan(0);
      expect(recipe.steps.length).toBeGreaterThan(0);
      expect(recipe.steps.every((step) => step.trim().length > 0)).toBe(true);
    },
  );

  it.each(recipes.map((recipe) => [recipe.id, recipe] as const))(
    '%s has a name, positive time and positive servings',
    (_id, recipe) => {
      expect(recipe.name.trim().length).toBeGreaterThan(0);
      expect(recipe.minutes).toBeGreaterThan(0);
      expect(recipe.servings).toBeGreaterThan(0);
    },
  );
});

describe('water is never a matchable ingredient', () => {
  it('is absent from the pantry catalog', () => {
    expect(catalogIds.has('agua')).toBe(false);
  });

  it.each(recipes.map((recipe) => [recipe.id, recipe] as const))(
    '%s does not list water among its ingredients',
    (_id, recipe) => {
      const waterIds = recipe.ingredients
        .map((ingredient) => ingredient.id)
        .filter((id) => id === 'agua');
      expect(waterIds).toEqual([]);
    },
  );
});

describe('embedded recipe source', () => {
  it('lists every recipe', () => {
    expect(embeddedRecipeSource.list()).toHaveLength(recipes.length);
  });

  it('finds a recipe by id', () => {
    expect(embeddedRecipeSource.byId('cafe-coado')?.name).toBe('Café coado');
  });

  it('returns undefined for an unknown id', () => {
    expect(embeddedRecipeSource.byId('receita-que-nao-existe')).toBeUndefined();
  });
});
