import { fireEvent, render } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from '../app/(tabs)/index';
import { greetingForHour } from '../features/home/greeting';
import { usePantryStore } from '../features/pantry/pantry-store';

const mockPush = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: mockPush }),
}));

const initialMetrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

function renderHomeScreen() {
  return render(
    <SafeAreaProvider initialMetrics={initialMetrics}>
      <HomeScreen />
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

describe('greetingForHour', () => {
  it.each([
    [5, 'Bom dia!'],
    [9, 'Bom dia!'],
    [11, 'Bom dia!'],
    [12, 'Boa tarde!'],
    [17, 'Boa tarde!'],
    [18, 'Boa noite!'],
    [23, 'Boa noite!'],
    [0, 'Boa noite!'],
    [4, 'Boa noite!'],
  ])('greets correctly at %ih', (hour, expected) => {
    expect(greetingForHour(hour)).toBe(expected);
  });
});

describe('HomeScreen', () => {
  beforeEach(() => {
    mockPush.mockClear();
    setPantry([]);
  });

  it('shows the greeting for the current hour', async () => {
    jest.spyOn(Date.prototype, 'getHours').mockReturnValue(9);
    const screen = await renderHomeScreen();
    expect(screen.getByText('Bom dia!')).toBeOnTheScreen();
    jest.restoreAllMocks();
  });

  it('summarizes an empty pantry', async () => {
    const screen = await renderHomeScreen();
    expect(screen.getByText('Sua despensa ainda está vazia.')).toBeOnTheScreen();
  });

  it('summarizes the pantry count with plural handling', async () => {
    setPantry(['tomate', 'cebola']);
    const screen = await renderHomeScreen();
    expect(screen.getByText('Você tem 2 ingredientes na despensa.')).toBeOnTheScreen();
  });

  it('summarizes a single ingredient', async () => {
    setPantry(['tomate']);
    const screen = await renderHomeScreen();
    expect(screen.getByText('Você tem 1 ingrediente na despensa.')).toBeOnTheScreen();
  });

  it('opens the add modal from the call to action', async () => {
    const screen = await renderHomeScreen();
    await fireEvent.press(screen.getByText('Adicionar ingredientes'));
    expect(mockPush).toHaveBeenCalledWith('/pantry-add');
  });

  it('announces that recipes are coming', async () => {
    const screen = await renderHomeScreen();
    expect(screen.getByText('🍲 Receitas em breve')).toBeOnTheScreen();
  });
});
