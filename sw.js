const CACHE_NAME = 'hasan-tech-cache-v1'; // ক্যাশ নাম
const urlsToCache = [
  '/', // হোমপেজ
  '/index.html', // আপনার গিটহাবে আপলোড করা index.html ফাইল
  '/manifest.json', // মেনিফেস্ট ফাইল
  '/icon512_maskable.png', // অ্যাপ আইকন
  '/icon512_rounded.png', // আরেকটি অ্যাপ আইকন
  'https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap', // গুগল ফন্ট
];

// ইনস্টল ইভেন্ট: ক্যাশে করার জন্য প্রাথমিক ফাইল যোগ করা
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// অ্যাক্টিভেট ইভেন্ট: পুরানো ক্যাশ মুছে ফেলা
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// ফেচ ইভেন্ট: ক্যাশ থেকে ডাটা সরবরাহ করা
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // ক্যাশ থেকে রেসপন্স ফেরত দেওয়া বা নেটওয়ার্ক থেকে নতুন ফেচ করা
      return response || fetch(event.request);
    })
  );
});
