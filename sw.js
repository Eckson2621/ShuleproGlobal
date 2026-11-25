const CACHE_NAME = 'eam-pwa-shell-v3';
const CORE = ['/', '/manifest.webmanifest', '/icons/icon.svg', '/icons/logo.svg'];
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.all(CORE.map(async path => { try { const r = await fetch(path, {cache:'reload'}); if (r.ok) await cache.put(path,r); } catch (_) {} }));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => { const keys = await caches.keys(); await Promise.all(keys.filter(k => k.includes('pwa-shell-') && k !== CACHE_NAME).map(k => caches.delete(k))); await self.clients.claim(); })());
});
self.addEventListener('fetch', event => {
  const req = event.request; if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    event.respondWith((async () => { try { const r = await fetch(req,{cache:'no-store'}); if (r.ok) { const c=await caches.open(CACHE_NAME); await c.put('/',r.clone()); } return r; } catch (_) { return (await caches.match('/')) || Response.error(); } })()); return;
  }
  const path = new URL(req.url).pathname;
  if (path === '/manifest.webmanifest' || path.startsWith('/icons/')) event.respondWith((async () => (await caches.match(req)) || fetch(req))());
});