import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // The public address used for canonical links, the sitemap and WhatsApp/social preview images.
  // Set SITE_URL in Vercel once the ranch's own domain is connected (e.g. https://haciendasurucu.com).
  site: process.env.SITE_URL || 'https://haciendas-urucu.vercel.app',
  adapter: vercel(),
  redirects: { '/': '/es/' },
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  vite: { plugins: [tailwindcss()] },
});
