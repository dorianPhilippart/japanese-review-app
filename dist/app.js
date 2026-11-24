const fallbackItems = [
  { level:'N5', kanji:'日', word:'日本', reading:'にほん', romaji:'nihon', meaning:'Japon', clue:'soleil · jour' },
  { level:'N5', kanji:'水', word:'水', reading:'みず', romaji:'mizu', meaning:'eau', clue:'eau' },
  { level:'N5', kanji:'火', word:'火曜日', reading:'かようび', romaji:'kayoubi', meaning:'mardi', clue:'feu' },
  { level:'N5', kanji:'山', word:'山', reading:'やま', romaji:'yama', meaning:'montagne', clue:'montagne' },
  { level:'N5', kanji:'人', word:'日本人', reading:'にほんじん', romaji:'nihonjin', meaning:'personne japonaise', clue:'personne' },
  { level:'N5', kanji:'食', word:'食べる', reading:'たべる', romaji:'taberu', meaning:'manger', clue:'nourriture · manger' },
  { level:'N5', kanji:'見', word:'見る', reading:'みる', romaji:'miru', meaning:'voir · regarder', clue:'voir' },
  { level:'N5', kanji:'学', word:'学生', reading:'がくせい', romaji:'gakusei', meaning:'étudiant', clue:'étudier' },
  { level:'N5', kanji:'本', word:'本', reading:'ほん', romaji:'hon', meaning:'livre', clue:'origine · livre' },
  { level:'N5', kanji:'電', word:'電車', reading:'でんしゃ', romaji:'densha', meaning:'train', clue:'électricité' },
  { level:'N5', kanji:'時', word:'時間', reading:'じかん', romaji:'jikan', meaning:'temps · durée', clue:'heure · temps' },
  { level:'N5', kanji:'友', word:'友達', reading:'ともだち', romaji:'tomodachi', meaning:'ami', clue:'ami' },
  { level:'N5', kanji:'先', word:'先生', reading:'せんせい', romaji:'sensei', meaning:'professeur', clue:'avant · précédent' },
  { level:'N5', kanji:'校', word:'学校', reading:'がっこう', romaji:'gakkou', meaning:'école', clue:'école' },
  { level:'N5', kanji:'今', word:'今日', reading:'きょう', romaji:'kyou', meaning:'aujourd’hui', clue:'maintenant' },
  { level:'N5', kanji:'明', word:'明日', reading:'あした', romaji:'ashita', meaning:'demain', clue:'clair · suivant' },
  { level:'N5', kanji:'大', word:'大きい', reading:'おおきい', romaji:'ookii', meaning:'grand', clue:'grand' },
  { level:'N5', kanji:'小', word:'小さい', reading:'ちいさい', romaji:'chiisai', meaning:'petit', clue:'petit' },
  { level:'N5', kanji:'行', word:'行く', reading:'いく', romaji:'iku', meaning:'aller', clue:'aller' },
  { level:'N5', kanji:'来', word:'来る', reading:'くる', romaji:'kuru', meaning:'venir', clue:'venir' },
  { level:'N5', kanji:'飲', word:'飲む', reading:'のむ', romaji:'nomu', meaning:'boire', clue:'boire' },
  { level:'N5', kanji:'話', word:'話す', reading:'はなす', romaji:'hanasu', meaning:'parler', clue:'parole · parler' },
  { level:'N5', kanji:'聞', word:'聞く', reading:'きく', romaji:'kiku', meaning:'écouter · demander', clue:'entendre' },
  { level:'N5', kanji:'読', word:'読む', reading:'よむ', romaji:'yomu', meaning:'lire', clue:'lire' },
  { level:'N5', kanji:'書', word:'書く', reading:'かく', romaji:'kaku', meaning:'écrire', clue:'écrire' },
  { level:'N5', kanji:'家', word:'家', reading:'いえ', romaji:'ie', meaning:'maison', clue:'maison · famille' },
  { level:'N5', kanji:'駅', word:'駅', reading:'えき', romaji:'eki', meaning:'gare', clue:'gare' },
  { level:'N5', kanji:'天', word:'天気', reading:'てんき', romaji:'tenki', meaning:'météo · temps', clue:'ciel' },
  { level:'N5', kanji:'金', word:'お金', reading:'おかね', romaji:'okane', meaning:'argent', clue:'or · argent' },
  { level:'N5', kanji:'名', word:'名前', reading:'なまえ', romaji:'namae', meaning:'nom', clue:'nom' },
  { level:'N4', kanji:'旅', word:'旅行', reading:'りょこう', romaji:'ryokou', meaning:'voyage', clue:'voyage' },
  { level:'N4', kanji:'料', word:'料理', reading:'りょうり', romaji:'ryouri', meaning:'cuisine · plat', clue:'matière · tarif' },
  { level:'N4', kanji:'習', word:'習慣', reading:'しゅうかん', romaji:'shuukan', meaning:'habitude', clue:'apprendre' },
  { level:'N4', kanji:'約', word:'約束', reading:'やくそく', romaji:'yakusoku', meaning:'promesse', clue:'promesse · environ' },
  { level:'N4', kanji:'必', word:'必要', reading:'ひつよう', romaji:'hitsuyou', meaning:'nécessaire', clue:'certain · nécessaire' },
  { level:'N4', kanji:'験', word:'経験', reading:'けいけん', romaji:'keiken', meaning:'expérience', clue:'vérifier · expérience' },
  { level:'N4', kanji:'準', word:'準備', reading:'じゅんび', romaji:'junbi', meaning:'préparation', clue:'standard · préparer' },
  { level:'N4', kanji:'運', word:'運転', reading:'うんてん', romaji:'unten', meaning:'conduite', clue:'transporter · chance' },
  { level:'N4', kanji:'文', word:'文化', reading:'ぶんか', romaji:'bunka', meaning:'culture', clue:'texte · culture' },
  { level:'N4', kanji:'生', word:'生活', reading:'せいかつ', romaji:'seikatsu', meaning:'vie quotidienne', clue:'vie · naissance' },
  { level:'N4', kanji:'研', word:'研究', reading:'けんきゅう', romaji:'kenkyuu', meaning:'recherche · étude', clue:'aiguiser · rechercher' },
  { level:'N4', kanji:'意', word:'意味', reading:'いみ', romaji:'imi', meaning:'sens · signification', clue:'idée · intention' }
];

