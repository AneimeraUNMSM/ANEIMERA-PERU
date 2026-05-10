const CACHE_NAME = 'aneimera-cache-v1';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/favicon.png',
  '/assets/fonts/Inter.woff2',
  '/assets/fonts/MaterialSymbolsOutlined.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      const results = await Promise.allSettled(PRECACHE_URLS.map(u => fetch(u).then(r => {
        if (!r.ok) throw new Error('fetch-failed');
        return cache.put(u, r.clone()).then(() => true);
      })));
      // ignore failures
      return results;
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Serve precached fonts and core files from cache, fallback to network and cache response
  if (PRECACHE_URLS.includes(requestUrl.pathname) || requestUrl.pathname.startsWith('/assets/fonts/')) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        }).catch(() => caches.match('/index.html'));
      })
    );
    return;
  }

  // For other requests use network-first then cache fallback
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request).then((response) => {
        // Update runtime cache with fresh response
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => null);
      // Return cached first, but update in background (stale-while-revalidate)
      return cached || network;
    })
  );
});
