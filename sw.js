const CACHE_NAME ='restaurant-static-v1';

self.addEventListener('fetch',function(event){
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request)
                .then(function (response) {
                    const clonedResponse = response.clone();
                    caches.open(CACHE_NAME)
                    .then(function (cache) {
                        cache.put(event.request,clonedResponse);
                    });
                    return response;
            });
        })
    );
});

self.addEventListener('install',function (event) {
    var urlsToCache = [
        '/',
        '/index.html',
        '/css/styles.css',
        '/js/restaurant_info.js'
    ];

    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
})