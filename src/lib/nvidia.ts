// NVIDIA API catalog client for Marvin (OpenAI-compatible). The key is read on the server only.

// NVIDIA's OpenAI-compatible endpoint. The key lives only in the server environment (NVIDIA_API_KEY).
export const API = `${process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1'}/chat/completions`;
// Nemotron 3 Super: the Ultra (550B) model was too slow to start answering on NVIDIA's hosted API.
const MODEL = process.env.MARVIN_MODEL || 'nvidia/nemotron-3-super-120b-a12b';
// Used when the main model errors or takes too long to start answering. Comma-separated.
const FALLBACKS = (process.env.MARVIN_FALLBACK_MODELS ?? 'nvidia/nemotron-3.5-lightning-30b-a3b,deepseek-ai/deepseek-v4.1-flash,z-ai/glm-5.3-flash').split(',').map((m) => m.trim()).filter(Boolean);
export const MODELS = [MODEL, ...FALLBACKS.filter((m) => m !== MODEL)];
const START_TIMEOUT_MS = 25_000; // time allowed for a model to start responding
// Reasoning makes replies slower and is never shown in a chat bubble, so it is off unless asked for.
const THINKING = process.env.MARVIN_THINKING === 'true';
export type Msg = { role: string; content: string };
type Call = { ok: true; res: Response } | { ok: false; status: number | string; detail: string };

/** One streaming request to one model. Fails fast (timeout) so the next model can be tried. */
export async function callModel(key: string, model: string, messages: Msg[], signal: AbortSignal, opts: { stream?: boolean; maxTokens?: number } = {}): Promise<Call> {
  const timer = new AbortController();
  const t = setTimeout(() => timer.abort(), START_TIMEOUT_MS);
  try {
    const res = await fetch(API, {
      method: 'POST',
      signal: AbortSignal.any([signal, timer.signal]),
      headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json', accept: opts.stream === false ? 'application/json' : 'text/event-stream' },
      body: JSON.stringify({
        model,
        stream: opts.stream ?? true,
        temperature: 0.6,
        top_p: 0.95,
        max_tokens: opts.maxTokens ?? (THINKING ? 4096 : 700), // short chat replies; also a per-request cost cap
        // Only Nemotron models understand this switch.
        ...(model.includes('nemotron') ? { chat_template_kwargs: { enable_thinking: THINKING } } : {}),
        messages,
      }),
    });
    if (!res.ok || !res.body) return { ok: false, status: res.status, detail: (await res.text().catch(() => '')).slice(0, 300) };
    return { ok: true, res };
  } catch (err) {
    return { ok: false, status: timer.signal.aborted ? 'timeout' : 'network', detail: String(err).slice(0, 200) };
  } finally {
    clearTimeout(t);
  }
}

