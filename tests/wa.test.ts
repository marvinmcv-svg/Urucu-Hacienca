import { test } from 'node:test';
import assert from 'node:assert/strict';
import { waLink, waMessage, intents, WA_NUMBER } from '../src/lib/wa.ts';
import { locales, ui } from '../src/i18n/ui.ts';

test('every intent × locale builds a valid wa.me link to +591 77165787', () => {
  assert.equal(WA_NUMBER, '59177165787');
  for (const lang of locales) for (const intent of intents) {
    const url = new URL(waLink(intent, lang, { animal: 'Galáctico FIV Urucú', lot: 'Lote 29', breed: 'Sindi' }));
    assert.equal(url.origin + url.pathname, 'https://wa.me/59177165787');
    const text = url.searchParams.get('text')!;
    assert.ok(text.includes('Haciendas Urucú'), `${lang}/${intent}`);
    assert.ok(!/\{\w+\}/.test(text), `unfilled placeholder in ${lang}/${intent}`);
  }
});

test('vars are interpolated and missing vars do not leak placeholders', () => {
  assert.match(waMessage('animal', 'es', { animal: 'Amira' }), /me interesa Amira\./);
  assert.match(waMessage('genetics', 'en', { breed: 'Sindi' }), /semen Sindi\./);
  assert.match(waMessage('genetics', 'pt'), /sêmen\.$/);
  assert.match(waMessage('animal', 'es'), /me interesa …\./);
});

test('extra text (visit form) is appended after a blank line', () => {
  assert.equal(waMessage('visit', 'es', {}, 'Nombre: Ana').split('\n\n')[1], 'Nombre: Ana');
});

test('every UI key exists and is non-empty in all locales', () => {
  const keys = Object.keys(ui.es);
  for (const lang of locales) {
    assert.deepEqual(Object.keys(ui[lang]).sort(), [...keys].sort(), `key mismatch in ${lang}`);
    for (const k of keys) assert.ok((ui[lang] as Record<string, string>)[k].trim(), `${lang}.${k} empty`);
  }
});
