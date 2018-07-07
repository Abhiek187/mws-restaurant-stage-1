let currentCache = 'rr-v1';

/**
 * Store home page in a cache when initialized.
 */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache).then(cache => {
      return cache.addAll([
        '/',
        '/restaurant.html',
        '/css/styles.css',
        '/data/restaurants.json',
        '/img/',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js'
      ]);
    })
  );
});

/**
 * Delete the old cache when this is updated.
 */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('rr-v') && cacheName !== currentCache;
        }).map(oldCache => {
          return caches.delete(oldCache);
        })
      );
    })
  );
});

/**
 * If resource isn't in cache, retrieve from the network and save to cache.
 */
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp1 => {
      return resp1 || fetch(event.request).then(resp2 => {
        const respClone = resp2.clone();
        caches.open(currentCache).then(cache => {
          cache.put(event.request, respClone);
        });

        return resp2;
      });
    }).catch(() => {
      return caches.match(event.request);
    })
  );
});
