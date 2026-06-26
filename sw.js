const CACHE_NAME = "birthday-checklist-v4";
const APP_ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=4",
  "./app.js?v=4",
  "./manifest.webmanifest",
  "./icon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const request = event.request;
  const shouldPreferNetwork =
    request.mode === "navigate" || request.destination === "script" || request.destination === "style";

  if (shouldPreferNetwork) {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(cacheFirst(request));
});

function networkFirst(request) {
  return fetch(request)
    .then((response) => cacheAndReturn(request, response))
    .catch(() => caches.match(request).then((cachedResponse) => cachedResponse || caches.match("./index.html")));
}

function cacheFirst(request) {
  return caches.match(request).then((cachedResponse) => {
    return cachedResponse || fetch(request).then((response) => cacheAndReturn(request, response));
  });
}

function cacheAndReturn(request, response) {
  if (response?.ok) {
    const copy = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
  }

  return response;
}
