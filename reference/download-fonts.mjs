// Run once when refreshing the bundled Google Fonts (Latin variable subsets).
import { readFile, mkdir, writeFile } from 'node:fs/promises';

await mkdir('app/fonts', { recursive: true });
const css = await readFile('reference/font-styles.css', 'utf8');
for (const [, block] of css.matchAll(/\/\* latin \*\/\s*(@font-face \{[\s\S]*?\})/g)) {
  const family = block.includes("'Manrope'") ? 'manrope' : 'cormorant-garamond';
  const style = block.includes('font-style: italic') ? 'italic' : 'normal';
  const url = block.match(/url\(([^)]+)\)/)[1];
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Font download failed: ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(`app/fonts/${family}-${style}.woff2`, bytes);
  console.log(`${family} ${style}: ${bytes.length} bytes`);
}
for (const family of ['manrope', 'cormorantgaramond']) {
  const response = await fetch(
    `https://raw.githubusercontent.com/google/fonts/main/ofl/${family}/OFL.txt`,
  );
  if (!response.ok) throw new Error(`License download failed: ${response.status}`);
  await writeFile(`app/fonts/${family}-OFL.txt`, await response.text());
}
