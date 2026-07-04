import { render } from '@testing-library/react-native';

import HomeScreen from '../app/index';

describe('HomeScreen', () => {
  it('renders the app name', async () => {
    const screen = await render(<HomeScreen />);
    expect(screen.getByText('Cozinha Prática')).toBeOnTheScreen();
  });
});
