const CACHE="slangenwissel-app-v5";
const ASSETS=["./","./index.html","./manifest.webmanifest","./logo-gss.png","./icons/icon-180.png","./icons/icon-192.png","./icons/icon-512.png"];
self.addEventListener("install",event=>event.waitUntil((async()=>{const c=await caches.open(CACHE);await Promise.allSettled(ASSETS.map(u=>c.add(u)));self.skipWaiting();})()));
self.addEventListener("activate",event=>event.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim();})()));
self.addEventListener("fetch",event=>{if(event.request.method!=="GET")return;event.respondWith((async()=>{const cached=await caches.match(event.request);if(cached)return cached;try{const res=await fetch(event.request);if(res&&res.ok){const c=await caches.open(CACHE);c.put(event.request,res.clone());}return res;}catch(e){if(event.request.mode==="navigate")return (await caches.match("./index.html"))||(await caches.match("./"));throw e;}})());});
