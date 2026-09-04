export type Difficulty = 'facil' | 'medio' | 'dificil';

export interface RecipeIngredient {
  id: string;
  measure?: string;
}

export interface Recipe {
  id: string;
  name: string;
  minutes: number;
  servings: number;
  difficulty: Difficulty;
  photoUrl?: string;
  ingredients: RecipeIngredient[];
  steps: string[];
}

export interface RecipeMatch {
  recipe: Recipe;
  missingIds: string[];
  availableCount: number;
  isComplete: boolean;
}
