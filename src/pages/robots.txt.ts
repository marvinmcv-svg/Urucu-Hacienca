import type { APIRoute } from 'astro';

// Points crawlers at the sitemap on whatever address the site is configured for (SITE_URL).
export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${new URL('/sitemap.xml', site).href}\n`, { headers: { 'content-type': 'text/plain' } });
