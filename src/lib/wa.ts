import type { Locale } from '../i18n/ui';

export const WA_NUMBER = '59177165787'; // +591 77165787
export const intents = ['general', 'animal', 'genetics', 'lot', 'visit'] as const;
export type Intent = (typeof intents)[number];

type Vars = Record<string, string | number | undefined>;

const templates: Record<Locale, Record<Intent, string>> = {
  es: {
    general: 'Hola Haciendas Urucú, vengo de su sitio web y me gustaría más información.',
    animal: 'Hola Haciendas Urucú, me interesa {animal}. ¿Podrían darme más información?',
    genetics: 'Hola Haciendas Urucú, quisiera consultar por genética / semen{breed}.',
    lot: 'Hola Haciendas Urucú, me interesa {lot}. ¿Podrían enviarme más información?',
    visit: 'Hola Haciendas Urucú, quisiera reservar una visita a Hacienda Pesquería.',
  },
  en: {
    general: 'Hello Haciendas Urucú, I found you through your website and would like more information.',
    animal: 'Hello Haciendas Urucú, I am interested in {animal}. Could you send me more information?',
    genetics: 'Hello Haciendas Urucú, I would like to ask about genetics / semen{breed}.',
    lot: 'Hello Haciendas Urucú, I am interested in {lot}. Could you send me more information?',
    visit: 'Hello Haciendas Urucú, I would like to book a visit to Hacienda Pesquería.',
  },
  pt: {
    general: 'Olá Haciendas Urucú, conheci vocês pelo site e gostaria de mais informações.',
    animal: 'Olá Haciendas Urucú, tenho interesse em {animal}. Poderiam me passar mais informações?',
    genetics: 'Olá Haciendas Urucú, gostaria de consultar sobre genética / sêmen{breed}.',
    lot: 'Olá Haciendas Urucú, tenho interesse em {lot}. Poderiam me enviar mais informações?',
    visit: 'Olá Haciendas Urucú, gostaria de agendar uma visita à Hacienda Pesquería.',
  },
};

/** Localized prefilled message for an intent. Missing vars collapse to sensible defaults. */
export function waMessage(intent: Intent, lang: Locale, vars: Vars = {}, extra?: string): string {
  const v: Vars = { ...vars, breed: vars.breed ? ` ${vars.breed}` : '' };
  let text = templates[lang][intent].replace(/\{(\w+)\}/g, (_, k: string) => {
    const s = String(v[k] ?? '');
    return k === 'breed' ? s : s.trim() || '…'; // breed is optional and carries its own leading space
  });
  if (extra) text += `\n\n${extra}`;
  return text;
}

export function waLink(intent: Intent, lang: Locale, vars: Vars = {}, extra?: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage(intent, lang, vars, extra))}`;
}
