import { ingredients } from '../features/pantry/catalog';
import { normalizeText, searchCatalog } from '../features/pantry/search';

describe('normalizeText', () => {
  it('lowercases and strips accents', () => {
    expect(normalizeText('AÇÚcar')).toBe('acucar');
    expect(normalizeText('Pão Francês')).toBe('pao frances');
  });

  it('trims surrounding whitespace', () => {
    expect(normalizeText('  Leite  ')).toBe('leite');
  });
});

describe('searchCatalog', () => {
  it('finds accented names from unaccented queries', () => {
    const names = searchCatalog('acucar').map((ingredient) => ingredient.name);
    expect(names).toContain('Açúcar');
  });

  it('ignores letter case in the query', () => {
    const names = searchCatalog('AÇÚCAR').map((ingredient) => ingredient.name);
    expect(names).toContain('Açúcar');
  });

  it('matches by substring', () => {
    const names = searchCatalog('feij').map((ingredient) => ingredient.name);
    expect(names).toEqual(expect.arrayContaining(['Feijão carioca', 'Feijão preto']));
  });

  it('returns the full catalog for an empty query', () => {
    expect(searchCatalog('')).toHaveLength(ingredients.length);
    expect(searchCatalog('   ')).toHaveLength(ingredients.length);
  });

  it('returns no results for unknown ingredients', () => {
    expect(searchCatalog('chocolate belga importado')).toHaveLength(0);
  });
});