function loadCachedCatalog(){
  try {
    const cached=JSON.parse(localStorage.getItem('kanjiSprintCatalog')||'null');
    return Array.isArray(cached)&&cached.length ? cached : null;
  } catch { return null; }
}

let items=loadCachedCatalog()||fallbackItems;

const defaults = { total:0, correct:0, sessions:0, streak:0, lastDay:'', mastered:{} };
const preferenceDefaults = { level:'all', length:5 };
let stats = loadObject('kanjiSprintStats', defaults);
let preferences = loadObject('kanjiSprintPreferences', preferenceDefaults);
let route = 'home';
let session = null;
let installPrompt = null;
const app = document.querySelector('#app');
const installButton = document.querySelector('#installButton');
const accountButton = document.querySelector('#accountButton');
const cloudConfig=window.KANJI_SPRINT_CONFIG||{};
const supabase=window.createKanjiSprintClient&&cloudConfig.supabaseUrl&&cloudConfig.supabasePublishableKey
  ? window.createKanjiSprintClient(cloudConfig.supabaseUrl,cloudConfig.supabasePublishableKey,{
      auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}
    })
  : null;
let cloudUser=null;
let cloudStatus=supabase?'connecting':'offline';
let cloudMessage='';
let preferenceSyncTimer=null;
let reviewFlushPromise=null;

