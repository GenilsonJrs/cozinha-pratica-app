import { Recipe, RecipeMatch } from './types';

function compareMatches(first: RecipeMatch, second: RecipeMatch): number {
  if (first.isComplete !== second.isComplete) {
    return first.isComplete ? -1 : 1;
  }

  const missingDifference = first.missingIds.length - second.missingIds.length;
  if (missingDifference !== 0) {
    return missingDifference;
  }

  const firstRatio = first.availableCount * second.recipe.ingredients.length;
  const secondRatio = second.availableCount * first.recipe.ingredients.length;
  if (firstRatio !== secondRatio) {
    return secondRatio - firstRatio;
  }

  return first.recipe.name.localeCompare(second.recipe.name, 'pt-BR');
}

export function matchRecipe(recipe: Recipe, pantryIds: Set<string>): RecipeMatch {
  const missingIds = recipe.ingredients
    .map((ingredient) => ingredient.id)
    .filter((id) => !pantryIds.has(id));

  return {
    recipe,
    missingIds,
    availableCount: recipe.ingredients.length - missingIds.length,
    isComplete: missingIds.length === 0,
  };
}

export function matchRecipes(recipes: Recipe[], pantryIds: string[]): RecipeMatch[] {
  const available = new Set(pantryIds);
  return recipes.map((recipe) => matchRecipe(recipe, available)).sort(compareMatches);
}
