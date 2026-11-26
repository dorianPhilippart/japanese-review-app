const guideSections = {
  phrases: 'Phrases utiles',
  grammar: 'Grammaire',
  vocabulary: 'Vocabulaire'
};
let guideSection = 'phrases';

function renderGuideEntry(entry) {
  return `<article class="guide-entry">
    <div class="guide-entry-copy">
      <strong lang="ja">${escapeHtml(entry.ja)}</strong>
      <p class="guide-reading"><span lang="ja">${escapeHtml(entry.kana)}</span> · ${escapeHtml(entry.romaji)}</p>
      <p>${escapeHtml(entry[appLanguage])}</p>
    </div>
    ${audioButton(entry.ja)}
  </article>`;
}

function renderGuideGroups(groups) {
  return groups.map((group, index) => `<details class="guide-group" ${index === 0 ? 'open' : ''}>
    <summary>${escapeHtml(group.title[appLanguage])}</summary>
    <div class="guide-list">${group.entries.map(renderGuideEntry).join('')}</div>
  </details>`).join('');
}

function renderGuideGrammar() {
  return guideData.grammar.map(item => `<details class="guide-group">
    <summary>${escapeHtml(item.title[appLanguage])}</summary>
    <div class="guide-rule">
      <p class="guide-pattern">${escapeHtml(item.pattern[appLanguage])}</p>
      <p>${escapeHtml(item.rule[appLanguage])}</p>
      ${renderGuideEntry(item.example)}
    </div>
  </details>`).join('');
}

function renderGuide() {
  app.innerHTML = `<section class="guide-screen">
    <h1>${t('Guide pratique')}</h1>
    <p class="hero-copy">${t('Du japonais pour le voyage et le quotidien.')}</p>
    <div class="guide-sections" role="group" aria-label="${t('Sections du guide')}">
      ${Object.entries(guideSections).map(([key, label]) => `<button type="button"
        class="config-chip ${key === guideSection ? 'active' : ''}" data-guide-section="${key}"
        aria-pressed="${key === guideSection}">${t(label)}</button>`).join('')}
    </div>
    <div class="guide-content" aria-label="${t(guideSections[guideSection])}">
      ${guideSection === 'grammar' ? renderGuideGrammar() : renderGuideGroups(guideData[guideSection])}
    </div>
  </section>`;
  app.querySelectorAll('[data-guide-section]').forEach(button => {
    button.addEventListener('click', () => {
      if (guideSection === button.dataset.guideSection) return;
      guideSection = button.dataset.guideSection;
      renderGuide();
      app.querySelector('[aria-pressed="true"]').focus({ preventScroll: true });
    });
  });
}
