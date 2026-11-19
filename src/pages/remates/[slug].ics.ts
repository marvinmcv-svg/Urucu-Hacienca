import type { APIRoute } from 'astro';
import { auctions, type Event } from '../../data/events';
import { ics } from '../../lib/auction';

// /remates/<slug>.ics: "Add to calendar" for Apple Calendar, Outlook and most phones (reminder one day before).
export const getStaticPaths = () => auctions.map((e) => ({ params: { slug: e.slug }, props: { e } }));

export const GET: APIRoute = ({ props, site }) => {
  const e = (props as { e: Event }).e;
  const url = new URL(`/es/remates/${e.slug}/`, site).href;
  return new Response(ics(e, url, `${e.venue} · Haciendas Urucú`), {
    headers: { 'content-type': 'text/calendar; charset=utf-8', 'content-disposition': `attachment; filename="${e.slug}.ics"` },
  });
};
