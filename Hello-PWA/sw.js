const cacheName = 'hello-pwa';
const filesToCache = [
  './index.html',
  './css/style.css',
  './js/main.js',
  './manifest.json',
  './images/background.jpg'
];

self.addEventListener('install', async (event) => {
  try {
    const cache = await caches.open(cacheName);
    await cache.addAll(filesToCache);
  } catch (error) {
    console.error('Service worker installation error:', error.message)
  }
});

self.addEventListener('fetch', async (event) => {
  try {
    const response = await caches.match(event.request);
    if (response) {
      return response;
    }
    const networkResponse = await fetch(event.request);
    return networkResponse;
  } catch (error) {
    console.error('Service worker fetch error: ', error.message);
  }
})

