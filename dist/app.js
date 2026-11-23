const items = [
  { kanji:'日', word:'日本', reading:'にほん', romaji:'nihon', meaning:'Japon', clue:'soleil · jour' },
  { kanji:'水', word:'水', reading:'みず', romaji:'mizu', meaning:'eau', clue:'eau' },
  { kanji:'火', word:'火曜日', reading:'かようび', romaji:'kayoubi', meaning:'mardi', clue:'feu' },
  { kanji:'山', word:'山', reading:'やま', romaji:'yama', meaning:'montagne', clue:'montagne' },
  { kanji:'人', word:'日本人', reading:'にほんじん', romaji:'nihonjin', meaning:'Japonais · personne japonaise', clue:'personne' },
  { kanji:'食', word:'食べる', reading:'たべる', romaji:'taberu', meaning:'manger', clue:'nourriture · manger' },
  { kanji:'見', word:'見る', reading:'みる', romaji:'miru', meaning:'voir · regarder', clue:'voir' },
  { kanji:'学', word:'学生', reading:'がくせい', romaji:'gakusei', meaning:'étudiant', clue:'étudier' },
  { kanji:'本', word:'本', reading:'ほん', romaji:'hon', meaning:'livre', clue:'origine · livre' },
  { kanji:'電', word:'電車', reading:'でんしゃ', romaji:'densha', meaning:'train', clue:'électricité' },
  { kanji:'時', word:'時間', reading:'じかん', romaji:'jikan', meaning:'temps · durée', clue:'heure · temps' },
  { kanji:'友', word:'友達', reading:'ともだち', romaji:'tomodachi', meaning:'ami', clue:'ami' }
];

const defaults = { total:0, correct:0, sessions:0, streak:0, lastDay:'', mastered:{} };
let stats = loadStats();
let route = 'home';
let session = null;
const app = document.querySelector('#app');

function loadStats(){
  try { return { ...defaults, ...JSON.parse(localStorage.getItem('kanjiSprintStats') || '{}') }; }
  catch { return { ...defaults }; }
}
function saveStats(){ localStorage.setItem('kanjiSprintStats', JSON.stringify(stats)); updateStreak(); }
function updateStreak(){ document.querySelector('#streakCount').textContent = stats.streak; }
function shuffle(arr){ return [...arr].sort(() => Math.random() - .5); }
function sampleExcept(current, count=3){ return shuffle(items.filter(x => x.word !== current.word)).slice(0,count); }
function escapeHtml(value){ const d=document.createElement('div'); d.textContent=value; return d.innerHTML; }
function dayKey(date=new Date()){ return date.toISOString().slice(0,10); }

