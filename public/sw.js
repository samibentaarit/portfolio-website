const CACHE_VERSION = "portfolio-cache-v1";
const IMAGE_CACHE = `${CACHE_VERSION}-images`;
const PRECACHE_IMAGES = [
  "/images/sami.webp",
  "/images/sami_sport.webp",
  "/images/sami_casual.webp",
  "/images/sami_kittens.webp"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(IMAGE_CACHE).then((cache) => cache.addAll(PRECACHE_IMAGES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== IMAGE_CACHE) {
            return caches.delete(key);
          }
          return undefined;
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET") return;

  if (url.origin === self.location.origin && url.pathname.startsWith("/images/")) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          const responseClone = response.clone();
          caches.open(IMAGE_CACHE).then((cache) => cache.put(request, responseClone));
          return response;
        });
      })
    );
  }
});
