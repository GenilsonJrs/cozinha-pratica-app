import { fireEvent, render } from '@testing-library/react-native';
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

function setFirstUse() {
  usePantryStore.setState({
    ingredientIds: [],
    essentialsResolved: false,
    hasHydrated: true,
  });
}

describe('EssentialsPrompt', () => {
  beforeEach(() => {
    setFirstUse();
  });

  it('shows all essentials pre-selected on first use', async () => {
    const screen = await renderPantryScreen();
    expect(screen.getByText('Vamos montar sua despensa')).toBeOnTheScreen();
    expect(screen.getByText('Confirmar (8)')).toBeOnTheScreen();
    expect(screen.getByLabelText('Desmarcar Sal')).toBeOnTheScreen();
    expect(screen.getByLabelText('Desmarcar Café')).toBeOnTheScreen();
  });

  it('confirms only the items left selected', async () => {
    const screen = await renderPantryScreen();
    await fireEvent.press(screen.getByLabelText('Desmarcar Café'));
    await fireEvent.press(screen.getByLabelText('Desmarcar Feijão carioca'));
    await fireEvent.press(screen.getByText('Confirmar (6)'));
    const state = usePantryStore.getState();
    expect(state.essentialsResolved).toBe(true);
    expect(state.ingredientIds).toHaveLength(6);
    expect(state.ingredientIds).not.toContain('cafe');
    expect(state.ingredientIds).toContain('sal');
    expect(screen.queryByText('Vamos montar sua despensa')).toBeNull();
    expect(screen.getByText('6 ingredientes')).toBeOnTheScreen();
  });

  it('starts empty when skipped and never shows the prompt again', async () => {
    const screen = await renderPantryScreen();
    await fireEvent.press(screen.getByText('Pular e começar do zero'));
    const state = usePantryStore.getState();
    expect(state.essentialsResolved).toBe(true);
    expect(state.ingredientIds).toEqual([]);
    expect(screen.queryByText('Vamos montar sua despensa')).toBeNull();
    expect(screen.getByText('Sua despensa está vazia')).toBeOnTheScreen();
  });

  it('does not reappear after the pantry is cleared', async () => {
    usePantryStore.getState().resolveEssentials(['sal']);
    usePantryStore.getState().clear();
    const screen = await renderPantryScreen();
    expect(screen.queryByText('Vamos montar sua despensa')).toBeNull();
    expect(screen.getByText('Sua despensa está vazia')).toBeOnTheScreen();
  });

  it('is not shown before hydration completes', async () => {
    usePantryStore.setState({ hasHydrated: false });
    const screen = await renderPantryScreen();
    expect(screen.queryByText('Vamos montar sua despensa')).toBeNull();
  });
});
