self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('coatl-store').then((cache) => cache.addAll([
        'lib/echarts.min.js',
        'lib/leaflet.css',
        'lib/leaflet.js',
        'lib/leaflet.js.map',
        'lib/papaparse.js',
        'lib/papaparse.min.js',
        'lib/series_lib.js',
        'agm_series.html',
        'index.js',
        'css/series.css',
        'series.js',
        'img/mapa_base.png',
        'img/unam_negro.svg',
        'img/ioa_original.svg',
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
