const CACHE_NAME = 'pwa-quiz-v1';
const ASSETS = [
  './',
  './index.html', 
  './home.html',
   './manifest.json',
   './sw.js',
];

// 1. Install Event: Cache all the essential static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching shell assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Activate Event: Clean up old caches if you update the version

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Clearing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// 3. Fetch Event: Serve cached assets when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return the cached file if found, otherwise fetch it from the network
      return cachedResponse || fetch(event.request);
    })
  );
});

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
});

