const CACHE='kanji-sprint-v9';
const ASSETS=['./','index.html','styles.css?v=9','supabase.js?v=7','config.js?v=7','extra-cards.js?v=8','kanji.js?v=9','kanji-catalog.json?v=9','app.js?v=9','manifest.webmanifest?v=7','icon.svg?v=7','icon-192.png?v=7','icon-512.png?v=7','apple-touch-icon.png?v=7'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin) return;
  if(event.request.mode==='navigate') {
    event.respondWith(fetch(event.request).catch(()=>caches.match('./')));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
    const copy=response.clone();
    caches.open(CACHE).then(cache=>cache.put(event.request,copy));
    return response;
  })));
});
