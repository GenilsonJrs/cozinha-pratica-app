import { fireEvent, render } from '@testing-library/react-native';

import { Button } from '../components/ui/button';
import { EmptyState } from '../components/ui/empty-state';
import { ListRow } from '../components/ui/list-row';
import { SearchInput } from '../components/ui/search-input';

describe('Button', () => {
  it('fires onPress with the given label', async () => {
    const onPress = jest.fn();
    const screen = await render(<Button label="Confirmar" onPress={onPress} />);
    await fireEvent.press(screen.getByText('Confirmar'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not fire when disabled', async () => {
    const onPress = jest.fn();
    const screen = await render(<Button label="Confirmar" onPress={onPress} disabled />);
    await fireEvent.press(screen.getByText('Confirmar'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it.each(['primary', 'secondary', 'destructive', 'ghost'] as const)(
    'renders the %s variant',
    async (variant) => {
      const screen = await render(<Button label="Ação" onPress={jest.fn()} variant={variant} />);
      expect(screen.getByText('Ação')).toBeOnTheScreen();
    },
  );
});

describe('EmptyState', () => {
  it('renders the action button when provided', async () => {
    const onActionPress = jest.fn();
    const screen = await render(
      <EmptyState
        emoji="🧺"
        title="Vazio"
        message="Nada aqui ainda."
        actionLabel="Começar"
        onActionPress={onActionPress}
      />,
    );
    await fireEvent.press(screen.getByText('Começar'));
    expect(onActionPress).toHaveBeenCalled();
  });

  it('omits the action button when not provided', async () => {
    const screen = await render(<EmptyState emoji="🧺" title="Vazio" message="Nada aqui." />);
    expect(screen.queryByRole('button')).toBeNull();
  });
});

describe('ListRow', () => {
  it('exposes the accessibility label and fires onPress', async () => {
    const onPress = jest.fn();
    const screen = await render(
      <ListRow
        title="Tomate"
        iconName="close-circle-outline"
        iconColor="#9CA3AF"
        accessibilityLabel="Remover Tomate"
        onPress={onPress}
      />,
    );
    await fireEvent.press(screen.getByLabelText('Remover Tomate'));
    expect(onPress).toHaveBeenCalled();
  });
});

describe('SearchInput', () => {
  it('propagates text changes', async () => {
    const onChangeText = jest.fn();
    const screen = await render(
      <SearchInput
        value=""
        onChangeText={onChangeText}
        placeholder="Buscar"
        accessibilityLabel="Buscar ingrediente"
      />,
    );
    await fireEvent.changeText(screen.getByLabelText('Buscar ingrediente'), 'acucar');
    expect(onChangeText).toHaveBeenCalledWith('acucar');
  });
});
