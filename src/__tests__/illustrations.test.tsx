import { render } from '@testing-library/react-native';
import { Text } from 'react-native';

import { EmptyPantryIllustration } from '../components/illustrations/empty-pantry';
import { NoResultsIllustration } from '../components/illustrations/no-results';
import { EmptyState } from '../components/ui/empty-state';

describe('illustrations', () => {
  it('renders the empty pantry illustration', async () => {
    const screen = await render(<EmptyPantryIllustration />);
    expect(screen.root).toBeTruthy();
  });

  it('renders the no results illustration', async () => {
    const screen = await render(<NoResultsIllustration />);
    expect(screen.root).toBeTruthy();
  });

  it('accepts a custom size', async () => {
    const screen = await render(<EmptyPantryIllustration width={120} height={90} />);
    expect(screen.root).toBeTruthy();
  });
});

describe('EmptyState artwork', () => {
  it('renders an illustration when provided', async () => {
    const screen = await render(
      <EmptyState
        illustration={<Text>arte</Text>}
        title="Sua despensa está vazia"
        message="Marque o que você tem em casa."
      />
    );
    expect(screen.getByText('arte')).toBeOnTheScreen();
    expect(screen.getByText('Sua despensa está vazia')).toBeOnTheScreen();
  });

  it('prefers the illustration over the emoji when both are given', async () => {
    const screen = await render(
      <EmptyState
        illustration={<Text>arte</Text>}
        emoji="🧺"
        title="Vazio"
        message="Nada aqui ainda."
      />
    );
    expect(screen.getByText('arte')).toBeOnTheScreen();
    expect(screen.queryByText('🧺')).toBeNull();
  });

  it('still renders the emoji when there is no illustration', async () => {
    const screen = await render(<EmptyState emoji="🧺" title="Vazio" message="Nada aqui." />);
    expect(screen.getByText('🧺')).toBeOnTheScreen();
  });
});
