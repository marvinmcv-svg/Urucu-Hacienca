import { test } from 'node:test';
import assert from 'node:assert/strict';
import { upcoming, past, later, GRACE_MS } from '../src/data/events.ts';

const at = (iso: string) => new Date(iso);

test('upcoming lists auctions soonest first, never shows', () => {
  const names = upcoming(at('2026-07-01T00:00:00-04:00')).map((e) => e.name);
  assert.equal(names[0], '6.º Remate Nueva Generación');
  assert.ok(!names.includes('Expocruz 2026'), 'shows are not auctions');
  const times = upcoming(at('2026-07-01T00:00:00-04:00')).map((e) => +new Date(e.date));
  assert.deepEqual(times, [...times].sort((a, b) => a - b));
});

test('an auction stays "next" for 12 hours after it starts, then moves to past', () => {
  const start = new Date('2026-11-07T12:00:00-04:00').getTime();
  const name = '4.º Remate Evolución Genética Sindi';
  assert.equal(upcoming(new Date(start + GRACE_MS - 60_000))[0]?.name, name);
  assert.ok(!upcoming(new Date(start + GRACE_MS + 60_000)).some((e) => e.name === name));
  assert.equal(past(new Date(start + GRACE_MS + 60_000))[0]?.name, name);
});

test('past is most recent first, and later + past cover every event exactly once', () => {
  const now = at('2026-08-01T00:00:00-04:00');
  const p = past(now).map((e) => +new Date(e.date));
  assert.deepEqual(p, [...p].sort((a, b) => b - a));
  const all = [...later(now), ...past(now)].map((e) => e.name);
  assert.equal(new Set(all).size, all.length);
});
