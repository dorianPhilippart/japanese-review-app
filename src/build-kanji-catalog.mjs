import { writeFile } from 'node:fs/promises';
import { gunzipSync } from 'node:zlib';

const revision = process.argv[2] || '0d1d3410bec90bd4098a7c72de820543cb4f707c';
const source = 'https://raw.githubusercontent.com/evanclan/OpenJLPT';
const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];

async function download(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response;
}

const [collections, xmlResponse] = await Promise.all([
  Promise.all(levels.map(async level => {
    const response = await download(`${source}/${revision}/data/json/kanji/${level.toLowerCase()}.json`);
    return response.json();
  })),
  download('https://www.edrdg.org/kanjidic/kanjidic2.xml.gz')
]);
const dictionary = gunzipSync(Buffer.from(await xmlResponse.arrayBuffer())).toString('utf8');
const french = new Map();
for (const [, entry] of dictionary.matchAll(/<character>([\s\S]*?)<\/character>/g)) {
  const glyph = entry.match(/<literal>(.*?)<\/literal>/)?.[1];
  const meanings = Array.from(entry.matchAll(/<meaning m_lang="fr">([^<]+)<\/meaning>/g), match => match[1]);
  if (glyph && meanings.length) french.set(glyph, meanings);
}
if (french.size < 1000) throw new Error('KANJIDIC2 French meanings could not be imported');

const seen = new Set();
const catalog = collections.flatMap((rows, index) => {
  const level = levels[index];
  if (!Array.isArray(rows) || !rows.length) throw new Error(`Empty level ${level}`);
  return rows.map(row => {
    if (row.level !== level || !/^\p{Script=Han}$/u.test(row.character) || seen.has(row.character)) {
      throw new Error(`Invalid or duplicate kanji ${row.character} in ${level}`);
    }
    seen.add(row.character);
    const meanings = french.get(row.character);
    return {
      character: row.character, level, strokes: row.strokes,
      on: row.onyomi ?? [], kun: row.kunyomi ?? [],
      meanings: meanings || row.meanings || [], language: meanings ? 'fr' : 'en',
      meaningsEn: row.meanings || [],
      words: (row.words ?? []).filter(word => word !== row.character && word.includes(row.character))
    };
  });
});

// One entry per line, so changes to the source data produce reviewable diffs.
const output = '[\n' + catalog.map(row => '  ' + JSON.stringify(row)).join(',\n') + '\n]\n';
await writeFile(new URL('../dist/kanji-catalog.json', import.meta.url), output);
console.log(`${catalog.length} kanjis, ${catalog.filter(row => row.language === 'fr').length} avec un sens en français`);
