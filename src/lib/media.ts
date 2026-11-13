import type { ImageMetadata } from 'astro';

const photos = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.jpg', { eager: true });

export function photo(id: string): ImageMetadata {
  const m = photos[`../assets/photos/${id}.jpg`];
  if (!m) throw new Error(`Unknown photo: ${id}`);
  return m.default;
}
export const videoSrc = (id: string) => `/media/video/${id}.mp4`;
export const posterSrc = (id: string) => `/media/poster/${id}.jpg`;
const landscape = new Set(['abby-lote42', 'genio-semen']);
export const isLandscape = (id: string) => landscape.has(id);
