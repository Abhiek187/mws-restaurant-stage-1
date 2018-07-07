/**
 * Store home page in a cache when initialized.
 */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('restaurants').then((cache) => {
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
 * If resource isn't in cache, retrieve from network and save to cache.
 */
/*self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  console.log(url.origin);
  console.log(location.origin);

  if (url.origin !== location.origin) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((resp1) => {
      conosle.log('Fetch successful!');
      return resp1 || fetch(event.request).then((resp2) => {
        return caches.open('restaurants').then((cache) => {
          cache.put(event.request, resp2.clone());
          return resp2;
        });
      });
    }).catch(() => {
      console.log('Fetch failed!');
      //return caches.match('/');
    })
  );
});*/

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      console.log('Fetch successful!');
      return response || fetch(event.request);
    }).catch(() => {
      console.log('Fetch failed!');
      return caches.match('/');
    })
  );
});
