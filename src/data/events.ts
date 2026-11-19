import type { L } from '../i18n/ui';
import type { Breed } from './animals';

export type Lot = {
  lot?: number;
  animal: string;
  /** Links the lot to an animal in animals.ts; its photo, video, pedigree and details are used unless set here. */
  slug?: string;
  breed?: Breed;
  sex?: 'f' | 'm';
  born?: string; // YYYY-MM-DD
  pedigree?: string;
  photo?: string; // key in src/assets/photos
  video?: string; // key in public/media/video
  credit?: string;
  note?: L;
};

export type Event = {
  /** URL name of the auction page: /es/remates/<slug>/ */
  slug: string;
  name: string;
  kind: 'auction' | 'show';
  date: string; // ISO, local time (Bolivia, UTC-4)
  hours?: number; // expected length, for calendars (default 4)
  venue: string;
  about?: L;
  lots?: Lot[];
  stream?: string; // live-stream link (YouTube, Facebook, a TV channel's page…)
  catalogue?: string; // link to a PDF catalogue, if the organiser publishes one
  note?: L;
  video?: string;
  credit?: string;
};

// Source: @haciendasurucu captions. Pages are built ahead of time; FreshEvents.astro re-checks the dates in the visitor's browser.
export const events: Event[] = [
  {
    slug: 'evolucion-genetica-sindi-2026', name: '4.º Remate Evolución Genética Sindi', kind: 'auction', date: '2026-11-07T12:00:00-04:00',
    venue: 'Salón Guaraní · Fexpocruz', lots: [{ lot: 29, animal: 'Amira de Rincón del Urucú', slug: 'amira-de-rincon-del-urucu' }],
    video: 'amira-lote29', credit: '@somosfotorural',
  },
  {
    slug: 'expocruz-2026', name: 'Expocruz 2026', kind: 'show', date: '2026-09-25T09:00:00-04:00', venue: 'Fexpocruz · Santa Cruz',
    note: { es: 'Reservada Gran Campeona Sindi: 2258 FIV Camparino.', en: 'Reserve Grand Champion Sindi: 2258 FIV Camparino.', pt: 'Reservada Grande Campeã Sindi: 2258 FIV Camparino.' },
    video: 'expocruz-sindi-reel',
  },
  {
    slug: 'gala-de-excelencia-2026', name: '1.er Remate Gala de Excelencia', kind: 'auction', date: '2026-09-11T20:00:00-04:00', venue: 'Fexpocruz',
    lots: [{ lot: 42, animal: 'Abby de Rincón del Urucú (50%)', slug: 'abby-de-rincon-del-urucu' }],
    video: 'abby-lote42',
  },
  {
    slug: 'fexposiv-2026', name: 'FexpoSIV 2026', kind: 'show', date: '2026-07-25T09:00:00-04:00', venue: 'Fexpocruz · Santa Cruz',
    note: { es: 'Gran Campeona y Reservado Gran Campeón de la raza Sindi.', en: 'Grand Champion Female and Reserve Grand Champion Male, Sindi breed.', pt: 'Grande Campeã e Reservado Grande Campeão da raça Sindi.' },
    video: 'gran-campeona-fexposiv-reel', credit: '@asocebu_bolivia',
  },
  {
    slug: 'reproductores-premium-nelore-futuro-2026', name: '1.er Remate Reproductores Premium · Nelore Futuro Weekend', kind: 'auction', date: '2026-07-19T10:00:00-04:00',
    venue: 'Salón Guaraní · Fexpocruz', lots: [{ animal: 'Galáctico FIV Urucú (JNM 6519)', slug: 'galactico-fiv-urucu' }],
    video: 'galactico-fiv',
  },
  {
    slug: 'nueva-generacion-2026', name: '6.º Remate Nueva Generación', kind: 'auction', date: '2026-07-12T10:00:00-04:00', venue: 'Santa Cruz de la Sierra',
    note: { es: 'Junto a Cabaña Moxos y Esterlina Ganadería.', en: 'Together with Cabaña Moxos and Esterlina Ganadería.', pt: 'Junto com Cabaña Moxos e Esterlina Ganadería.' },
    video: 'remate-nueva-generacion', credit: '@melhora_mais',
  },
];

/** An event stays "upcoming" until this long after it starts, so it isn't dropped while it is still on. */
export const GRACE_MS = 12 * 60 * 60 * 1000;
const t = (e: Event) => new Date(e.date).getTime();
export const auctions = events.filter((e) => e.kind === 'auction');
export const eventBySlug = (slug: string) => events.find((e) => e.slug === slug);
/** When an event ends, for calendars and the "live" state. */
export const endOf = (e: Event) => new Date(t(e) + (e.hours ?? 4) * 3_600_000);
/** Auctions still to come, soonest first. */
export const upcoming = (now = new Date()) =>
  events.filter((e) => e.kind === 'auction' && t(e) + GRACE_MS >= now.getTime()).sort((a, b) => t(a) - t(b));
/** Events that are over, most recent first. */
export const past = (now = new Date()) => events.filter((e) => t(e) + GRACE_MS < now.getTime()).sort((a, b) => t(b) - t(a));
/** Events still to come at build time, most recent first: rendered hidden so the visitor's browser can move them into "past" later. */
export const later = (now = new Date()) => events.filter((e) => t(e) + GRACE_MS >= now.getTime()).sort((a, b) => t(b) - t(a));
