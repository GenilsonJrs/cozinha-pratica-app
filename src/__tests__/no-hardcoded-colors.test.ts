import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const sourceRoot = join(__dirname, '..');

const legacyExceptions = new Set<string>([]);

const colorLiteral = /#[0-9a-fA-F]{3,8}\b|rgba?\(/;

function collectSourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry: string) => {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      return collectSourceFiles(fullPath);
    }
    return /\.(ts|tsx)$/.test(entry) ? [fullPath] : [];
  });
}

describe('design system color audit', () => {
  const files = collectSourceFiles(sourceRoot)
    .map((file) => relative(sourceRoot, file).split(sep).join('/'))
    .filter((file) => !file.startsWith('theme/') && !file.startsWith('__tests__/'));

  it.each(files)('%s has no color literals outside the theme', (file) => {
    if (legacyExceptions.has(file)) {
      return;
    }
    const content = readFileSync(join(sourceRoot, file), 'utf8');
    expect(content).not.toMatch(colorLiteral);
  });

  it('legacy exceptions still exist (remove entries once migrated)', () => {
    for (const exception of legacyExceptions) {
      expect(files).toContain(exception);
    }
  });
});
