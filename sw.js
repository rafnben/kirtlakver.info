const V="kv-v7",SHELL=["./","index.html","tilfelli.html","manifest.webmanifest","logo.png","icon-192.png","icon-512.png","apple-touch-icon.png","questions.json","cases.json","img/06f0710558.png","img/189a47575c.png","img/2e625ebbc2.png","img/33e9439eac.png","img/50d159cd64.png","img/56ad98d720.png","img/5a1cf2806b.png","img/5a6ae69237.png","img/5bd53d1019.png","img/6173cd0ec3.png","img/6cf41645d5.png","img/9fe7084a11.png","img/a00941d97e.png","img/bd8138e221.png","img/ceed334c7e.png","img/f1d77595c3.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET")return;
 const u=new URL(e.request.url);if(u.origin!==location.origin)return;
 // spurningar: netið fyrst (nýjar breytingar sjást strax), skyndiminni ef ónettengt
 if((u.pathname.endsWith("questions.json")||u.pathname.endsWith("cases.json"))){
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request)));return}
 e.respondWith(caches.match(e.request).then(m=>m||fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));return r})));
});
