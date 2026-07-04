import { fireEvent, render } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import PantryScreen from '../app/(tabs)/pantry';
import { usePantryStore } from '../features/pantry/pantry-store';

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

const initialMetrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

function renderPantryScreen() {
  return render(
    <SafeAreaProvider initialMetrics={initialMetrics}>
      <PantryScreen />
    </SafeAreaProvider>,
  );
}

function setPantry(ingredientIds: string[], hasHydrated = true) {
  usePantryStore.setState({
    ingredientIds,
    essentialsResolved: true,
    hasHydrated,
  });
}

describe('PantryScreen', () => {
  beforeEach(() => {
    setPantry([]);
  });

  it('shows a loading indicator before hydration', async () => {
    setPantry([], false);
    const screen = await renderPantryScreen();
    expect(screen.queryByText('Sua despensa está vazia')).toBeNull();
  });

  it('shows the empty state when there are no ingredients', async () => {
    const screen = await renderPantryScreen();
    expect(screen.getByText('Sua despensa está vazia')).toBeOnTheScreen();
  });

  it('groups ingredients by category with a total counter', async () => {
    setPantry(['tomate', 'cebola', 'leite']);
    const screen = await renderPantryScreen();
    expect(screen.getByText('3 itens')).toBeOnTheScreen();
    expect(screen.getByText('Hortifrúti')).toBeOnTheScreen();
    expect(screen.getByText('Laticínios e ovos')).toBeOnTheScreen();
    expect(screen.getByText('Tomate')).toBeOnTheScreen();
    expect(screen.getByText('Leite')).toBeOnTheScreen();
  });

  it('uses the singular label for a single item', async () => {
    setPantry(['tomate']);
    const screen = await renderPantryScreen();
    expect(screen.getByText('1 item')).toBeOnTheScreen();
  });

  it('removes an ingredient when its row is pressed', async () => {
    setPantry(['tomate', 'cebola']);
    const screen = await renderPantryScreen();
    await fireEvent.press(screen.getByLabelText('Remover Tomate'));
    expect(usePantryStore.getState().ingredientIds).toEqual(['cebola']);
  });

  it('clears the pantry only after confirmation', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    setPantry(['tomate']);
    const screen = await renderPantryScreen();
    await fireEvent.press(screen.getByLabelText('Esvaziar despensa'));
    expect(alertSpy).toHaveBeenCalled();
    expect(usePantryStore.getState().ingredientIds).toEqual(['tomate']);
    const buttons = alertSpy.mock.calls[0][2];
    const destructive = buttons?.find((button) => button.style === 'destructive');
    destructive?.onPress?.();
    expect(usePantryStore.getState().ingredientIds).toEqual([]);
    alertSpy.mockRestore();
  });
});
