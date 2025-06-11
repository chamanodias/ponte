// Define os arquivos que queremos que fiquem em cache
const CACHE_NAME = 'ponte-iot-cache-v1';
const urlsToCache = [
  '/',
  'index.html' // Assumindo que seu arquivo se chama index.html
];

// Evento de instalação: abre o cache e adiciona os arquivos principais
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de fetch: responde com o arquivo do cache se ele existir
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o que está no cache, ou faz a requisição à rede se não encontrar
        return response || fetch(event.request);
      })
  );
});