if (!self.define) {
  let e,
    s = {};
  const c = (c, t) => (
    (c = new URL(c + '.js', t).href),
    s[c] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          ((e.src = c), (e.onload = s), document.head.appendChild(e));
        } else ((e = c), importScripts(c), s());
      }).then(() => {
        let e = s[c];
        if (!e) throw new Error(`Module ${c} didn’t register its module`);
        return e;
      })
  );
  self.define = (t, a) => {
    const i =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[i]) return;
    let n = {};
    const u = (e) => c(e, i),
      r = { module: { uri: i }, exports: n, require: u };
    s[i] = Promise.all(t.map((e) => r[e] || u(e))).then((e) => (a(...e), n));
  };
}
define(['./workbox-4754cb34'], function (e) {
  'use strict';
  (importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/app-build-manifest.json',
          revision: '51cac38019e3c07156b4da2736b7f868',
        },
        {
          url: '/_next/static/HKlVJ0ud6mF53LezmOcRF/_buildManifest.js',
          revision: '98f39d114bc7e28cacc5dca2872985fb',
        },
        {
          url: '/_next/static/HKlVJ0ud6mF53LezmOcRF/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/1684-ff87f77063118990.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/1800-4b3e37a9a87e984c.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/2108-a27bb81af3a66ee4.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/2999-bed2d3634dc11050.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/4195.9bd0b6d22b24bc4a.js',
          revision: '9bd0b6d22b24bc4a',
        },
        {
          url: '/_next/static/chunks/4277-df121688a085fe5d.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/4357-93e854dcec1b63cb.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/4368-1c6454afdef9e393.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/4373-7f502cf28cce345f.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/4406.a8aca24d1c2b96f7.js',
          revision: 'a8aca24d1c2b96f7',
        },
        {
          url: '/_next/static/chunks/4440-a655eaf13b58ec78.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/4565-d76058e21e0806a2.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/458-7b85f40b5e67e578.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/4bd1b696-866d3c129c448909.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/5152-474fb8a45220a6ea.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/5647-f3f43b207239c103.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/6296-2cd86f2c5141f719.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/6545-1c33474268a4377a.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/6671-00baa0af4e1434e1.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/6874-4310d9aa909b33a1.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/76-ecb281418fd65ac6.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/7806-9862c4fb01435577.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/8034-feede2449e44e183.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/9731-7f8375aaff2d93bb.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/app/(analytics)/analytics/page-f3003888c5400c29.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/app/(analytics)/layout-2e62f0abd7a4e07c.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/app/(marketing)/layout-d38673c37da81fcd.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/app/(marketing)/page-56c35d03b7494fbe.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-9e26d8f30eac14d3.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-c2810b35231f07b5.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/app/api/v1/analytics/web-vitals/route-520173c64056222d.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/app/api/v1/contato/route-1eadaa2dfda7df7e.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/app/api/v1/newsletter/route-b622daa49aac9a79.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/app/api/v1/produtos/route-83b3ce0936fb4345.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/app/api/v1/whatsapp/track/route-d01a09a3edc04e41.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/app/api/webhooks/sanity/route-024bd6528282d78b.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/app/associacoes/page-cca36d22bf352c6c.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/app/auth/error/page-c88f356671e92df9.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/app/auth/login/page-45e291d2c9e5c71f.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/app/catalogo/page-77aeaab553162721.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/app/contato/page-75bc067d17f301ab.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/app/historia/page-f43895844717d148.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/app/layout-13127ee8ff8aef49.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/app/noticias/%5Bslug%5D/page-fd86f902fe3e97ce.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/app/noticias/page-f7ed5072c31cf928.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/app/offline/page-5b4f32750997728a.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/app/produto/%5Bslug%5D/page-e10cc61e5befd2c9.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/app/robots.txt/route-b3267d7e06d7c611.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/app/sitemap.xml/route-cdee7ccb7b01a1e9.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/framework-b51797d47520f9f2.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/main-app-08466fe44ee9d0ae.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/main-e6c4efaee82494d0.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/pages/_app-eb694f3fd49020c8.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/pages/_error-2b3482c094a540b4.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-522784fe2fb2e5d3.js',
          revision: 'HKlVJ0ud6mF53LezmOcRF',
        },
        {
          url: '/_next/static/css/bbdf697dc3d70e46.css',
          revision: 'bbdf697dc3d70e46',
        },
        {
          url: '/_next/static/media/26a46d62cd723877-s.woff2',
          revision: 'befd9c0fdfa3d8a645d5f95717ed6420',
        },
        {
          url: '/_next/static/media/47f136985ef5b5cb-s.woff2',
          revision: '62f762afb90d7743f6916ea0cce473af',
        },
        {
          url: '/_next/static/media/4ead58c4dcc3f285-s.woff2',
          revision: '774586d4bcb09cb42f38fc490d25b01b',
        },
        {
          url: '/_next/static/media/55c55f0601d81cf3-s.woff2',
          revision: '43828e14271c77b87e3ed582dbff9f74',
        },
        {
          url: '/_next/static/media/581909926a08bbc8-s.woff2',
          revision: 'f0b86e7c24f455280b8df606b89af891',
        },
        {
          url: '/_next/static/media/6af6b543dd3be231-s.p.woff2',
          revision: '26ed8f1835670f47c3daeff5e6d84b23',
        },
        {
          url: '/_next/static/media/8e9860b6e62d6359-s.woff2',
          revision: '01ba6c2a184b8cba08b0d57167664d75',
        },
        {
          url: '/_next/static/media/97e0cb1ae144a2a9-s.woff2',
          revision: 'e360c61c5bd8d90639fd4503c829c2dc',
        },
        {
          url: '/_next/static/media/df0a9ae256c0569c-s.woff2',
          revision: 'd54db44de5ccb18886ece2fda72bdfe0',
        },
        {
          url: '/_next/static/media/e4af272ccee01ff0-s.p.woff2',
          revision: '65850a373e258f1c897a2b3d75eb74de',
        },
        {
          url: '/_next/static/media/f7c8bed65df13031-s.woff2',
          revision: 'fe89f9f565f22acf40ad703bdc3c7dcc',
        },
        { url: '/manifest.json', revision: '78c86e3db85259dbedc54b2695428b71' },
        { url: '/sw.js', revision: '6b4f0291ae160fc5f5048eda2a52b39c' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: c,
              state: t,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET'
    ));
});