function loadObject(key, fallback){
  try { return { ...fallback, ...JSON.parse(localStorage.getItem(key) || '{}') }; }
  catch { return { ...fallback }; }
}
function saveStats(){ localStorage.setItem('kanjiSprintStats', JSON.stringify(stats)); updateStreak(); }
function savePreferences(){
  localStorage.setItem('kanjiSprintPreferences',JSON.stringify(preferences));
  localStorage.setItem('kanjiSprintPreferencesDirty','1');
  schedulePreferenceSync();
}
function updateStreak(){ document.querySelector('#streakCount').textContent = stats.streak; }
function updateCloudIndicator(){
  if(!accountButton)return;
  accountButton.textContent=cloudUser?(cloudStatus==='syncing'?'↻':'✓'):'☁';
  accountButton.classList.toggle('connected',Boolean(cloudUser));
  accountButton.title=cloudUser?(cloudStatus==='syncing'?'Synchronisation…':'Progression synchronisée'):'Connexion au cloud';
}
function shuffle(arr){ return [...arr].sort(() => Math.random() - .5); }
function escapeHtml(value){ const d=document.createElement('div'); d.textContent=value; return d.innerHTML; }
function dayKey(date=new Date()){
  const y=date.getFullYear(), m=String(date.getMonth()+1).padStart(2,'0'), d=String(date.getDate()).padStart(2,'0');
  return `${y}-${m}-${d}`;
}
function getDaily(){
  let daily;
  try { daily=JSON.parse(localStorage.getItem('kanjiSprintDaily') || '{}'); } catch { daily={}; }
  if(daily.date!==dayKey()) daily={date:dayKey(),count:0};
  return daily;
}
function bumpDaily(){ const daily=getDaily(); daily.count=Math.min(999,daily.count+1); localStorage.setItem('kanjiSprintDaily',JSON.stringify(daily)); }
function availableItems(){ return preferences.level==='all' ? items : items.filter(item=>item.level===preferences.level); }
function sampleExcept(current, count=3){
  const pool=availableItems().filter(x=>x.word!==current.word);
  return shuffle(pool.length>=count ? pool : items.filter(x=>x.word!==current.word)).slice(0,count);
}
function accuracy(item){ const m=stats.mastered[item.kanji]; return m?.seen ? m.correct/m.seen : .55; }
function selectCards(mode){
  const pool=availableItems(), length=Math.min(Number(preferences.length)||5,pool.length);
  if(mode==='weak') return [...pool].sort((a,b)=>accuracy(a)-accuracy(b) || (stats.mastered[b.kanji]?.seen||0)-(stats.mastered[a.kanji]?.seen||0)).slice(0,length);
  if(mode==='quick') return [...pool].sort((a,b)=>(accuracy(a)+Math.random()*.35)-(accuracy(b)+Math.random()*.35)).slice(0,length);
  return shuffle(pool).slice(0,length);
}
function speakJapanese(text){
  if(!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const utterance=new SpeechSynthesisUtterance(text);
  utterance.lang='ja-JP'; utterance.rate=.82;
  const voice=speechSynthesis.getVoices().find(v=>v.lang.toLowerCase().startsWith('ja'));
  if(voice) utterance.voice=voice;
  speechSynthesis.speak(utterance);
}

function catalogItem(row){
  return {id:row.id,level:row.jlpt_level,kanji:row.kanji,word:row.word,reading:row.reading,romaji:row.romaji,meaning:row.meaning_fr,clue:row.clue_fr||''};
}
function reviewQueue(){
  try { const value=JSON.parse(localStorage.getItem('kanjiSprintReviewQueue')||'[]');return Array.isArray(value)?value:[]; }
  catch { return []; }
}
function saveReviewQueue(queue){localStorage.setItem('kanjiSprintReviewQueue',JSON.stringify(queue));}
function makeReviewId(){
  if(crypto.randomUUID)return crypto.randomUUID();
  const bytes=crypto.getRandomValues(new Uint8Array(16));
  bytes[6]=(bytes[6]&15)|64;bytes[8]=(bytes[8]&63)|128;
  const hex=[...bytes].map(value=>value.toString(16).padStart(2,'0')).join('');
  return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
}
function queueCloudReview(item,ok){
  if(!cloudUser)return;
  const queue=reviewQueue();
  queue.push({id:makeReviewId(),vocabularyId:item.id||null,word:item.word,result:ok,mode:session?.mode||'quick'});
  saveReviewQueue(queue);
  flushReviewQueue();
}
async function flushReviewQueue(){
  if(reviewFlushPromise)return reviewFlushPromise;
  if(!supabase||!cloudUser||!navigator.onLine)return;
  reviewFlushPromise=(async()=>{
    if(!reviewQueue().length)return;
    cloudStatus='syncing';updateCloudIndicator();
    while(reviewQueue().length){
      const review=reviewQueue()[0];
      const vocabularyId=review.vocabularyId||items.find(item=>item.word===review.word)?.id;
      if(!vocabularyId)break;
      const {error}=await supabase.rpc('record_review',{
        p_vocabulary_id:vocabularyId,p_result:review.result,p_mode:review.mode,p_client_event_id:review.id
      });
      if(error)break;
      saveReviewQueue(reviewQueue().filter(item=>item.id!==review.id));
    }
    const pending=reviewQueue().length;
    cloudStatus=pending?'error':'synced';
    cloudMessage=pending?'Certaines révisions seront renvoyées automatiquement.':'';
    updateCloudIndicator();
    if(route==='account')renderAccount();
  })();
  try { await reviewFlushPromise; } finally { reviewFlushPromise=null; }
}
function schedulePreferenceSync(){
  clearTimeout(preferenceSyncTimer);
  if(!supabase||!cloudUser)return;
  preferenceSyncTimer=setTimeout(syncPreferences,350);
}
async function syncPreferences(){
  if(!supabase||!cloudUser||!navigator.onLine)return;
  const {error}=await supabase.from('user_preferences').upsert({
    user_id:cloudUser.id,level:preferences.level,session_length:Number(preferences.length)||5,daily_goal:10
  });
  if(!error)localStorage.removeItem('kanjiSprintPreferencesDirty');
}
function mergeProgress(rows){
  const byId=new Map(rows.map(row=>[row.vocabulary_id,row]));
  const merged={...stats.mastered};
  for(const item of items){
    const remote=byId.get(item.id);if(!remote)continue;
    const local=merged[item.kanji]||{seen:0,correct:0};
    merged[item.kanji]={seen:Math.max(local.seen||0,remote.seen||0),correct:Math.max(local.correct||0,remote.correct||0)};
  }
  stats.mastered=merged;
  const values=Object.values(merged);
  stats.total=values.reduce((sum,value)=>sum+(value.seen||0),0);
  stats.correct=values.reduce((sum,value)=>sum+(value.correct||0),0);
  saveStats();
}
async function migrateLocalProgress(remoteRows){
  const remoteById=new Map(remoteRows.map(row=>[row.vocabulary_id,row]));
  const payload=[];
  for(const item of items){
    const local=stats.mastered[item.kanji];
    if(!item.id||!local?.seen)continue;
    const remote=remoteById.get(item.id)||{seen:0,correct:0};
    payload.push({
      user_id:cloudUser.id,vocabulary_id:item.id,
      seen:Math.max(local.seen||0,remote.seen||0),
      correct:Math.max(local.correct||0,remote.correct||0)
    });
  }
  if(payload.length){
    const {error}=await supabase.from('user_progress').upsert(payload,{onConflict:'user_id,vocabulary_id'});
    if(error)throw error;
  }
}
async function synchronizeUser(){
  if(!supabase||!cloudUser)return;
  cloudStatus='syncing';cloudMessage='';updateCloudIndicator();
  try {
    const [{data:remoteRows,error:progressError},{data:remotePreferences,error:preferencesError}]=await Promise.all([
      supabase.from('user_progress').select('vocabulary_id,seen,correct'),
      supabase.from('user_preferences').select('level,session_length,daily_goal').maybeSingle()
    ]);
    if(progressError||preferencesError)throw progressError||preferencesError;
    const migrationKey=`kanjiSprintMigrated:${cloudUser.id}`;
    if(!localStorage.getItem(migrationKey)){
      await migrateLocalProgress(remoteRows||[]);
      localStorage.setItem(migrationKey,'1');
      localStorage.setItem('kanjiSprintPreferencesDirty','1');
    }
    if(remotePreferences&&!localStorage.getItem('kanjiSprintPreferencesDirty')){
      preferences={...preferences,level:remotePreferences.level,length:remotePreferences.session_length};
      localStorage.setItem('kanjiSprintPreferences',JSON.stringify(preferences));
    } else await syncPreferences();
    const {data:latest,error:latestError}=await supabase.from('user_progress').select('vocabulary_id,seen,correct');
    if(latestError)throw latestError;
    mergeProgress(latest||[]);
    await flushReviewQueue();
    cloudStatus=reviewQueue().length?'error':'synced';
  } catch(error){
    cloudStatus='error';cloudMessage='La synchronisation reprendra automatiquement dès que possible.';
    console.warn('Cloud sync unavailable',error.message);
  }
  updateCloudIndicator();
  if(route==='account')renderAccount();
}
async function setCloudUser(user){
  cloudUser=user||null;
  cloudStatus=cloudUser?'syncing':'ready';
  updateCloudIndicator();
  if(cloudUser)await synchronizeUser();
  if(route==='account')renderAccount();
}
async function loadCloudCatalog(){
  if(!supabase||!navigator.onLine)return;
  const {data,error}=await supabase.from('vocabulary').select('id,kanji,word,reading,romaji,meaning_fr,clue_fr,jlpt_level').eq('active',true).order('id');
  if(!error&&data?.length){items=data.map(catalogItem);localStorage.setItem('kanjiSprintCatalog',JSON.stringify(items));}
}
async function initializeCloud(){
  updateCloudIndicator();
  if(!supabase)return;
  await loadCloudCatalog();
  const {data}=await supabase.auth.getSession();
  await setCloudUser(data.session?.user||null);
  supabase.auth.onAuthStateChange((_event,currentSession)=>{
    setTimeout(()=>setCloudUser(currentSession?.user||null),0);
  });
}

function go(next){
  route=next; session=null;
  const activeRoute=next==='progress'?'progress':next==='home'?'home':next==='account'?null:'quick';
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.go===activeRoute));
  if(next==='home')renderHome();else if(next==='progress')renderProgress();else if(next==='account')renderAccount();else startQuiz(next);
  window.scrollTo({top:0,behavior:'smooth'}); app.focus({preventScroll:true});
}

