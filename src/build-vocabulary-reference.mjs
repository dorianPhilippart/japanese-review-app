import { writeFile } from 'node:fs/promises';
import { gunzipSync } from 'node:zlib';

const revision = '0d1d3410bec90bd4098a7c72de820543cb4f707c';
const dictionaryVersion = '3.6.2+20261123231529';
const encodedVersion = encodeURIComponent(dictionaryVersion);

async function read(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response;
}

const levels = ['N5', 'N4'];
const upstream = `https://raw.githubusercontent.com/evanclan/OpenJLPT/${revision}/data/json/vocab`;
const dictionaryUrl = `https://github.com/scriptin/jmdict-simplified/releases/download/${encodedVersion}/jmdict-fre-${encodedVersion}.json.tgz`;
const [lists, response] = await Promise.all([
  Promise.all(levels.map(async level => (await read(`${upstream}/${level.toLowerCase()}.json`)).json())),
  read(dictionaryUrl)
]);

const archive = gunzipSync(Buffer.from(await response.arrayBuffer()));
const entryName = archive.subarray(0, 100).toString().split('\0')[0];
const entryBytes = parseInt(archive.subarray(124, 136).toString(), 8);
if (!entryName.endsWith('.json') || !entryBytes) throw new Error('Unexpected French dictionary archive');
const dictionary = JSON.parse(archive.subarray(512, 512 + entryBytes).toString());
const french = new Map(dictionary.words.map(word => [String(word.id), word]));
const applies = (restrictions, value) => restrictions.includes('*') || restrictions.includes(value);
const frenchSupplements = {
  'いい': 'bon · bien',
  'いかが': 'comment · qu’en pensez-vous ?',
  'コート': 'manteau · court de tennis',
  'どうぞよろしく': 'enchanté · au plaisir de vous connaître',
  'どの': 'quel · lequel',
  'はじめまして': 'enchanté de faire votre connaissance',
  '私': 'je · moi (forme humble)',
  'あ': 'ah !',
  'お金持ち': 'personne riche',
  'しかる': 'un certain (dans certaines expressions)',
  '直る': 'être réparé · se remettre en état'
};

const ids = new Set();
const entries = lists.flatMap((list, index) => list.map(row => {
  const level = levels[index];
  if (level !== row.level || !row.word || !row.reading || !row.romaji || !row.meanings?.length || ids.has(row.id)) {
    throw new Error(`Incomplete or duplicate reference entry ${row.word}`);
  }
  ids.add(row.id);
  const dictionaryEntry = french.get(String(row.jmdict_id));
  const meanings = (dictionaryEntry?.sense ?? [])
    .filter(sense => applies(sense.appliesToKana, row.reading) && applies(sense.appliesToKanji, row.word))
    .flatMap(sense => sense.gloss.map(gloss => gloss.text));
  return {
    level, word: row.word, reading: row.reading, romaji: row.romaji,
    kanji: row.word.match(/\p{Script=Han}/u)?.[0] ?? '',
    meaning: [...new Set(meanings)].slice(0, 6).join(' · ') || frenchSupplements[row.word] || '',
    meaningEn: row.meanings.join(' · ')
  };
}));

const output = 'const referenceVocabulary = [\n' + entries.map(row => '  ' + JSON.stringify(row)).join(',\n') + '\n];\n';
if (process.argv.includes('--sql')) {
  const quote = value => "'" + value.replaceAll("'", "''") + "'";
  const byWord = new Map();
  for (const row of entries) if (!byWord.has(row.word)) byWord.set(row.word, row);
  const values = [...byWord.values()].map(row =>
    '(' + [row.level, row.kanji, row.word, row.reading, row.romaji, row.meaning].map(quote).join(', ') + ')');
  console.log('insert into public.vocabulary (jlpt_level, kanji, word, reading, romaji, meaning_fr) values\n'
    + values.join(',\n') + '\non conflict (word) do nothing;');
} else {
  await writeFile(new URL('../dist/vocabulary-reference.js', import.meta.url), output);
  console.log(`${entries.length} reference entries, ${entries.filter(entry => entry.meaning).length} with a French definition`);
}
