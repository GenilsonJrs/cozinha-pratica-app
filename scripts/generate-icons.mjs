import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const brandDir = fileURLToPath(new URL('../assets/brand/', import.meta.url));
const imagesDir = fileURLToPath(new URL('../assets/images/', import.meta.url));

const iconSvg = readFileSync(`${brandDir}icon.svg`);
const glyphSvg = readFileSync(`${brandDir}glyph.svg`);
const glyphMonoSvg = readFileSync(`${brandDir}glyph-mono.svg`);

await sharp(iconSvg).resize(1024, 1024).png().toFile(`${imagesDir}icon.png`);
await sharp(glyphSvg).resize(1024, 1024).png().toFile(`${imagesDir}android-icon-foreground.png`);
await sharp(glyphMonoSvg)
  .resize(1024, 1024)
  .png()
  .toFile(`${imagesDir}android-icon-monochrome.png`);
await sharp(glyphSvg).resize(512, 512).png().toFile(`${imagesDir}splash-icon.png`);
await sharp(iconSvg).resize(48, 48).png().toFile(`${imagesDir}favicon.png`);

console.log('icons generated');