function renderAccount(){
  const queued=reviewQueue().length;
  if(cloudUser){
    const status=cloudStatus==='syncing'?'Synchronisation en cours…':cloudStatus==='error'?'Synchronisation en attente':'Progression synchronisée';
    app.innerHTML=`<section class="account-page"><p class="eyebrow">Compte</p><h1>Ton japonais,<br>sur tous tes appareils.</h1><div class="cloud-card connected-card"><div class="cloud-icon">✓</div><div><strong>${escapeHtml(cloudUser.email||'Compte connecté')}</strong><p>${status}${queued?` · ${queued} action${queued>1?'s':''} en attente`:''}</p></div></div>${cloudMessage?`<p class="cloud-notice">${escapeHtml(cloudMessage)}</p>`:''}<div class="account-actions"><button class="primary" data-sync-now>Synchroniser maintenant</button><button class="secondary" data-signout>Se déconnecter</button><button class="secondary" data-go="home">Retour à l’accueil</button></div><p class="privacy-note">Le catalogue reste disponible hors ligne. Tes résultats sont envoyés avec une connexion chiffrée et protégés par ton compte.</p></section>`;
    return;
  }
  app.innerHTML=`<section class="account-page"><p class="eyebrow">Synchronisation cloud</p><h1>Retrouve tes progrès partout.</h1><p class="hero-copy">Entre ton adresse e-mail. Supabase t’enverra un lien sécurisé, sans mot de passe.</p><form class="login-card" id="loginForm"><label for="emailInput">Adresse e-mail</label><input class="answer-input" id="emailInput" name="email" type="email" autocomplete="email" required placeholder="toi@exemple.fr"><button class="primary" type="submit">Recevoir mon lien de connexion</button><p class="form-message" id="authMessage" aria-live="polite">${escapeHtml(cloudMessage)}</p></form><button class="secondary full-button" data-go="home">Continuer sans compte</button><p class="privacy-note">Sans compte, tes données restent uniquement sur cet appareil. À la première connexion, la progression locale est fusionnée avec le cloud.</p></section>`;
  document.querySelector('#loginForm').addEventListener('submit',sendMagicLink);
}

