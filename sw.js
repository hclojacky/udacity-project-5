const cacheName = 'restaurant-v1';

const cacheAssets = [
   '/index.html',
   '/restaurant.html',
   '/css/styles.css',
   '/js/dbhelper.js',
   '/js/main.js',
   '/js/restaurant_info.js',
   '/data/restaurants.json'
]

self.addEventListener('install', (e) => {
   console.log('Service Worker: Installed');
   e.waitUntil(
      caches.open(cacheName).then(function (cache) {
         return cache.addAll(cacheAssets);
      }).then(() => self.skipWaiting())
   )
});

self.addEventListener('activate', (e) => {
   console.log('Service Worker: Activated');
   e.waitUntil(
      caches.keys().then(cacheNames => {
         return Promise.all(
            cacheNames.map(cache => {
               if (cache !== cacheName) {
                  console.log('Service Worker: clearing old caches');
                  return caches.delete(cache);
               }
            })
         )
      })
   )
});

self.addEventListener('fetch', e => {
   console.log('Service Worker: Fetching');
   e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
   )
});