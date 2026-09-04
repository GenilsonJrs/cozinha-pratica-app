import { essentialIngredientIds } from '@/features/pantry/essentials';
import { recipes } from '@/features/recipes/catalog';
import { suggestIngredients } from '@/features/recipes/suggestions';
import { Recipe } from '@/features/recipes/types';

function buildRecipe(name: string, ingredientIds: string[]): Recipe {
  return {
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    minutes: 10,
    servings: 2,
    difficulty: 'facil',
    ingredients: ingredientIds.map((id) => ({ id })),
    steps: ['Passo unico.'],
  };
}

describe('suggestIngredients ranking', () => {
  it('falls back to overall frequency when the pantry is empty', () => {
    const list = [
      buildRecipe('Uma', ['sal', 'ovo']),
      buildRecipe('Duas', ['sal', 'leite']),
      buildRecipe('Tres', ['sal', 'cafe']),
    ];
    expect(suggestIngredients(list, [])[0]).toBe('sal');
  });

  it('prefers an ingredient that unlocks a recipe over a more frequent one', () => {
    const list = [
      buildRecipe('Falta so o ovo', ['sal', 'ovo']),
      buildRecipe('Longe A', ['leite', 'cafe', 'acucar']),
      buildRecipe('Longe B', ['leite', 'cafe', 'acucar']),
      buildRecipe('Longe C', ['leite', 'cafe', 'acucar']),
    ];
    const suggestions = suggestIngredients(list, ['sal']);
    expect(suggestions[0]).toBe('ovo');
    expect(suggestions).toContain('leite');
  });

  it('counts how many recipes each ingredient would unlock', () => {
    const list = [
      buildRecipe('Uma', ['sal', 'ovo']),
      buildRecipe('Duas', ['acucar', 'ovo']),
      buildRecipe('Tres', ['leite', 'cafe']),
    ];
    expect(suggestIngredients(list, ['sal', 'acucar'])[0]).toBe('ovo');
  });

  it('never suggests an ingredient already in the pantry', () => {
    const list = [buildRecipe('Uma', ['sal', 'ovo', 'leite'])];
    expect(suggestIngredients(list, ['sal', 'ovo'])).toEqual(['leite']);
  });

  it('returns nothing when the pantry already covers every recipe', () => {
    const list = [buildRecipe('Uma', ['sal', 'ovo'])];
    expect(suggestIngredients(list, ['sal', 'ovo'])).toEqual([]);
  });

  it('breaks a full tie by ingredient name', () => {
    const list = [buildRecipe('Uma', ['acucar', 'banana'])];
    expect(suggestIngredients(list, [])).toEqual(['acucar', 'banana']);
  });

  it('falls back to the raw id when the ingredient has no catalog name', () => {
    const list = [buildRecipe('Uma', ['zzz-desconhecido', 'acucar'])];
    expect(suggestIngredients(list, [])).toEqual(['acucar', 'zzz-desconhecido']);
  });

  it('respects the limit when given', () => {
    const list = [buildRecipe('Uma', ['sal', 'ovo', 'leite', 'cafe'])];
    expect(suggestIngredients(list, [], 2)).toHaveLength(2);
  });

  it('produces the same order regardless of the input order', () => {
    const list = [
      buildRecipe('Uma', ['sal', 'ovo']),
      buildRecipe('Duas', ['leite', 'cafe']),
      buildRecipe('Tres', ['acucar', 'banana']),
    ];
    const forward = suggestIngredients(list, []);
    const backward = suggestIngredients([...list].reverse(), []);
    expect(backward).toEqual(forward);
  });
});

describe('suggestIngredients over the real catalog', () => {
  it('never suggests something the essentials already cover', () => {
    const suggestions = suggestIngredients(recipes, essentialIngredientIds);
    const overlap = suggestions.filter((id) => essentialIngredientIds.includes(id));
    expect(overlap).toEqual([]);
  });

  it('suggests the egg first, since it alone unlocks a recipe', () => {
    expect(suggestIngredients(recipes, essentialIngredientIds)[0]).toBe('ovo');
  });

  it('only suggests ingredients that some recipe actually asks for', () => {
    const wanted = new Set(
      recipes.flatMap((recipe) => recipe.ingredients.map((ingredient) => ingredient.id)),
    );
    const suggestions = suggestIngredients(recipes, essentialIngredientIds);
    expect(suggestions.every((id) => wanted.has(id))).toBe(true);
  });
});
