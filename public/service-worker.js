if (!self.define) {
  let e,
    s = {};
  const a = (a, t) => (
    (a = new URL(a + '.js', t).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          ((e.src = a), (e.onload = s), document.head.appendChild(e));
        } else ((e = a), importScripts(a), s());
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (t, c) => {
    const n =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[n]) return;
    let i = {};
    const r = (e) => a(e, n),
      o = { module: { uri: n }, exports: i, require: r };
    s[n] = Promise.all(t.map((e) => o[e] || r(e))).then((e) => (c(...e), i));
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
          revision: '5704433f0fbaaee7a560209fe1fb0bc1',
        },
        {
          url: '/_next/static/chunks/108-c5e59c7d4275cb55.js',
          revision: 'zcDGS8aL8zQKsT_Pt_41G',
        },
        {
          url: '/_next/static/chunks/389-58ef12d42f66ac85.js',
          revision: 'zcDGS8aL8zQKsT_Pt_41G',
        },
        {
          url: '/_next/static/chunks/4bd1b696-4157470e0b220ddc.js',
          revision: 'zcDGS8aL8zQKsT_Pt_41G',
        },
        {
          url: '/_next/static/chunks/52-aaa1c5629bb70c4c.js',
          revision: 'zcDGS8aL8zQKsT_Pt_41G',
        },
        {
          url: '/_next/static/chunks/546-85561a4ad6e44cca.js',
          revision: 'zcDGS8aL8zQKsT_Pt_41G',
        },
        {
          url: '/_next/static/chunks/684-c0cfce97d5ef00a4.js',
          revision: 'zcDGS8aL8zQKsT_Pt_41G',
        },
        {
          url: '/_next/static/chunks/874-99799db804f7eda4.js',
          revision: 'zcDGS8aL8zQKsT_Pt_41G',
        },
        {
          url: '/_next/static/chunks/959-b4a9b9b559b8bc3e.js',
          revision: 'zcDGS8aL8zQKsT_Pt_41G',
        },
        {
          url: '/_next/static/chunks/app/(analytics)/analytics/page-797c426e77f56420.js',
          revision: 'zcDGS8aL8zQKsT_Pt_41G',
        },
        {
          url: '/_next/static/chunks/app/(analytics)/layout-717cabbb05406934.js',
          revision: 'zcDGS8aL8zQKsT_Pt_41G',
        },
        {
          url: '/_next/static/chunks/app/(marketing)/layout-412c5c66b92052fa.js',
          revision: 'zcDGS8aL8zQKsT_Pt_41G',
        },
        {
          url: '/_next/static/chunks/app/(marketing)/page-cc6f981d658cddb1.js',
          revision: 'zcDGS8aL8zQKsT_Pt_41G',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-5644411b4062e3a0.js',
          revision: 'zcDGS8aL8zQKsT_Pt_41G',
        },
        {
          url: '/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-c83354cd3dfc3c92.js',
          revision: 'zcDGS8aL8zQKsT_Pt_41G',
        },
        {
          url: '/_next/static/chunks/app/api/v1/favoritos/route-f418e59bae361df7.js',
          revision: 'zcDGS8aL8zQKsT_Pt_41G',
        },
        {
          url: '/_next/static/chunks/app/api/v1/produtos/route-b4ff67e56f46d7be.js',
          revision: 'zcDGS8aL8zQKsT_Pt_41G',
        },
        {
          url: '/_next/static/chunks/app/api/v1/whatsapp/track/route-123d11283f33aca5.js',
          revision: 'zcDGS8aL8zQKsT_Pt_41G',
        },
        {
          url: '/_next/static/chunks/app/api/webhooks/sanity/route-22c07e86d0af3f8a.js',
          revision: 'zcDGS8aL8zQKsT_Pt_41G',
        },
        {
          url: '/_next/static/chunks/app/auth/error/page-d3e592e6e7d660ee.js',
          revision: 'zcDGS8aL8zQKsT_Pt_41G',
        },
        {
          url: '/_next/static/chunks/app/auth/login/page-8d05eaec01db187f.js',
          revision: 'zcDGS8aL8zQKsT_Pt_41G',
        },
        {
          url: '/_next/static/chunks/app/layout-7ecf29cf24fed894.js',
          revision: 'zcDGS8aL8zQKsT_Pt_41G',
        },
        {
          url: '/_next/static/chunks/framework-b326bfe0905a39d9.js',
          revision: 'zcDGS8aL8zQKsT_Pt_41G',
        },
        {
          url: '/_next/static/chunks/main-6017e4eb7b184cf5.js',
          revision: 'zcDGS8aL8zQKsT_Pt_41G',
        },
        {
          url: '/_next/static/chunks/main-app-0c1b6fdca856db10.js',
          revision: 'zcDGS8aL8zQKsT_Pt_41G',
        },
        {
          url: '/_next/static/chunks/pages/_app-da15c11dea942c36.js',
          revision: 'zcDGS8aL8zQKsT_Pt_41G',
        },
        {
          url: '/_next/static/chunks/pages/_error-cc3f077a18ea1793.js',
          revision: 'zcDGS8aL8zQKsT_Pt_41G',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-7c942974b1d552a0.js',
          revision: 'zcDGS8aL8zQKsT_Pt_41G',
        },
        {
          url: '/_next/static/css/3eaf2fd3412e6df1.css',
          revision: '3eaf2fd3412e6df1',
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
        {
          url: '/_next/static/zcDGS8aL8zQKsT_Pt_41G/_buildManifest.js',
          revision: 'dcf4d5274526b11a4e619fa058849a57',
        },
        {
          url: '/_next/static/zcDGS8aL8zQKsT_Pt_41G/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/manifest.json', revision: '78c86e3db85259dbedc54b2695428b71' },
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
              event: a,
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