async function sendMagicLink(event){
  event.preventDefault();
  const form=event.currentTarget,email=form.querySelector('[name="email"]').value.trim(),button=form.querySelector('button'),message=form.querySelector('#authMessage');
  if(!supabase){message.textContent='La connexion cloud est momentanément indisponible.';return;}
  button.disabled=true;message.textContent='Envoi en cours…';
  const redirectTo=`${location.origin}${location.pathname}`;
  const {error}=await supabase.auth.signInWithOtp({email,options:{emailRedirectTo:redirectTo}});
  button.disabled=false;
  message.textContent=error?`Impossible d’envoyer le lien : ${error.message}`:'Lien envoyé. Ouvre-le sur cet appareil pour te connecter.';
}

function renderHome(){
  const daily=getDaily(), todayDone=Math.min(10,daily.count), levelName=preferences.level==='all'?'N5 + N4':preferences.level;
  app.innerHTML=`<section>
    <p class="eyebrow">毎日、少しずつ</p>
    <h1>Un peu de japonais,<br>tous les jours.</h1>
    <p class="hero-copy">Des sessions courtes qui s’adaptent à tes réponses et renforcent tes cartes les plus fragiles.</p>
    <div class="daily-card">
      <div class="daily-top"><div><span class="daily-label">Objectif du jour · ${levelName}</span><h2>${todayDone>=10?'Objectif atteint. よくできました！':`${10-todayDone} cartes à réviser`}</h2></div><strong>${todayDone}/10</strong></div>
      <div class="progress-track"><div class="progress-fill" style="width:${todayDone*10}%"></div></div>
      <button class="primary" data-start="quick">${todayDone?'Continuer la session':'Lancer le quiz rapide'}</button>
    </div>
    <div class="study-config" aria-label="Réglages de la session">
      <div class="config-group"><span>Niveau</span><div class="segmented">${['all','N5','N4'].map(level=>`<button class="config-chip ${preferences.level===level?'active':''}" data-level="${level}">${level==='all'?'Tous':level}</button>`).join('')}</div></div>
      <div class="config-group"><span>Cartes</span><div class="segmented">${[5,10,20].map(length=>`<button class="config-chip ${Number(preferences.length)===length?'active':''}" data-length="${length}">${length}</button>`).join('')}</div></div>
    </div>
    <div class="section-title"><h2>Choisir un exercice</h2><span>${preferences.length} cartes</span></div>
    <div class="mode-grid">
      <button class="mode-card" data-start="recognition"><span class="mode-icon">見</span><strong>Reconnaissance</strong><small>Trouver le sens d’un mot</small></button>
      <button class="mode-card" data-start="typing"><span class="mode-icon">あ</span><strong>Saisie</strong><small>Écrire la bonne lecture</small></button>
      <button class="mode-card" data-start="mcq"><span class="mode-icon">三</span><strong>QCM</strong><small>Choisir sans hésiter</small></button>
      <button class="mode-card" data-start="quick"><span class="mode-icon">⚡</span><strong>Cartes flash</strong><small>Quiz rapide interactif</small></button>
      <button class="mode-card targeted" data-start="weak"><span class="mode-icon">的</span><span><strong>Révision ciblée</strong><small>Revoir d’abord tes cartes les plus faibles</small></span></button>
    </div>
  </section>`;
}

