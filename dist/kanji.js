const kanjiLevels = ['N5', 'N4', 'N3', 'N2', 'N1'];
const kanjiPageSize = 30;
let kanjiCatalogRequest;
let kanjiLevel = 'N5';
let kanjiQuery = '';

function normalizeKanjiSearch(value) {
  return value.normalize('NFKC').toLowerCase()
    .replace(/[ァ-ヶ]/g, letter => String.fromCharCode(letter.charCodeAt(0) - 0x60))
    .replace(/\p{Script=Latin}\p{Mark}*/gu, letter => letter.normalize('NFD').replace(/\p{Mark}/gu, ''))
    .replace(/[.\-]/g, '');
}

function filterKanji(catalog, level, query) {
  const term = normalizeKanjiSearch(query.trim());
  return catalog.filter(card => card.level === level && (!term ||
    [card.character, ...card.on, ...card.kun, ...card.meanings, ...card.words]
      .some(value => normalizeKanjiSearch(value).includes(term))));
}

function loadKanjiCatalog() {
  kanjiCatalogRequest ??= fetch('kanji-catalog.json?v=9').then(response => {
    if (!response.ok) throw new Error('Catalogue indisponible');
    return response.json();
  }).catch(error => {
    kanjiCatalogRequest = undefined;
    throw error;
  });
  return kanjiCatalogRequest;
}

function kanjiDetails(card) {
  const readings = [['On’yomi', card.on], ['Kun’yomi', card.kun]];
  return `<dl class="kanji-details">
    ${readings.filter(([, values]) => values.length).map(([label, values]) =>
      `<div><dt>${label}</dt><dd lang="ja">${escapeHtml(values.join(' ・ '))}</dd></div>`).join('')}
    <div><dt>Nombre de traits</dt><dd>${card.strokes}</dd></div>
    ${card.words.length ? `<div><dt>Dans des mots</dt><dd lang="ja">${escapeHtml(card.words.join(' ・ '))}</dd></div>` : ''}
  </dl>`;
}

function kanjiMeanings(card) {
  const text = card.meanings.join(' · ');
  return text ? `<span lang="${card.language}">${escapeHtml(text)}</span>` : 'Sens indisponible';
}

async function renderKanjiCatalog() {
  app.innerHTML = `<section>
    <button type="button" class="secondary" data-go="library">Vocabulaire</button>
    <h1 class="kanji-title">Kanjis</h1>
    <div class="library-tools">
      <label for="kanjiLevel">Niveau JLPT</label>
      <select class="library-search" id="kanjiLevel" disabled>${kanjiLevels.map(level =>
        `<option value="${level}" ${level === kanjiLevel ? 'selected' : ''}>${level}</option>`).join('')}</select>
      <input class="library-search" id="kanjiSearch" type="search" aria-label="Rechercher un kanji" placeholder="Caractère, lecture ou sens" disabled>
    </div>
    <p class="catalog-summary" role="status" id="kanjiCount">Chargement du répertoire…</p>
    <button class="primary full-button" id="kanjiPractice" type="button" hidden>Réviser ces kanjis</button>
    <div class="catalog-list" id="kanjiResults"></div>
    <button class="secondary full-button" id="kanjiMore" type="button" hidden>Afficher plus</button>
    <details class="kanji-sources">
      <summary>Sources et classement</summary>
      <p>Les niveaux sont indicatifs. Le JLPT ne publie pas de liste officielle de kanjis pour le format actuel.</p>
      <p>Répertoire adapté d’<a href="https://github.com/evanclan/OpenJLPT">OpenJLPT</a>, qui s’appuie sur
      les <a href="https://www.tanos.co.uk/jlpt/">listes de Jonathan Waller</a>, JMdict et KANJIDIC2 (EDRDG) et Tatoeba.
      Lectures, sens et nombre de traits tirés de <a href="https://www.edrdg.org/wiki/KANJIDIC_Project.html">KANJIDIC2</a>.
      Données utilisées selon la <a href="https://www.edrdg.org/edrdg/licence.html">licence EDRDG</a> et distribuées sous
      <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.</p>
    </details>
  </section>`;
  const level = app.querySelector('#kanjiLevel');
  const search = app.querySelector('#kanjiSearch');
  const count = app.querySelector('#kanjiCount');
  const results = app.querySelector('#kanjiResults');
  const more = app.querySelector('#kanjiMore');
  const practice = app.querySelector('#kanjiPractice');
  search.value = kanjiQuery;
  try {
    const catalog = await loadKanjiCatalog();
    if (!results.isConnected) return;
    let visible = [], offset = 0;
    function showMore() {
      const cards = visible.slice(offset, offset + kanjiPageSize);
      results.insertAdjacentHTML('beforeend', cards.map(card => `<details class="kanji-entry">
        <summary><strong lang="ja">${escapeHtml(card.character)}</strong>${kanjiMeanings(card)}</summary>
        ${kanjiDetails(card)}
      </details>`).join(''));
      offset += cards.length;
      more.hidden = offset >= visible.length;
    }
    function updateResults() {
      kanjiLevel = level.value;
      kanjiQuery = search.value;
      visible = filterKanji(catalog, kanjiLevel, kanjiQuery);
      offset = 0;
      count.textContent = `${visible.length} kanji${visible.length > 1 ? 's' : ''} · ${kanjiLevel}`;
      results.replaceChildren();
      practice.hidden = !visible.length;
      showMore();
    }
    level.disabled = search.disabled = false;
    level.addEventListener('change', updateResults);
    search.addEventListener('input', updateResults);
    more.addEventListener('click', showMore);
    practice.addEventListener('click', () => practiceKanji(shuffle(visible).slice(0, 10)));
    updateResults();
  } catch {
    if (count.isConnected) count.textContent = 'Répertoire indisponible. Rouvre cet écran pour réessayer.';
  }
}

function practiceKanji(cards, index = 0, revealed = false) {
  const card = cards[index];
  if (!card) {
    app.innerHTML = `<section class="result"><h1>Révision terminée</h1>
      <p>${cards.length} kanji${cards.length > 1 ? 's' : ''} révisé${cards.length > 1 ? 's' : ''}.</p>
      <button type="button" class="primary" data-go="kanji">Retour aux kanjis</button></section>`;
    app.querySelector('[data-go]').focus();
    return;
  }
  app.innerHTML = `<section class="kanji-practice">
    <button type="button" class="secondary" data-go="kanji">Retour aux kanjis</button>
    <p class="catalog-summary">${index + 1} / ${cards.length} · ${card.level}</p>
    <div class="prompt-card">
      <div class="word-large" lang="ja">${escapeHtml(card.character)}</div>
      ${revealed ? `<div class="meaning">${kanjiMeanings(card)}</div>${kanjiDetails(card)}` : ''}
    </div>
    <button type="button" class="primary full-button" id="kanjiNext">${revealed ? 'Suivant' : 'Révéler la carte'}</button>
  </section>`;
  const next = app.querySelector('#kanjiNext');
  next.addEventListener('click', () => practiceKanji(cards, index + Number(revealed), !revealed));
  next.focus({ preventScroll: true });
}
