export type IngredientCategory =
  'produce' | 'protein' | 'grains' | 'dairy' | 'seasonings' | 'canned' | 'bakery' | 'beverages';

export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
}
