const CACHE_NAME = 'renda-de-file-v3.1.0';
const STATIC_CACHE = 'static-v3.1.0';
const DYNAMIC_CACHE = 'dynamic-v3.1.0';
const IMAGE_CACHE = 'images-v3.1.0';

// URLs para cache estático (sempre cached)
const STATIC_URLS = [
  '/',
  '/catalogo',
  '/associacoes',
  '/historia',
  '/noticias',
  '/eventos',
  '/contato',
  '/favoritos',
  '/offline',
  '/manifest.json',
];

// URLs de assets estáticos
const STATIC_ASSETS = [
  '/favicon.ico',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

// Estratégias de cache
const STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  NETWORK_ONLY: 'network-only',
  CACHE_ONLY: 'cache-only',
};

// Configuração de rotas
const ROUTE_CONFIGS = [
  {
    pattern: /\/_next\/static\//,
    strategy: STRATEGIES.CACHE_FIRST,
    cache: STATIC_CACHE,
  },
  {
    pattern: /\/api\//,
    strategy: STRATEGIES.NETWORK_FIRST,
    cache: DYNAMIC_CACHE,
  },
  {
    pattern: /\.(png|jpg|jpeg|svg|gif|webp|ico)$/,
    strategy: STRATEGIES.CACHE_FIRST,
    cache: IMAGE_CACHE,
  },
  {
    pattern: /\/(produto|noticias|eventos)\//,
    strategy: STRATEGIES.STALE_WHILE_REVALIDATE,
    cache: DYNAMIC_CACHE,
  },
];

// Install event
self.addEventListener('install', (event) => {
  console.log('SW: Installing...');

  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('SW: Caching static assets');
        return cache.addAll([...STATIC_URLS, ...STATIC_ASSETS]);
      }),
    ])
  );

  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('SW: Activating...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (
            cacheName !== STATIC_CACHE &&
            cacheName !== DYNAMIC_CACHE &&
            cacheName !== IMAGE_CACHE
          ) {
            console.log('SW: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// Fetch event
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorar requests que não são GET
  if (request.method !== 'GET') {
    return;
  }

  // Ignorar chrome-extension e outros protocolos
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Encontrar estratégia de cache baseada na URL
  const routeConfig = ROUTE_CONFIGS.find((config) =>
    config.pattern.test(url.pathname)
  );

  if (routeConfig) {
    event.respondWith(handleWithStrategy(request, routeConfig));
  } else {
    // Estratégia padrão para páginas
    event.respondWith(handlePageRequest(request));
  }
});

// Estratégias de cache
async function handleWithStrategy(request, config) {
  const { strategy, cache: cacheName } = config;

  switch (strategy) {
    case STRATEGIES.CACHE_FIRST:
      return cacheFirst(request, cacheName);
    case STRATEGIES.NETWORK_FIRST:
      return networkFirst(request, cacheName);
    case STRATEGIES.STALE_WHILE_REVALIDATE:
      return staleWhileRevalidate(request, cacheName);
    case STRATEGIES.NETWORK_ONLY:
      return fetch(request);
    case STRATEGIES.CACHE_ONLY:
      return caches.match(request);
    default:
      return fetch(request);
  }
}

// Cache First
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('SW: Cache first failed:', error);
    throw error;
  }
}

// Network First
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('SW: Network failed, trying cache:', error);
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
}

// Stale While Revalidate
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  // Buscar na rede em background
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  });

  // Retornar cache se disponível, senão aguardar rede
  return cached || fetchPromise;
}

// Handler especial para páginas
async function handlePageRequest(request) {
  try {
    // Tentar rede primeiro para páginas
    const response = await fetch(request);

    // Cache apenas se for successful
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    // Se falhar, tentar cache
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }

    // Se não tem cache, mostrar página offline
    const url = new URL(request.url);
    if (
      url.pathname.startsWith('/produto/') ||
      url.pathname.startsWith('/noticias/') ||
      url.pathname.startsWith('/eventos/')
    ) {
      return caches.match('/offline');
    }

    throw error;
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  console.log('SW: Push received');

  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    data: data.data,
    actions: data.actions || [],
    tag: data.tag || 'default',
    renotify: true,
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  console.log('SW: Notification clicked');

  event.notification.close();

  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Verificar se já existe uma janela aberta
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }

        // Abrir nova janela
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// Background Sync
self.addEventListener('sync', (event) => {
  console.log('SW: Background sync:', event.tag);

  if (event.tag === 'favoritos-sync') {
    event.waitUntil(syncFavoritos());
  }
});

// Sync favoritos quando voltar online
async function syncFavoritos() {
  try {
    // Implementar sincronização de favoritos
    console.log('SW: Syncing favoritos...');

    // Buscar favoritos pendentes no IndexedDB
    // Enviar para servidor
    // Atualizar estado local
  } catch (error) {
    console.error('SW: Favoritos sync failed:', error);
  }
}

// Message handling
self.addEventListener('message', (event) => {
  console.log('SW: Message received:', event.data);

  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data?.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Cleanup old caches periodically
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'cleanup') {
    event.waitUntil(cleanupOldCaches());
  }
});

async function cleanupOldCaches() {
  const cacheNames = await caches.keys();
  const oldCaches = cacheNames.filter(
    (name) => !name.includes('v3.1.0') && name.startsWith('renda-de-file')
  );

  return Promise.all(oldCaches.map((cacheName) => caches.delete(cacheName)));
}
