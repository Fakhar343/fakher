const CACHE='ga-v2-pwa-v1';
const ASSETS=[
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./products.json",
  "./assets/icon-512.png",
  "./assets/logo.png"
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))); self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE?caches.delete(k):null)))); self.clients.claim();});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(resp=>{if(e.request.method==='GET'&&resp&&resp.status===200){const clone=resp.clone(); caches.open(CACHE).then(c=>c.put(e.request, clone));} return resp;}).catch(()=>hit||caches.match('./index.html'))));});