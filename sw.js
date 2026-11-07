// Hasaan Bazaar - Service Worker (PWA Offline & Performance Engine)
const CACHE_NAME = 'hasaan-bazaar-cache-v1.2';

const STATIC_ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './logo.svg',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './owner.png'
];

// Install Event - Pre-cache core shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Hasaan Bazaar SW] Pre-caching core offline assets...');
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[Hasaan Bazaar SW] Pre-cache non-fatal warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up previous caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[Hasaan Bazaar SW] Removing old cache:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Network-First for HTML, Stale-While-Revalidate for static assets
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Ignore non-GET requests or chrome-extension URLs
  if (req.method !== 'GET' || !req.url.startsWith('http')) {
    return;
  }

  // Navigation requests (HTML page): Network-first with cache fallback
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          return response;
        })
        .catch(() => {
          return caches.match('./index.html').then((cached) => cached || caches.match(req));
        })
    );
    return;
  }

  // Static assets (CSS, JS, Images, Icons, Fonts): Stale-While-Revalidate
  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      const fetchPromise = fetch(req)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline and not in cache, fallback gracefully
          return null;
        });

      return cachedResponse || fetchPromise;
    })
  );
});
