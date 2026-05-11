const CACHE_NAME = 'aneimera-cache-v2';
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './assets/favicon.png',
  './assets/fonts/Inter.woff2',
  './assets/fonts/MaterialSymbolsOutlined.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      const results = await Promise.allSettled(PRECACHE_URLS.map(u => fetch(u).then(r => {
        if (!r.ok) throw new Error('fetch-failed');
        return cache.put(u, r.clone()).then(() => true);
      })));
      return results;
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);
  const basePath = new URL('./', self.location.href).pathname;
  const relPath = requestUrl.pathname.startsWith(basePath)
    ? requestUrl.pathname.slice(basePath.length - 1)
    : requestUrl.pathname;

  const isFontOrCore = PRECACHE_URLS.some(u => {
    const resolved = new URL(u, self.location.href).pathname;
    return resolved === requestUrl.pathname;
  }) || requestUrl.pathname.startsWith(basePath + 'assets/fonts/');

  if (isFontOrCore) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          const copy = response.clone();
          if (event.request.method === 'GET') {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        });
      })
    );
    return;
  }

  // Network-first for everything else (HTML pages, JS, CSS) - only cache GET
  if (event.request.method === 'GET') {
    event.respondWith(
      fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match(event.request))
    );
  }
});
