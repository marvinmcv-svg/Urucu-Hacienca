// Shared helpers for the home page films.
// Decoding is the main cost on phones, so a film plays only while it can be seen.

const pending = new WeakSet<HTMLVideoElement>();

/** Play or pause a film; starts loading it the first time it is wanted. */
export function want(v: HTMLVideoElement, on: boolean) {
  if (on) {
    if (!v.paused || pending.has(v)) return;
    if (v.preload === 'none') v.preload = 'auto';
    pending.add(v);
    v.play().catch(() => {}).finally(() => pending.delete(v));
  } else if (!v.paused) v.pause();
}

/** Start fetching a film ahead of time without playing it. */
export function warm(v: HTMLVideoElement) {
  if (v.preload === 'none') v.preload = 'auto';
}

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
/** The split desktop layout: wide and landscape. Portrait tablets get the phone layout. */
export const DESKTOP = '(min-width: 64rem) and (orientation: landscape)';
