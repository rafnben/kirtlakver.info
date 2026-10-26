const V="kv-v3",SHELL=["./","index.html","manifest.webmanifest","logo.png","icon-192.png","icon-512.png","apple-touch-icon.png","questions.json","img/02-15q-4.png","img/02-16q-5.png","img/02-17q-6.png","img/07-01w-2.png","img/07-06w-4.png","img/07-08w-6.png","img/07-10w-7.png","img/07-11w-8.png","img/07-13w-10.png","img/07-15w-11.png","img/07-19w-13.png","img/07-24w-15.png","img/07-26w-17.png","img/07-27w-18.png","img/07-28w-19.png","img/07-32w-21.png","img/07-33w-23.png","img/10-04q-4.png","img/10-06q-6.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET")return;
 const u=new URL(e.request.url);if(u.origin!==location.origin)return;
 // spurningar: netið fyrst (nýjar breytingar sjást strax), skyndiminni ef ónettengt
 if(u.pathname.endsWith("questions.json")){
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request)));return}
 e.respondWith(caches.match(e.request).then(m=>m||fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));return r})));
});
