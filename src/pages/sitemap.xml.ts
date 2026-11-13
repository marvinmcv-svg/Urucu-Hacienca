import type { APIRoute } from 'astro';
import { locales, routes, htmlLang } from '../i18n/ui';
import { animals } from '../data/animals';

export const GET: APIRoute = ({ site }) => {
  const paths = [...Object.values(routes), ...animals.map((a) => `plantel/${a.slug}/`)];
  const url = (l: string, p: string) => new URL(`/${l}/${p}`, site).href;
  const body = paths.flatMap((p) => locales.map((l) => `<url><loc>${url(l, p)}</loc>${
    locales.map((a) => `<xhtml:link rel="alternate" hreflang="${htmlLang[a]}" href="${url(a, p)}"/>`).join('')}</url>`)).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${body}</urlset>`,
    { headers: { 'content-type': 'application/xml' } });
};
