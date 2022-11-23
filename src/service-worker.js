import { build, version, files } from '$service-worker';

const applicationCache = `applicationCache-v${version}`;
const staticCache = `staticCache-v${version}`;

const returnSSRpage = (path) =>
	caches.open('ssrCache').then((cache) => cache.match(path));

// Caches the svelte app (not the data)
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open('ssrCache')
      .then((cache) => cache.addAll(['/', '/offline'])),
      caches.open(applicationCache).then((cache) => cache.addAll(build)),
      caches.open(staticCache).then((cache) => cache.addAll(files)),
      ])
    .then(self.skipWaiting())
    .then(() => console.log('installed'))
  );
});
// Removes old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    clients.claim(),
    caches.keys()
    .then((keys) => {
      return Promise.all(
        keys.filter((key) =>
          key !== applicationCache &&
          key !== staticCache &&
          key !== 'postsCache' &&
          key !== 'ssrCache')
          .map((key) => caches.delete(key)));
    })
    .then(self.skipWaiting())
    .then(() => console.log('activated'))
  );
});
