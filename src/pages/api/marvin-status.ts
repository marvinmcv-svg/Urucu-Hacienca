import type { APIRoute } from 'astro';
import { MODELS, callModel } from '../../lib/nvidia';

export const prerender = false;

// Health check for Marvin: is the key set, and does each model answer? Never reveals the key.
// Open /api/marvin-status/ in a browser. Limited to a few checks per visitor.
const seen = new Map<string, number[]>();

export const GET: APIRoute = async ({ request, clientAddress }) => {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || clientAddress || 'unknown';
  const now = Date.now();
  const recent = (seen.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 5) return new Response('Too many requests', { status: 429 });
  seen.set(ip, [...recent, now]);

  const key = process.env.NVIDIA_API_KEY;
  const results = [];
  if (key) {
    for (const model of MODELS) {
      const t0 = Date.now();
      const r = await callModel(key, model, [{ role: 'user', content: 'Reply with: ok' }], request.signal, { stream: false, maxTokens: 8 });
      if (r.ok) await r.res.body?.cancel();
      results.push({ model, ok: r.ok, status: r.ok ? 200 : r.status, ms: Date.now() - t0, ...(r.ok ? {} : { detail: r.detail }) });
    }
  }
  return Response.json({ keySet: !!key, models: results }, { headers: { 'cache-control': 'no-store' } });
};