function startQuiz(mode){ session={mode,cards:selectCards(mode),index:0,score:0,answered:false}; renderQuestion(); }

function renderQuestion(){
  const s=session,item=s.cards[s.index],progress=(s.index/s.cards.length)*100;
  const names={recognition:'Reconnaissance',typing:'Saisie',mcq:'QCM',quick:'Quiz rapide',weak:'Révision ciblée'};
  app.innerHTML=`<div class="quiz-head"><button data-go="home" aria-label="Quitter">×</button><div class="quiz-meta"><strong>${names[s.mode]}</strong><small>${s.index+1} sur ${s.cards.length} · ${item.level}</small></div><div class="score-pill">${s.score}</div></div><div class="quiz-progress"><div style="width:${progress}%"></div></div><div id="questionArea"></div>`;
  const area=document.querySelector('#questionArea');
  if(s.mode==='typing') renderTyping(area,item); else if(s.mode==='quick'||s.mode==='weak') renderFlash(area,item); else renderChoices(area,item,s.mode);
}

function renderChoices(area,item,mode){
  const options=shuffle([item,...sampleExcept(item)]),label=mode==='recognition'?'Que signifie ce mot ?':'Quelle est sa lecture ?';
  const audio=mode==='recognition'?`<button class="sound-button" data-speak="${escapeHtml(item.word)}" aria-label="Écouter la prononciation">♪ Écouter</button>`:'';
  area.innerHTML=`<div class="prompt-card"><span class="level-badge">${item.level}</span><span class="prompt-label">${label}</span><div class="word-large">${item.word}</div>${mode==='mcq'?`<div class="detail">${item.meaning}</div>`:''}${audio}</div><div class="choices">${options.map(o=>`<button class="choice" data-answer="${escapeHtml(o.word)}">${mode==='recognition'?o.meaning:`${o.reading} · ${o.romaji}`}</button>`).join('')}</div><div class="feedback" id="feedback" aria-live="polite"></div>`;
  area.querySelectorAll('.choice').forEach(b=>b.addEventListener('click',()=>answerChoice(b,item)));
}

