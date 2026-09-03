import { render } from '@testing-library/react-native';
import Svg from 'react-native-svg';

import { IngredientArt } from '../components/ui/ingredient-art';
import { IngredientIcon } from '../components/ui/ingredient-icon';
import { iconFor } from '../features/pantry/ingredient-icons';
import { ArtName, ArtPalettes, darkArt, lightArt } from '../theme/ingredient-art';

const artNames = Object.keys(lightArt) as ArtName[];

const themed: [ArtName, string, ArtPalettes][] = artNames.flatMap(
  (name): [ArtName, string, ArtPalettes][] => [
    [name, 'claro', lightArt],
    [name, 'escuro', darkArt],
  ],
);

const dedicated: [string, ArtName][] = [
  ['tomate', 'tomate'],
  ['cebola', 'cebola'],
  ['alho', 'alho'],
  ['ovo', 'ovo'],
  ['leite', 'leite'],
  ['cenoura', 'cenoura'],
  ['batata', 'batata'],
  ['banana', 'banana'],
  ['arroz-branco', 'arroz'],
  ['arroz-integral', 'arroz'],
  ['feijao-carioca', 'feijao'],
  ['feijao-preto', 'feijao'],
  ['queijo-mussarela', 'queijo'],
  ['queijo-minas', 'queijo'],
  ['cafe', 'cafe'],
];

describe('ingredient art', () => {
  it('covers the twelve approved ingredients', () => {
    expect(artNames).toHaveLength(12);
  });

  it.each(themed)('renders %s on the %s theme', async (name, _label, palettes) => {
    const screen = await render(
      <Svg>
        <IngredientArt name={name} palettes={palettes} />
      </Svg>,
    );
    expect(screen.root).toBeTruthy();
  });

  it('renders a dedicated art through the public icon component', async () => {
    const screen = await render(<IngredientIcon shape="bag" tint="cream" art="arroz" />);
    expect(screen.root).toBeTruthy();
  });

  it('renders the generic shape when no art is given', async () => {
    const screen = await render(<IngredientIcon shape="long" tint="leaf" />);
    expect(screen.root).toBeTruthy();
  });

  it.each(dedicated)('maps %s to the %s art', (id, expected) => {
    expect(iconFor(id, 'produce').art).toBe(expected);
  });

  it('falls back to the generic shape when there is no dedicated art', () => {
    const icon = iconFor('abobrinha', 'produce');
    expect(icon.art).toBeUndefined();
    expect(icon.shape).toBe('long');
  });

  it('keeps a shape and tint on every dedicated ingredient so nothing breaks mid-migration', () => {
    for (const [id] of dedicated) {
      const icon = iconFor(id, 'produce');
      expect(icon.shape).toBeTruthy();
      expect(icon.tint).toBeTruthy();
    }
  });

  it('changes only the outline between themes', () => {
    for (const name of artNames) {
      const light = lightArt[name] as Record<string, string>;
      const dark = darkArt[name] as Record<string, string>;
      for (const tone of Object.keys(light)) {
        if (tone === 'line') {
          continue;
        }
        expect(dark[tone]).toBe(light[tone]);
      }
    }
  });
});
