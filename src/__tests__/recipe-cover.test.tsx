import { fireEvent, render } from '@testing-library/react-native';

import { matchRecipes } from '@/features/recipes/match';
import { Recipe } from '@/features/recipes/types';

import { RecipeCard, missingLabel } from '../features/recipes/components/recipe-card';
import { RecipeCover } from '../features/recipes/components/recipe-cover';

function buildRecipe(overrides: Partial<Recipe> = {}): Recipe {
  return {
    id: 'omelete',
    name: 'Omelete simples',
    minutes: 10,
    servings: 1,
    difficulty: 'facil',
    ingredients: [{ id: 'ovo' }, { id: 'sal' }, { id: 'manteiga' }],
    steps: ['Bata os ovos.', 'Frite.'],
    ...overrides,
  };
}

describe('RecipeCover', () => {
  it('composes ingredient icons when the recipe has no photo', async () => {
    const screen = await render(<RecipeCover recipe={buildRecipe()} />);
    expect(screen.getByTestId('recipe-cover-art')).toBeOnTheScreen();
    expect(screen.queryByTestId('recipe-cover-photo')).toBeNull();
  });

  it('shows the photo when the recipe has a url', async () => {
    const recipe = buildRecipe({ photoUrl: 'https://example.com/omelete.jpg' });
    const screen = await render(<RecipeCover recipe={recipe} />);
    expect(screen.getByTestId('recipe-cover-photo')).toBeOnTheScreen();
    expect(screen.queryByTestId('recipe-cover-art')).toBeNull();
  });

  it('falls back to the composition when the photo fails to load', async () => {
    const recipe = buildRecipe({ photoUrl: 'https://example.com/quebrada.jpg' });
    const screen = await render(<RecipeCover recipe={recipe} />);
    await fireEvent(screen.getByTestId('recipe-cover-photo'), 'error');
    expect(screen.getByTestId('recipe-cover-art')).toBeOnTheScreen();
  });

  it('renders even when the recipe has a single ingredient', async () => {
    const recipe = buildRecipe({ ingredients: [{ id: 'cafe' }] });
    const screen = await render(<RecipeCover recipe={recipe} />);
    expect(screen.getByTestId('recipe-cover-art')).toBeOnTheScreen();
  });

  it('ignores ingredients that are not in the pantry catalog', async () => {
    const recipe = buildRecipe({ ingredients: [{ id: 'nao-existe' }, { id: 'ovo' }] });
    const screen = await render(<RecipeCover recipe={recipe} />);
    expect(screen.getByTestId('recipe-cover-art')).toBeOnTheScreen();
  });

  it('still renders when no ingredient can be resolved', async () => {
    const recipe = buildRecipe({ ingredients: [{ id: 'nao-existe' }, { id: 'tambem-nao' }] });
    const screen = await render(<RecipeCover recipe={recipe} />);
    expect(screen.getByTestId('recipe-cover-art')).toBeOnTheScreen();
  });
});

describe('missingLabel', () => {
  it.each([
    [0, 'Dá pra fazer'],
    [1, 'Falta 1 ingrediente'],
    [2, 'Faltam 2 ingredientes'],
    [7, 'Faltam 7 ingredientes'],
  ])('renders the label for %s missing ingredients', (count, expected) => {
    expect(missingLabel(count)).toBe(expected);
  });
});

describe('RecipeCard', () => {
  it('shows the success label when the pantry covers the recipe', async () => {
    const [match] = matchRecipes([buildRecipe()], ['ovo', 'sal', 'manteiga']);
    const screen = await render(<RecipeCard match={match} onPress={jest.fn()} />);
    expect(screen.getByText('Dá pra fazer')).toBeOnTheScreen();
  });

  it('shows the singular label when exactly one ingredient is missing', async () => {
    const [match] = matchRecipes([buildRecipe()], ['ovo', 'sal']);
    const screen = await render(<RecipeCard match={match} onPress={jest.fn()} />);
    expect(screen.getByText('Falta 1 ingrediente')).toBeOnTheScreen();
  });

  it('shows the plural label when several ingredients are missing', async () => {
    const [match] = matchRecipes([buildRecipe()], []);
    const screen = await render(<RecipeCard match={match} onPress={jest.fn()} />);
    expect(screen.getByText('Faltam 3 ingredientes')).toBeOnTheScreen();
  });

  it('shows the recipe name and preparation time', async () => {
    const [match] = matchRecipes([buildRecipe()], []);
    const screen = await render(<RecipeCard match={match} onPress={jest.fn()} />);
    expect(screen.getByText('Omelete simples')).toBeOnTheScreen();
    expect(screen.getByText('10 min')).toBeOnTheScreen();
  });

  it('fires onPress when tapped', async () => {
    const onPress = jest.fn();
    const [match] = matchRecipes([buildRecipe()], []);
    const screen = await render(<RecipeCard match={match} onPress={onPress} />);
    await fireEvent.press(screen.getByText('Omelete simples'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('announces name and state together for screen readers', async () => {
    const [match] = matchRecipes([buildRecipe()], ['ovo', 'sal', 'manteiga']);
    const screen = await render(<RecipeCard match={match} onPress={jest.fn()} />);
    expect(screen.getByLabelText('Omelete simples. Dá pra fazer.')).toBeOnTheScreen();
  });
});