function answerChoice(button,item){
  if(session.answered) return; session.answered=true;
  const ok=button.dataset.answer===item.word; button.classList.add(ok?'correct':'wrong');
  document.querySelectorAll('.choice').forEach(b=>{b.disabled=true;if(b.dataset.answer===item.word)b.classList.add('correct');});
  const feedback=document.querySelector('#feedback'); feedback.className=`feedback ${ok?'good':'bad'}`;
  feedback.textContent=ok?'正解！ Bonne réponse.':`Pas tout à fait — ${item.reading} · ${item.meaning}`;
  record(item,ok); setTimeout(nextQuestion,ok?850:1450);
}

function renderTyping(area,item){
  area.innerHTML=`<div class="prompt-card"><span class="level-badge">${item.level}</span><span class="prompt-label">Écris la lecture en hiragana</span><div class="word-large">${item.word}</div><div class="detail">${item.meaning}</div></div><form class="input-wrap" id="typingForm"><input class="answer-input" id="answerInput" lang="ja" autocomplete="off" autocorrect="off" placeholder="Ex. みず" aria-label="Lecture en hiragana"><button class="primary" type="submit">Valider</button></form><p class="hint">Clavier japonais recommandé · le rōmaji est aussi accepté</p><div class="feedback" id="feedback" aria-live="polite"></div>`;
  document.querySelector('#typingForm').addEventListener('submit',e=>{e.preventDefault();answerTyping(item);});
  setTimeout(()=>document.querySelector('#answerInput')?.focus(),100);
}

function answerTyping(item){
  if(session.answered) return;
  const input=document.querySelector('#answerInput'),value=input.value.trim().toLowerCase().normalize('NFKC'); if(!value)return;
  session.answered=true; const ok=value===item.reading||value===item.romaji;
  input.disabled=true; input.style.borderColor=ok?'var(--green)':'var(--red)';
  const feedback=document.querySelector('#feedback'); feedback.className=`feedback ${ok?'good':'bad'}`;
  feedback.textContent=ok?'正解！ Lecture correcte.':`Réponse : ${item.reading} (${item.romaji})`;
  record(item,ok); setTimeout(nextQuestion,ok?900:1600);
}

function renderFlash(area,item){
  area.innerHTML=`<div class="flashcard" id="flashcard" role="button" tabindex="0" aria-label="Retourner la carte"><div class="flash-inner"><div class="flash-face"><span class="level-badge">${item.level}</span><span class="prompt-label">Quel est ce mot ?</span><div class="word-large">${item.word}</div><button class="sound-button" data-speak="${escapeHtml(item.word)}" aria-label="Écouter la prononciation">♪ Écouter</button><span class="tap-hint">Toucher la carte pour révéler</span></div><div class="flash-face flash-back"><span class="level-badge dark">${item.level}</span><div class="reading">${item.reading} · ${item.romaji}</div><div class="meaning">${item.meaning}</div><p class="detail">Kanji : ${item.kanji} — ${item.clue}</p><span class="tap-hint">Évalue ta réponse</span></div></div></div><div class="rate-row" id="rateRow" hidden><button class="again" data-known="false">À revoir</button><button class="know" data-known="true">Je savais</button></div>`;
  const card=document.querySelector('#flashcard'),row=document.querySelector('#rateRow');
  const reveal=()=>{card.classList.add('revealed');row.hidden=false;};
  card.addEventListener('click',e=>{if(!e.target.closest('[data-speak]'))reveal();});
  card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();reveal();}});
  row.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{if(session.answered)return;session.answered=true;record(item,b.dataset.known==='true');setTimeout(nextQuestion,350);}));
}

function record(item,ok){
  stats.total++; if(ok){stats.correct++;session.score++;}
  stats.mastered[item.kanji]=stats.mastered[item.kanji]||{seen:0,correct:0};
  stats.mastered[item.kanji].seen++; if(ok)stats.mastered[item.kanji].correct++;
  bumpDaily();saveStats();queueCloudReview(item,ok);
}
function nextQuestion(){ session.index++;session.answered=false;if(session.index>=session.cards.length)finishSession();else renderQuestion(); }

