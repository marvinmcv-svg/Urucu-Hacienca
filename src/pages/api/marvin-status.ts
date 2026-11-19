import type { APIRoute } from 'astro';
import { API, MODELS, callModel } from '../../lib/nvidia';

export const prerender = false;

// Health check for Marvin: is the key set, and does each model answer? Never reveals the key.
// Open /api/marvin-status/ in a browser (add ?try=vendor/model,... to test others). Limited to a few checks per visitor.
const seen = new Map<string, number[]>();

export const GET: APIRoute = async ({ request, clientAddress }) => {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || clientAddress || 'unknown';
  const now = Date.now();
  const recent = (seen.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 5) return new Response('Too many requests', { status: 429 });
  seen.set(ip, [...recent, now]);

  const key = process.env.NVIDIA_API_KEY;
  // ?try=a,b,c tests other models from the "available" list too (up to 6), to pick working fallbacks.
  const extra = (new URL(request.url).searchParams.get('try') ?? '').split(',').map((m) => m.trim()).filter((m) => /^[\w.-]+\/[\w.-]+$/.test(m)).slice(0, 6);
  const models = [...new Set([...MODELS, ...extra])];
  const results = key ? await Promise.all(models.map(async (model) => {
    const t0 = Date.now();
    const r = await callModel(key, model, [{ role: 'user', content: 'Reply with: ok' }], request.signal, { stream: false, maxTokens: 8 });
    if (r.ok) await r.res.body?.cancel();
    return { model, inUse: MODELS.includes(model), ok: r.ok, status: r.ok ? 200 : r.status, ms: Date.now() - t0, ...(r.ok ? {} : { detail: r.detail }) };
  })) : [];
  // The models this key can use right now, so a retired or missing one is easy to replace.
  let available: string[] = [];
  if (key) {
    const r = await fetch(API.replace(/\/chat\/completions$/, '/models'), { headers: { authorization: `Bearer ${key}` } }).catch(() => null);
    const j = r?.ok ? await r.json().catch(() => null) : null;
    available = ((j?.data ?? []) as { id: string }[]).map((m) => m.id).sort();
  }
  return Response.json({ keySet: !!key, models: results, available }, { headers: { 'cache-control': 'no-store' } });
};
