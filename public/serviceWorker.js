const CACHE_NAME = "focustime-v1";
const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/offline.html",
  "/manifest.json",
  "/src/assets/assets/logo.png",
];

// Install SW
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(URLS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate SW
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch events
self.addEventListener("fetch", (event) => {
  // Skip cross-origin requests (like Firebase)
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {
          // Check if we received a valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
      .catch(() => {
        // Fallback to offline page for navigation requests
        if (event.request.mode === "navigate") {
          return caches.match("/offline.html");
        }
      })
  );
});

// Push Notifications
self.addEventListener("push", (event) => {
  const title = "FocusTime";
  const options = {
    body: event.data ? event.data.text() : "You have a new notification.",
    icon: "/src/assets/assets/logo.png",
    badge: "/src/assets/assets/logo.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/"));
});
