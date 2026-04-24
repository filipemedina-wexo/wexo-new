import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const INPUT_DIR = new URL('../public/cases', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const MAX_WIDTH = 1600;
const QUALITY = 80;

const files = await readdir(INPUT_DIR);
const images = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

console.log(`\nOtimizando ${images.length} imagens → WebP (max ${MAX_WIDTH}px, q${QUALITY})\n`);

let totalBefore = 0;
let totalAfter = 0;

for (const file of images) {
  const inputPath = join(INPUT_DIR, file);
  const outName = basename(file, extname(file)) + '.webp';
  const outputPath = join(INPUT_DIR, outName);

  const before = (await stat(inputPath)).size;

  await sharp(inputPath)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outputPath);

  const after = (await stat(outputPath)).size;
  totalBefore += before;
  totalAfter += after;

  const pct = Math.round((1 - after / before) * 100);
  const mb = (s) => (s / 1024 / 1024).toFixed(1) + 'MB';
  console.log(`  ${file.padEnd(45)} ${mb(before).padStart(7)} → ${mb(after).padStart(7)}  (-${pct}%)`);
}

const mb = (s) => (s / 1024 / 1024).toFixed(1) + 'MB';
console.log(`\nTotal: ${mb(totalBefore)} → ${mb(totalAfter)}  (-${Math.round((1 - totalAfter / totalBefore) * 100)}%)\n`);
