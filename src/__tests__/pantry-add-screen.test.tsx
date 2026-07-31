import { fireEvent, render } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import PantryAddScreen from '../app/pantry-add';
import { usePantryStore } from '../features/pantry/pantry-store';

const mockBack = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({ back: mockBack, push: jest.fn() }),
}));

const initialMetrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

function renderAddScreen() {
  return render(
    <SafeAreaProvider initialMetrics={initialMetrics}>
      <PantryAddScreen />
    </SafeAreaProvider>
  );
}

function resetPantry(ingredientIds: string[] = []) {
  usePantryStore.setState({
    ingredientIds,
    quantities: Object.fromEntries(ingredientIds.map((id) => [id, 1])),
    essentialsResolved: true,
    hasHydrated: true,
  });
}

describe('PantryAddScreen', () => {
  beforeEach(() => {
    resetPantry();
    mockBack.mockClear();
  });

  it('returns to the pantry when the done button is pressed', async () => {
    const screen = await renderAddScreen();
    await fireEvent.press(screen.getByLabelText('Concluir e voltar para a despensa'));
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it('counts the selected ingredients in the done bar', async () => {
    resetPantry(['leite', 'ovo']);
    const screen = await renderAddScreen();
    expect(screen.getByText('2')).toBeOnTheScreen();
    expect(screen.getByText('ingredientes')).toBeOnTheScreen();
  });

  it('filters the catalog ignoring accents while typing', async () => {
    const screen = await renderAddScreen();
    await fireEvent.changeText(screen.getByLabelText('Buscar ingrediente'), 'acucar');
    expect(screen.getByText('Açúcar')).toBeOnTheScreen();
    expect(screen.queryByText('Tomate')).toBeNull();
  });

  it('shows the full grouped catalog when the query is empty', async () => {
    const screen = await renderAddScreen();
    expect(screen.getAllByText('Hortifrúti').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Bebidas e outros').length).toBeGreaterThan(0);
  });

  it('offers a quick list of common kitchen staples', async () => {
    const screen = await renderAddScreen();
    expect(screen.getByText('Comuns na cozinha')).toBeOnTheScreen();
  });

  it('adds an ingredient with quantity one on tap', async () => {
    const screen = await renderAddScreen();
    await fireEvent.changeText(screen.getByLabelText('Buscar ingrediente'), 'tomate');
    await fireEvent.press(screen.getByLabelText('Adicionar Tomate'));
    expect(usePantryStore.getState().ingredientIds).toContain('tomate');
    expect(usePantryStore.getState().quantities.tomate).toBe(1);
  });

  it('raises and lowers the quantity with the counter', async () => {
    resetPantry(['leite']);
    const screen = await renderAddScreen();
    await fireEvent.changeText(screen.getByLabelText('Buscar ingrediente'), 'leite');

    await fireEvent.press(screen.getByLabelText('Aumentar Leite'));
    expect(usePantryStore.getState().quantities.leite).toBe(2);

    await fireEvent.press(screen.getByLabelText('Diminuir Leite'));
    expect(usePantryStore.getState().quantities.leite).toBe(1);
  });

  it('removes the ingredient when the quantity reaches zero', async () => {
    resetPantry(['leite']);
    const screen = await renderAddScreen();
    await fireEvent.changeText(screen.getByLabelText('Buscar ingrediente'), 'leite');

    await fireEvent.press(screen.getByLabelText('Diminuir Leite'));
    expect(usePantryStore.getState().ingredientIds).not.toContain('leite');
    expect(usePantryStore.getState().quantities.leite).toBeUndefined();
  });

  it('marks ingredients that are already in the pantry', async () => {
    resetPantry(['leite']);
    const screen = await renderAddScreen();
    await fireEvent.changeText(screen.getByLabelText('Buscar ingrediente'), 'leite');
    expect(screen.getByLabelText('Leite na despensa')).toBeOnTheScreen();
  });

  it('narrows the catalog with a category filter', async () => {
    const screen = await renderAddScreen();
    await fireEvent.press(screen.getByLabelText('Bebidas e outros'));
    expect(screen.getByText('Café')).toBeOnTheScreen();
    expect(screen.queryByText('Tomate')).toBeNull();
  });

  it('shows a clear empty state when nothing matches', async () => {
    const screen = await renderAddScreen();
    await fireEvent.changeText(screen.getByLabelText('Buscar ingrediente'), 'chocolate belga');
    expect(screen.getByText('Não achamos esse ingrediente')).toBeOnTheScreen();
  });
});
