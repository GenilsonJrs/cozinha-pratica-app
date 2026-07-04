import { fireEvent, render } from '@testing-library/react-native';

import PantryAddScreen from '../app/pantry-add';
import { usePantryStore } from '../features/pantry/pantry-store';

function resetPantry(ingredientIds: string[] = []) {
  usePantryStore.setState({
    ingredientIds,
    essentialsResolved: true,
    hasHydrated: true,
  });
}

describe('PantryAddScreen', () => {
  beforeEach(() => {
    resetPantry();
  });

  it('filters the catalog ignoring accents while typing', async () => {
    const screen = await render(<PantryAddScreen />);
    await fireEvent.changeText(screen.getByLabelText('Buscar ingrediente'), 'acucar');
    expect(screen.getByText('Açúcar')).toBeOnTheScreen();
    expect(screen.queryByText('Tomate')).toBeNull();
  });

  it('shows the full grouped catalog when the query is empty', async () => {
    const screen = await render(<PantryAddScreen />);
    expect(screen.getByText('Hortifrúti')).toBeOnTheScreen();
    expect(screen.getByText('Bebidas e outros')).toBeOnTheScreen();
  });

  it('adds an ingredient on tap and removes it on a second tap', async () => {
    const screen = await render(<PantryAddScreen />);
    await fireEvent.changeText(screen.getByLabelText('Buscar ingrediente'), 'tomate');
    await fireEvent.press(screen.getByLabelText('Adicionar Tomate'));
    expect(usePantryStore.getState().ingredientIds).toContain('tomate');
    await fireEvent.press(screen.getByLabelText('Remover Tomate'));
    expect(usePantryStore.getState().ingredientIds).not.toContain('tomate');
  });

  it('marks ingredients that are already in the pantry', async () => {
    resetPantry(['leite']);
    const screen = await render(<PantryAddScreen />);
    await fireEvent.changeText(screen.getByLabelText('Buscar ingrediente'), 'leite');
    expect(screen.getByLabelText('Remover Leite')).toBeOnTheScreen();
  });

  it('shows a clear empty state when nothing matches', async () => {
    const screen = await render(<PantryAddScreen />);
    await fireEvent.changeText(screen.getByLabelText('Buscar ingrediente'), 'chocolate belga');
    expect(screen.getByText('Nenhum ingrediente encontrado')).toBeOnTheScreen();
  });
});
