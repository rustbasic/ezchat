// ezchat Version: v0.1.0
// NOTE: Change the version number above whenever you update the app. 
// This ensures the browser detects the change in sw.js and triggers a Service Worker update.

var cacheName = 'ezchat-pwa';
var filesToCache = [
  './',
  './index.html',
  './ezchat.js',
  './ezchat_bg.wasm',
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

/* Clean up outdated caches and take control of all clients immediately */
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

/* Serve cached content when offline */
self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});
