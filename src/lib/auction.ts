// Helpers for the auction catalogue pages.
import { animalBySlug, type Breed } from '../data/animals';
import { endOf, events, type Event, type Lot } from '../data/events';
import type { L } from '../i18n/ui';

export type LotView = {
  lot?: number;
  name: string;
  slug?: string; // animal page, when the lot is in the herd catalogue
  breed?: Breed;
  sex?: 'f' | 'm';
  born?: string;
  rgn?: string;
  pedigree?: string;
  photo?: string;
  video?: string;
  credit?: string;
  note?: L;
  award?: L;
};

/** A lot with the gaps filled from its animal's record (the lot's own fields win). */
export function lotView(l: Lot): LotView {
  const a = l.slug ? animalBySlug(l.slug) : undefined;
  return {
    lot: l.lot, name: l.animal, slug: a?.slug,
    breed: l.breed ?? a?.breed, sex: l.sex ?? a?.sex, born: l.born ?? a?.born, rgn: a?.rgn,
    pedigree: l.pedigree ?? a?.pedigree, photo: l.photo ?? a?.photo, video: l.video ?? a?.video,
    credit: l.credit ?? (l.photo || l.video ? undefined : a?.credit), note: l.note, award: a?.awards?.[0],
  };
}

/** Auctions where this animal was or will be offered, with its lot number. */
export const lotsOf = (slug: string) =>
  events.filter((e) => e.kind === 'auction').flatMap((e) => (e.lots ?? []).filter((l) => l.slug === slug).map((l) => ({ event: e, lot: l.lot })));

const utc = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

/** "Add to Google Calendar" link. */
export function googleCalendar(e: Event, details: string): string {
  const q = new URLSearchParams({ action: 'TEMPLATE', text: e.name, dates: `${utc(new Date(e.date))}/${utc(endOf(e))}`, location: e.venue, details });
  return `https://calendar.google.com/calendar/render?${q}`;
}

/** An .ics file (Apple Calendar, Outlook, most phones). */
export function ics(e: Event, url: string, details: string): string {
  const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Haciendas Urucu//Remates//ES', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${e.slug}@haciendasurucu`,
    `DTSTAMP:${utc(new Date())}`,
    `DTSTART:${utc(new Date(e.date))}`,
    `DTEND:${utc(endOf(e))}`,
    `SUMMARY:${esc(e.name)}`,
    `LOCATION:${esc(e.venue)}`,
    `DESCRIPTION:${esc(`${details}\n${url}`)}`,
    `URL:${url}`,
    'BEGIN:VALARM', 'TRIGGER:-P1D', 'ACTION:DISPLAY', `DESCRIPTION:${esc(e.name)}`, 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR', '',
  ].join('\r\n');
}