function finishSession(){
  const result={...session}; stats.sessions++;
  const today=dayKey();
  if(stats.lastDay!==today){const yesterday=new Date();yesterday.setDate(yesterday.getDate()-1);stats.streak=stats.lastDay===dayKey(yesterday)?stats.streak+1:1;stats.lastDay=today;}
  saveStats();
  const ratio=result.score/result.cards.length;
  app.innerHTML=`<section class="result"><div class="result-badge">${ratio>=.8?'🎉':ratio>=.4?'🌱':'💪'}</div><p class="eyebrow">Session terminée</p><h1>${ratio>=.8?'Très beau sprint !':ratio>=.4?'Bonne progression.':'On recommence ?'}</h1><p class="result-score"><strong>${result.score}/${result.cards.length}</strong> réponses maîtrisées</p><div class="result-actions"><button class="primary" data-retry="${result.mode}">Refaire une session</button><button class="secondary" data-go="progress">Voir mes progrès</button><button class="secondary" data-go="home">Retour à l’accueil</button></div></section>`;
}

function renderProgress(){
  const success=stats.total?Math.round(stats.correct/stats.total*100):0;
  const mastery=Object.entries(stats.mastered).sort((a,b)=>b[1].seen-a[1].seen).slice(0,12);
  app.innerHTML=`<section><p class="eyebrow">Ton parcours</p><h1>Progrès</h1><p class="hero-copy">Chaque petite session compte. La révision ciblée utilise ces résultats pour choisir tes prochaines cartes.</p><div class="stats-grid"><div class="stat-card"><strong>${success}%</strong><span>de réussite</span></div><div class="stat-card"><strong>${stats.sessions}</strong><span>sessions</span></div><div class="stat-card"><strong>${stats.total}</strong><span>cartes vues</span></div><div class="stat-card"><strong>${stats.streak} j</strong><span>série actuelle</span></div></div>${mastery.length?`<button class="primary full-button" data-start="weak">Travailler mes cartes faibles</button>`:''}<div class="section-title"><h2>Kanji travaillés</h2><span>${mastery.length}</span></div>${mastery.length?`<div class="mastery-list">${mastery.map(([k,v])=>{const item=items.find(x=>x.kanji===k);return `<div class="mastery-row"><div class="mastery-kanji">${escapeHtml(k)}</div><div><strong>${escapeHtml(item?.clue||'Kanji')}</strong><small>${v.seen} révision${v.seen>1?'s':''} · ${item?.level||''}</small></div><span class="mastery-pct">${Math.round(v.correct/v.seen*100)}%</span></div>`;}).join('')}</div>`:`<div class="prompt-card"><div class="jp-large">始</div><p class="muted">Lance ton premier quiz pour voir tes progrès ici.</p><button class="primary" data-start="quick">Commencer</button></div>`}</section>`;
}

document.addEventListener('click',e=>{
  const speaker=e.target.closest('[data-speak]'); if(speaker){e.stopPropagation();speakJapanese(speaker.dataset.speak);return;}
  const level=e.target.closest('[data-level]'); if(level){preferences.level=level.dataset.level;savePreferences();renderHome();return;}
  const length=e.target.closest('[data-length]'); if(length){preferences.length=Number(length.dataset.length);savePreferences();renderHome();return;}
  const goButton=e.target.closest('[data-go]'); if(goButton){go(goButton.dataset.go);return;}
  const start=e.target.closest('[data-start]'); if(start){go(start.dataset.start);return;}
  const retry=e.target.closest('[data-retry]'); if(retry){startQuiz(retry.dataset.retry);}
  const sync=e.target.closest('[data-sync-now]');if(sync){synchronizeUser();return;}
  const signout=e.target.closest('[data-signout]');if(signout&&supabase){supabase.auth.signOut();return;}
});

window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;installButton.hidden=false;});
installButton.addEventListener('click',async()=>{if(!installPrompt)return;await installPrompt.prompt();installPrompt=null;installButton.hidden=true;});
window.addEventListener('appinstalled',()=>{installPrompt=null;installButton.hidden=true;});
window.addEventListener('online',()=>{loadCloudCatalog().then(flushReviewQueue);schedulePreferenceSync();});
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).then(reg=>reg.update()).catch(()=>{}));
updateStreak();renderHome();initializeCloud();
