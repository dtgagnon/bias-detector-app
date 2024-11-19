/// <reference lib="webworker" />

import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst } from 'workbox-strategies';
import type { RouteMatchCallback } from 'workbox-core';

declare const self: ServiceWorkerGlobalScope;

// Precache all assets generated by your build process
precacheAndRoute(self.__WB_MANIFEST);

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy
const matchCallback: RouteMatchCallback = ({ url }) => {
  return url.origin === 'https://fonts.googleapis.com';
};

registerRoute(
  matchCallback,
  new NetworkFirst({
    cacheName: 'google-fonts-stylesheets',
  })
);

// Cache the underlying font files with a cache-first strategy for 1 year
registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-webfonts'
  })
);

// Cache analyzed URLs
registerRoute(
  /.*/,
  new NetworkFirst({
    cacheName: 'analyzed-pages'
  })
);