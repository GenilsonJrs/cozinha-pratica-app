import { recipes } from './catalog';
import { Recipe } from './types';

export interface RecipeSource {
  list: () => Recipe[];
  byId: (id: string) => Recipe | undefined;
}

export const embeddedRecipeSource: RecipeSource = {
  list: () => recipes,
  byId: (id) => recipes.find((recipe) => recipe.id === id),
};