function go(next){
  route = next;
  session = null;
  document.querySelectorAll('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.go === (next === 'progress' ? 'progress' : next === 'home' ? 'home' : 'quick')));
  if(next === 'home') renderHome();
  else if(next === 'progress') renderProgress();
  else startQuiz(next);
  window.scrollTo({top:0, behavior:'smooth'});
  app.focus({preventScroll:true});
}

function renderHome(){
  const todayDone = Math.min(10, Number(localStorage.getItem('kanjiSprintToday') || 0));
  app.innerHTML = `
    <section>
      <p class="eyebrow">毎日、少しずつ</p>
      <h1>Un peu de japonais,<br>tous les jours.</h1>
      <p class="hero-copy">Des sessions courtes pour reconnaître, lire et retenir vraiment les kanji.</p>
      <div class="daily-card">
        <div class="daily-top"><div><span class="daily-label">Objectif du jour</span><h2>${todayDone >= 10 ? 'Objectif atteint. よくできました！' : `${10-todayDone} cartes à réviser`}</h2></div><strong>${todayDone}/10</strong></div>
        <div class="progress-track"><div class="progress-fill" style="width:${todayDone*10}%"></div></div>
        <button class="primary" data-start="quick">${todayDone ? 'Continuer la session' : 'Lancer le quiz rapide'}</button>
      </div>
      <div class="section-title"><h2>Choisir un exercice</h2><span>5 questions</span></div>
      <div class="mode-grid">
        <button class="mode-card" data-start="recognition"><span class="mode-icon">見</span><strong>Reconnaissance</strong><small>Trouver le sens d’un mot</small></button>
        <button class="mode-card" data-start="typing"><span class="mode-icon">あ</span><strong>Saisie</strong><small>Écrire la bonne lecture</small></button>
        <button class="mode-card" data-start="mcq"><span class="mode-icon">三</span><strong>QCM</strong><small>Choisir sans hésiter</small></button>
        <button class="mode-card" data-start="quick"><span class="mode-icon">⚡</span><strong>Cartes flash</strong><small>Quiz rapide interactif</small></button>
      </div>
    </section>`;
}

function startQuiz(mode){
  session = { mode, cards:shuffle(items).slice(0,5), index:0, score:0, answered:false };
  renderQuestion();
}

function renderQuestion(){
  const s=session, item=s.cards[s.index], progress=(s.index/s.cards.length)*100;
  const names={recognition:'Reconnaissance',typing:'Saisie',mcq:'QCM',quick:'Quiz rapide'};
  app.innerHTML = `<div class="quiz-head"><button data-go="home" aria-label="Quitter">×</button><div class="quiz-meta"><strong>${names[s.mode]}</strong><small>${s.index+1} sur ${s.cards.length}</small></div><div class="score-pill">${s.score}</div></div><div class="quiz-progress"><div style="width:${progress}%"></div></div><div id="questionArea"></div>`;
  const area=document.querySelector('#questionArea');
  if(s.mode==='typing') renderTyping(area,item);
  else if(s.mode==='quick') renderFlash(area,item);
  else renderChoices(area,item,s.mode);
}

function renderChoices(area,item,mode){
  const options=shuffle([item,...sampleExcept(item)]);
  const label=mode==='recognition'?'Que signifie ce mot ?':'Quelle est sa lecture ?';
  area.innerHTML=`<div class="prompt-card"><span class="prompt-label">${label}</span><div class="word-large">${item.word}</div>${mode==='mcq'?`<div class="detail">${item.meaning}</div>`:''}</div><div class="choices">${options.map(o=>`<button class="choice" data-answer="${escapeHtml(o.word)}">${mode==='recognition'?o.meaning:`${o.reading} · ${o.romaji}`}</button>`).join('')}</div><div class="feedback" id="feedback" aria-live="polite"></div>`;
  area.querySelectorAll('.choice').forEach(b=>b.addEventListener('click',()=>answerChoice(b,item)));
}

function answerChoice(button,item){
  if(session.answered) return;
  session.answered=true;
  const ok=button.dataset.answer===item.word;
  button.classList.add(ok?'correct':'wrong');
  document.querySelectorAll('.choice').forEach(b=>{ b.disabled=true; if(b.dataset.answer===item.word) b.classList.add('correct'); });
  document.querySelector('#feedback').className=`feedback ${ok?'good':'bad'}`;
  document.querySelector('#feedback').textContent=ok?'正解！ Bonne réponse.':`Pas tout à fait — ${item.reading} · ${item.meaning}`;
  record(item,ok);
  setTimeout(nextQuestion, ok?850:1450);
}

function renderTyping(area,item){
  area.innerHTML=`<div class="prompt-card"><span class="prompt-label">Écris la lecture en hiragana</span><div class="word-large">${item.word}</div><div class="detail">${item.meaning}</div></div><form class="input-wrap" id="typingForm"><input class="answer-input" id="answerInput" lang="ja" autocomplete="off" autocorrect="off" placeholder="Ex. みず" aria-label="Lecture en hiragana"><button class="primary" type="submit">Valider</button></form><p class="hint">Clavier japonais recommandé · le rōmaji est aussi accepté</p><div class="feedback" id="feedback" aria-live="polite"></div>`;
  document.querySelector('#typingForm').addEventListener('submit',e=>{e.preventDefault(); answerTyping(item);});
  setTimeout(()=>document.querySelector('#answerInput')?.focus(),100);
}

function answerTyping(item){
  if(session.answered) return;
  const input=document.querySelector('#answerInput');
  const value=input.value.trim().toLowerCase();
  if(!value) return;
  session.answered=true;
  const ok=value===item.reading || value===item.romaji;
  input.disabled=true;
  input.style.borderColor=ok?'var(--green)':'var(--red)';
  const feedback=document.querySelector('#feedback');
  feedback.className=`feedback ${ok?'good':'bad'}`;
  feedback.textContent=ok?'正解！ Lecture correcte.':`Réponse : ${item.reading} (${item.romaji})`;
  record(item,ok);
  setTimeout(nextQuestion, ok?900:1600);
}

function renderFlash(area,item){
  area.innerHTML=`<div class="flashcard" id="flashcard" role="button" tabindex="0" aria-label="Retourner la carte"><div class="flash-inner"><div class="flash-face"><span class="prompt-label">Quel est ce mot ?</span><div class="word-large">${item.word}</div><span class="tap-hint">Toucher pour révéler</span></div><div class="flash-face flash-back"><div class="reading">${item.reading} · ${item.romaji}</div><div class="meaning">${item.meaning}</div><p class="detail">Kanji : ${item.kanji} — ${item.clue}</p><span class="tap-hint">Évalue ta réponse</span></div></div></div><div class="rate-row" id="rateRow" hidden><button class="again" data-known="false">À revoir</button><button class="know" data-known="true">Je savais</button></div>`;
  const card=document.querySelector('#flashcard'), row=document.querySelector('#rateRow');
  const reveal=()=>{card.classList.add('revealed'); row.hidden=false;};
  card.addEventListener('click',reveal);
  card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();reveal();}});
  row.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{if(session.answered)return;session.answered=true;record(item,b.dataset.known==='true');setTimeout(nextQuestion,350);}));
}

