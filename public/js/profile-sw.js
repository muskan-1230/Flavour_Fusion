// Service Worker for profile image caching
const CACHE_NAME = 'profile-cache-v1';

// Install event - cache key resources
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll([
                    '/',
                    '/css/profile.css',
                    '/js/profile.js',
                    '/images/default-avatar.png'
                ]);
            })
    );
});

// Fetch event - serve from cache if available
self.addEventListener('fetch', function(event) {
    // Check if this is a request for the profile image
    if (event.request.url.includes('profile-image') || 
        event.request.url.includes('avatar')) {
        
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                // Try to get from network first
                return fetch(event.request)
                    .then(function(networkResponse) {
                        // Cache the new response
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    })
                    .catch(function() {
                        // If network fails, try the cache
                        return cache.match(event.request);
                    });
            })
        );
    } else {
        // For other requests, try cache first, then network
        event.respondWith(
            caches.match(event.request)
                .then(function(response) {
                    return response || fetch(event.request);
                })
        );
    }
}); 