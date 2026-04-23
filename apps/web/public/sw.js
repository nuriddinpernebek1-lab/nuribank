self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('ilyas-bank-shell-v1').then((cache) =>
      cache.addAll(['/', '/dashboard', '/transfers', '/manifest.json'])
    )
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});

self.addEventListener('push', (event) => {
  const data = event.data?.json() || {
    title: 'ILYAS BANK',
    body: 'You have a new banking alert.'
  };

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body
    })
  );
});
