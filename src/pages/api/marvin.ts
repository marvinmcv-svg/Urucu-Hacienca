import type { APIRoute } from 'astro';
import { MARVIN_SYSTEM } from '../../lib/marvin-prompt';
import { isLocale, localeNames } from '../../i18n/ui';

export const prerender = false;

// NVIDIA's OpenAI-compatible endpoint. The key lives only in the server environment (NVIDIA_API_KEY).
const API = 'https://integrate.api.nvidia.com/v1/chat/completions';
const MODEL = process.env.MARVIN_MODEL || 'nvidia/nemotron-3-ultra-550b-a55b';
// Reasoning makes replies slower and is never shown in a chat bubble, so it is off unless asked for.
const THINKING = process.env.MARVIN_THINKING === 'true';
const MAX_TURNS = 12;
const MAX_CHARS = 800;

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
  const key = process.env.NVIDIA_API_KEY;
  if (!key) { console.error('marvin: NVIDIA_API_KEY is not set'); return new Response('Marvin unavailable', { status: 503 }); }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || clientAddress || 'unknown';
  if (limited(ip)) return new Response('Too many requests', { status: 429 });

  const input = clean(await request.json().catch(() => null));
  if (!input) return new Response('Bad request', { status: 400 });

  const ctrl = new AbortController();
  request.signal.addEventListener('abort', () => ctrl.abort());
  let upstream: Response;
  try {
    upstream = await fetch(API, {
      method: 'POST',
      signal: ctrl.signal,
      headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json', accept: 'text/event-stream' },
      body: JSON.stringify({
        model: MODEL,
        stream: true,
        temperature: 0.6,
        top_p: 0.95,
        max_tokens: THINKING ? 4096 : 700, // short chat replies; also a per-request cost cap
        chat_template_kwargs: { enable_thinking: THINKING },
        messages: [
          { role: 'system', content: `${MARVIN_SYSTEM}\n\nPage language: ${localeNames[input.lang as keyof typeof localeNames]}.` },
          ...input.messages,
        ],
      }),
    });
  } catch (err) {
    console.error('marvin fetch', String(err));
    return new Response('Marvin unavailable', { status: 503 });
  }
  if (!upstream.ok || !upstream.body) {
    console.error('marvin upstream', upstream.status, (await upstream.text().catch(() => '')).slice(0, 300));
    return new Response('Marvin unavailable', { status: 503 });
  }

  // Server-sent events in, plain text out: only the answer text, never the reasoning.
  const encoder = new TextEncoder();
  const reader = upstream.body.pipeThrough(new TextDecoderStream()).getReader();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      let buf = '';
      try {
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          buf += value;
          const lines = buf.split('\n');
          buf = lines.pop() ?? '';
          for (const line of lines) {
            const data = line.trim();
            if (!data.startsWith('data:')) continue;
            const json = data.slice(5).trim();
            if (json === '[DONE]') continue;
            try {
              const text = JSON.parse(json)?.choices?.[0]?.delta?.content;
              if (typeof text === 'string' && text) controller.enqueue(encoder.encode(text));
            } catch { /* partial or keep-alive line */ }
          }
        }
      } catch (err) {
        console.error('marvin stream', String(err));
        controller.error(err);
        return;
      }
      controller.close();
    },
    cancel() { ctrl.abort(); },
  });

  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' } });
};
