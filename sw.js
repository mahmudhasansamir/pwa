// Empty Service Worker (Just for enabling PWA installation)
self.addEventListener('install', (event) => {
  console.log('Service Worker Installed');
  self.skipWaiting(); // Activate immediately
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker Activated');
});

self.addEventListener('fetch', (event) => {
  // No offline support
  console.log('Fetch event for', event.request.url);
});
