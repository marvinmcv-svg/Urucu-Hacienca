import type { L } from '../i18n/ui';

export type Event = {
  name: string;
  kind: 'auction' | 'show';
  date: string; // ISO, local time (Bolivia, UTC-4)
  venue: string;
  lots?: { lot?: number; animal: string; slug?: string }[];
  note?: L;
  video?: string;
  credit?: string;
};

// Source: @haciendasurucu captions. Upcoming = date >= today.
export const events: Event[] = [
  {
    name: '4.º Remate Evolución Genética Sindi', kind: 'auction', date: '2026-11-07T12:00:00-04:00',
    venue: 'Salón Guaraní · Fexpocruz', lots: [{ lot: 29, animal: 'Amira de Rincón del Urucú', slug: 'amira-de-rincon-del-urucu' }],
    video: 'amira-lote29', credit: '@somosfotorural',
  },
  {
    name: 'Expocruz 2026', kind: 'show', date: '2026-09-25T09:00:00-04:00', venue: 'Fexpocruz · Santa Cruz',
    note: { es: 'Reservada Gran Campeona Sindi: 2258 FIV Camparino.', en: 'Reserve Grand Champion Sindi: 2258 FIV Camparino.', pt: 'Reservada Grande Campeã Sindi: 2258 FIV Camparino.' },
    video: 'expocruz-sindi-reel',
  },
  {
    name: '1.er Remate Gala de Excelencia', kind: 'auction', date: '2026-09-11T20:00:00-04:00', venue: 'Fexpocruz',
    lots: [{ lot: 42, animal: 'Abby de Rincón del Urucú (50%)', slug: 'abby-de-rincon-del-urucu' }],
    video: 'abby-lote42',
  },
  {
    name: 'FexpoSIV 2026', kind: 'show', date: '2026-07-25T09:00:00-04:00', venue: 'Fexpocruz · Santa Cruz',
    note: { es: 'Gran Campeona y Reservado Gran Campeón de la raza Sindi.', en: 'Grand Champion Female and Reserve Grand Champion Male, Sindi breed.', pt: 'Grande Campeã e Reservado Grande Campeão da raça Sindi.' },
    video: 'gran-campeona-fexposiv-reel', credit: '@asocebu_bolivia',
  },
  {
    name: '1.er Remate Reproductores Premium · Nelore Futuro Weekend', kind: 'auction', date: '2026-07-19T10:00:00-04:00',
    venue: 'Salón Guaraní · Fexpocruz', lots: [{ animal: 'Galáctico FIV Urucú (JNM 6519)', slug: 'galactico-fiv-urucu' }],
    video: 'galactico-fiv',
  },
  {
    name: '6.º Remate Nueva Generación', kind: 'auction', date: '2026-07-12T10:00:00-04:00', venue: 'Santa Cruz de la Sierra',
    note: { es: 'Junto a Cabaña Moxos y Esterlina Ganadería.', en: 'Together with Cabaña Moxos and Esterlina Ganadería.', pt: 'Junto com Cabaña Moxos e Esterlina Ganadería.' },
    video: 'remate-nueva-generacion', credit: '@melhora_mais',
  },
];

export const upcoming = (now = new Date()) => events.filter((e) => new Date(e.date) >= now && e.kind === 'auction');
export const past = (now = new Date()) => events.filter((e) => new Date(e.date) < now);
