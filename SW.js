const CACHE_NAME = 'neon-game-v999';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './home.html',
  './manifest.json',
  './SW.js'
];

// INSTALL: cache files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching app shell');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ACTIVATE: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// FETCH: cache-first (NO data usage for cached files)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      // optional: only allow network if needed
      return fetch(event.request).then((response) => {
        return response;
      }).catch(() => {
        // fallback page if offline
        if (event.request.mode === 'navigate') {
          return caches.match('./home.html');
        }
      });
    })
  );
});
