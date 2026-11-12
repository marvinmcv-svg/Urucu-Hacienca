import type { APIRoute } from 'astro';
import Anthropic from '@anthropic-ai/sdk';
import { MARVIN_SYSTEM } from '../../lib/marvin-prompt';
import { isLocale, localeNames } from '../../i18n/ui';

export const prerender = false;

const MODEL = process.env.MARVIN_MODEL || 'claude-opus-5-5';
const MAX_TURNS = 12;
const MAX_CHARS = 800;
const client = new Anthropic(); // reads ANTHROPIC_API_KEY

// Best-effort per-instance rate limit (serverless instances don't share memory).
const hits = new Map<string, { n: number; reset: number }>();
function limited(ip: string, max = 20, windowMs = 10 * 60_000) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || h.reset < now) { hits.set(ip, { n: 1, reset: now + windowMs }); return false; }
  return ++h.n > max;
}

type Turn = { role: 'user' | 'assistant'; content: string };
function clean(body: unknown): { lang: string; messages: Turn[] } | null {
  if (!body || typeof body !== 'object') return null;
  const { lang, messages } = body as { lang?: unknown; messages?: unknown };
  if (typeof lang !== 'string' || !isLocale(lang) || !Array.isArray(messages) || messages.length === 0) return null;
  const turns = messages.slice(-MAX_TURNS).filter(
    (m): m is Turn => !!m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim() !== '',
  ).map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
  while (turns[0]?.role === 'assistant') turns.shift();
  if (turns.at(-1)?.role !== 'user') return null;
  return { lang, messages: turns };
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || clientAddress || 'unknown';
  if (limited(ip)) return new Response('Too many requests', { status: 429 });

  const input = clean(await request.json().catch(() => null));
  if (!input) return new Response('Bad request', { status: 400 });

  const stream = client.beta.messages.stream({
    model: MODEL,
    max_tokens: 2048, // short chat replies; also a per-request cost cap
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    output_config: { effort: 'low' },
    system: [{ type: 'text', text: MARVIN_SYSTEM, cache_control: { type: 'ephemeral' } }],
    messages: [
      ...input.messages,
      { role: 'system', content: `Page language: ${localeNames[input.lang as keyof typeof localeNames]}.` },
    ],
  });

  // Pull the first event before answering, so auth/API failures become a clean 503
  // instead of a 200 that breaks mid-stream.
  const events = stream[Symbol.asyncIterator]();
  let first: IteratorResult<(typeof stream extends AsyncIterable<infer E> ? E : never)>;
  try {
    first = await events.next();
  } catch (err) {
    console.error('marvin', err instanceof Anthropic.APIError ? `${err.status} ${err.message}` : String(err));
    return new Response('Marvin unavailable', { status: 503 });
  }

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for (let r = first; !r.done; r = await events.next()) {
          const event = r.value;
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === 'refusal') controller.enqueue(encoder.encode('\n<<WA:general>>'));
      } catch (err) {
        console.error('marvin', err instanceof Anthropic.APIError ? `${err.status} ${err.message}` : String(err));
        controller.error(err);
        return;
      }
      controller.close();
    },
    cancel() { stream.abort(); },
  });

  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' } });
};