function record(item,ok){
  stats.total++; if(ok){stats.correct++;session.score++;}
  stats.mastered[item.kanji] = stats.mastered[item.kanji] || {seen:0,correct:0};
  stats.mastered[item.kanji].seen++; if(ok) stats.mastered[item.kanji].correct++;
  localStorage.setItem('kanjiSprintToday', String(Math.min(10,Number(localStorage.getItem('kanjiSprintToday')||0)+1)));
  saveStats();
}

function nextQuestion(){
  session.index++;
  session.answered=false;
  if(session.index>=session.cards.length) finishSession(); else renderQuestion();
}

function finishSession(){
  const result={...session};
  stats.sessions++;
  const today=dayKey();
  if(stats.lastDay!==today){
    const yesterday=new Date(); yesterday.setDate(yesterday.getDate()-1);
    stats.streak=stats.lastDay===dayKey(yesterday)?stats.streak+1:1;
    stats.lastDay=today;
  }
  saveStats();
  app.innerHTML=`<section class="result"><div class="result-badge">${result.score>=4?'🎉':result.score>=2?'🌱':'💪'}</div><p class="eyebrow">Session terminée</p><h1>${result.score>=4?'Très beau sprint !':result.score>=2?'Bonne progression.':'On recommence ?'}</h1><p class="result-score"><strong>${result.score}/${result.cards.length}</strong> réponses maîtrisées</p><div class="result-actions"><button class="primary" data-retry="${result.mode}">Refaire une session</button><button class="secondary" data-go="home">Retour à l’accueil</button></div></section>`;
}

function renderProgress(){
  const accuracy=stats.total?Math.round(stats.correct/stats.total*100):0;
  const mastery=Object.entries(stats.mastered).sort((a,b)=>b[1].seen-a[1].seen).slice(0,8);
  app.innerHTML=`<section><p class="eyebrow">Ton parcours</p><h1>Progrès</h1><p class="hero-copy">Chaque petite session compte. Voici ce que tu as déjà consolidé.</p><div class="stats-grid"><div class="stat-card"><strong>${accuracy}%</strong><span>de réussite</span></div><div class="stat-card"><strong>${stats.sessions}</strong><span>sessions</span></div><div class="stat-card"><strong>${stats.total}</strong><span>cartes vues</span></div><div class="stat-card"><strong>${stats.streak} j</strong><span>série actuelle</span></div></div><div class="section-title"><h2>Kanji travaillés</h2><span>${mastery.length}</span></div>${mastery.length?`<div class="mastery-list">${mastery.map(([k,v])=>{const item=items.find(x=>x.kanji===k);return `<div class="mastery-row"><div class="mastery-kanji">${k}</div><div><strong>${item?.clue||''}</strong><small>${v.seen} révision${v.seen>1?'s':''}</small></div><span class="mastery-pct">${Math.round(v.correct/v.seen*100)}%</span></div>`}).join('')}</div>`:`<div class="prompt-card"><div class="jp-large">始</div><p class="muted">Lance ton premier quiz pour voir tes progrès ici.</p><button class="primary" data-start="quick">Commencer</button></div>`}</section>`;
}

document.addEventListener('click',e=>{
  const goButton=e.target.closest('[data-go]'); if(goButton){go(goButton.dataset.go);return;}
  const start=e.target.closest('[data-start]'); if(start){go(start.dataset.start);return;}
  const retry=e.target.closest('[data-retry]'); if(retry){startQuiz(retry.dataset.retry);return;}
});

if('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
updateStreak();
renderHome();
