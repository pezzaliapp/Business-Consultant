// service-worker.js — Business Consultant / PezzaliAPP

const STATIC_CACHE = 'bc-static-v1';

// File "shell" dell'app (non includiamo app.js qui)
const STATIC_ASSETS = [
  './',
  './index.html',
  './style.css',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/cover.png'
];

// Install: cache shell di base
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate: pulizia di TUTTE le vecchie cache (full reset)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Helper: verifica se la richiesta è per app.js
function isAppJs(request) {
  const url = new URL(request.url);
  return url.pathname.endsWith('/app.js');
}

// Fetch
self.addEventListener('fetch', event => {
  const req = event.request;

  // Lascia stare le non-GET
  if (req.method !== 'GET') return;

  // 1) Per app.js usiamo sempre NETWORK-FIRST (così è sempre aggiornato)
  if (isAppJs(req)) {
    event.respondWith(
      fetch(req)
        .then(res => {
          // mettiamo cmq in cache come backup offline
          const resClone = res.clone();
          caches.open(STATIC_CACHE).then(cache => cache.put(req, resClone));
          return res;
        })
        .catch(() =>
          caches.match(req).then(cached => cached || new Response(
            '// Offline: impossibile caricare app.js',
            { status: 503, headers: { 'Content-Type': 'text/javascript' } }
          ))
        )
    );
    return;
  }

  // 2) Per tutto il resto: CACHE-FIRST con fallback rete
  event.respondWith(
    caches.match(req).then(cachedRes => {
      if (cachedRes) return cachedRes;

      return fetch(req)
        .then(networkRes => {
          const resClone = networkRes.clone();
          caches.open(STATIC_CACHE).then(cache => cache.put(req, resClone));
          return networkRes;
        })
        .catch(() => {
          if (req.mode === 'navigate') {
            return caches.match('./index.html');
          }
          return new Response('Offline', {
            status: 503,
            statusText: 'Offline'
          });
        });
    })
  );
});
