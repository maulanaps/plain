const VERSION = 'v2'

const cacheResources = async (resources) => {
    const cache = await caches.open(VERSION)
    await cache.addAll(resources)
}


self.addEventListener('install', (event) => {
    event.waitUntil(cacheResources([
        '/',
        'app.js'
    ]))

    console.log('Service Worker installed ', VERSION);
})

self.addEventListener('activate', () => {
    console.log('Service Worker activated');
})

self.addEventListener('fetch', (event) => {
    event.respondWith(cacheFirst(event))
})


const cacheFirst = async (event) => {
    const cachedRequest = await caches.match(event.request);

    if (cachedRequest) {
        return cachedRequest
    }

    try {

        const response = await fetch(event.request)
        event.waitUntil(putInCache(event.request, response.clone()))
        return response
    } catch (error) {
        return new Response("Network error happened", {
            status: 408,
            headers: { "Content-Type": "text/plain" },
        });
    }
}

const putInCache = async (request, response) => {
    const cache = await caches.open(VERSION)
    await cache.put(request, response)
}