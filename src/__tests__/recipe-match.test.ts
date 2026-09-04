import { recipes } from '@/features/recipes/catalog';
import { matchRecipes } from '@/features/recipes/match';
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

function namesInOrder(matched: { recipe: Recipe }[]): string[] {
  return matched.map((match) => match.recipe.name);
}

describe('matchRecipes classification', () => {
  it('marks a recipe as complete when every ingredient is in the pantry', () => {
    const recipe = buildRecipe('Completa', ['ovo', 'sal']);
    const [match] = matchRecipes([recipe], ['ovo', 'sal', 'cafe']);
    expect(match.isComplete).toBe(true);
    expect(match.missingIds).toEqual([]);
    expect(match.availableCount).toBe(2);
  });

  it('lists exactly which ingredients are missing', () => {
    const recipe = buildRecipe('Incompleta', ['ovo', 'sal', 'leite']);
    const [match] = matchRecipes([recipe], ['sal']);
    expect(match.isComplete).toBe(false);
    expect(match.missingIds).toEqual(['ovo', 'leite']);
    expect(match.availableCount).toBe(1);
  });

  it('treats an empty pantry as everything missing', () => {
    const recipe = buildRecipe('Nada', ['ovo', 'sal']);
    const [match] = matchRecipes([recipe], []);
    expect(match.isComplete).toBe(false);
    expect(match.missingIds).toEqual(['ovo', 'sal']);
    expect(match.availableCount).toBe(0);
  });

  it('assumes nothing: a missing basic keeps the recipe incomplete', () => {
    const recipe = buildRecipe('Precisa de sal', ['ovo', 'sal']);
    const [match] = matchRecipes([recipe], ['ovo']);
    expect(match.isComplete).toBe(false);
    expect(match.missingIds).toEqual(['sal']);
  });

  it('ignores repeated pantry entries, since only presence matters', () => {
    const recipe = buildRecipe('Presenca', ['ovo', 'sal']);
    const [match] = matchRecipes([recipe], ['ovo', 'ovo', 'sal', 'sal']);
    expect(match.isComplete).toBe(true);
    expect(match.availableCount).toBe(2);
  });
});

describe('matchRecipes ordering', () => {
  it('puts complete recipes first', () => {
    const list = [
      buildRecipe('Faltando', ['ovo', 'leite']),
      buildRecipe('Pronta', ['sal']),
    ];
    expect(namesInOrder(matchRecipes(list, ['sal']))).toEqual(['Pronta', 'Faltando']);
  });

  it('orders incomplete recipes by fewest missing ingredients', () => {
    const list = [
      buildRecipe('Faltam tres', ['ovo', 'leite', 'cafe']),
      buildRecipe('Falta uma', ['ovo', 'sal']),
    ];
    expect(namesInOrder(matchRecipes(list, ['sal']))).toEqual(['Falta uma', 'Faltam tres']);
  });

  it('breaks a tie on missing count by the higher share of available ingredients', () => {
    const maisCompleta = buildRecipe('Mais completa', ['sal', 'cafe', 'ovo', 'leite']);
    const menosCompleta = buildRecipe('Menos completa', ['sal', 'ovo', 'leite']);
    const ordered = namesInOrder(matchRecipes([menosCompleta, maisCompleta], ['sal', 'cafe']));
    expect(ordered).toEqual(['Mais completa', 'Menos completa']);
  });

  it('breaks a full tie alphabetically by name', () => {
    const list = [
      buildRecipe('Zebra', ['sal', 'ovo']),
      buildRecipe('Abacate', ['sal', 'leite']),
    ];
    expect(namesInOrder(matchRecipes(list, ['sal']))).toEqual(['Abacate', 'Zebra']);
  });

  it('produces the same order regardless of the input order', () => {
    const list = [
      buildRecipe('Zebra', ['sal', 'ovo']),
      buildRecipe('Pronta', ['sal']),
      buildRecipe('Abacate', ['sal', 'leite']),
      buildRecipe('Faltam tres', ['ovo', 'leite', 'cafe']),
    ];
    const forward = namesInOrder(matchRecipes(list, ['sal']));
    const backward = namesInOrder(matchRecipes([...list].reverse(), ['sal']));
    expect(backward).toEqual(forward);
  });
});

describe('matchRecipes over the real catalog', () => {
  const essentials = [
    'sal',
    'acucar',
    'oleo-de-soja',
    'arroz-branco',
    'feijao-carioca',
    'alho',
    'cebola',
    'cafe',
  ];

  it('returns one match per recipe', () => {
    expect(matchRecipes(recipes, essentials)).toHaveLength(recipes.length);
  });

  it('finds complete recipes for a pantry holding only the essentials', () => {
    const complete = matchRecipes(recipes, essentials).filter((match) => match.isComplete);
    expect(complete.length).toBeGreaterThanOrEqual(3);
  });

  it('keeps every complete recipe ahead of every incomplete one', () => {
    const flags = matchRecipes(recipes, essentials).map((match) => match.isComplete);
    const sortedFlags = [...flags].sort((first, second) => Number(second) - Number(first));
    expect(flags).toEqual(sortedFlags);
  });
});
