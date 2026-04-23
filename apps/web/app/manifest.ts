import type { MetadataRoute } from 'next';
import { withBasePath } from '../lib/base-path';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ILYAS BANK 2.0',
    short_name: 'ILYAS BANK',
    start_url: withBasePath('/'),
    display: 'standalone',
    background_color: '#08111f',
    theme_color: '#ff5d36',
    icons: [
      {
        src: withBasePath('/icons/icon-192.svg'),
        sizes: '192x192',
        type: 'image/svg+xml',
        purpose: 'any maskable'
      },
      {
        src: withBasePath('/icons/icon-512.svg'),
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'any maskable'
      }
    ]
  };
}
