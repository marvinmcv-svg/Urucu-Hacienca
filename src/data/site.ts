import type { L } from '../i18n/ui';

export const site = {
  name: 'Haciendas Urucú',
  phoneDisplay: '+591 771 65787',
  instagram: 'https://www.instagram.com/haciendasurucu/',
  facebook: 'https://www.facebook.com/haciendasurucu',
  location: {
    ranch: 'Hacienda Pesquería',
    area: 'San Matías · Santa Cruz · Bolivia',
    maps: 'https://www.google.com/maps/search/?api=1&query=San+Mat%C3%ADas%2C+Santa+Cruz%2C+Bolivia', // TODO: exact pin
  },
  auctionVenue: 'Salón Guaraní · Fexpocruz · Santa Cruz de la Sierra',
};

export const breeds: { id: 'nelore' | 'nelore-mocho' | 'sindi'; name: L; text: L; photo: string }[] = [
  {
    id: 'nelore',
    name: { es: 'Nelore', en: 'Nelore', pt: 'Nelore' },
    text: {
      es: 'La base del cebú productivo: rusticidad, eficiencia a pasto y carcasa. Toros evaluados con índices MGTe.',
      en: 'The backbone of productive zebu: hardiness, grass-fed efficiency and carcass. Bulls ranked on MGTe indexes.',
      pt: 'A base do zebu produtivo: rusticidade, eficiência a pasto e carcaça. Touros avaliados por índices MGTe.',
    },
    photo: 'nelore-toro',
  },
  {
    id: 'nelore-mocho',
    name: { es: 'Nelore Mocho', en: 'Polled Nelore', pt: 'Nelore Mocho' },
    text: {
      es: 'Toda la funcionalidad del Nelore, sin cuernos: más practicidad en el manejo y en el transporte.',
      en: 'All the functionality of Nelore without horns: easier handling and transport.',
      pt: 'Toda a funcionalidade do Nelore, sem chifres: mais praticidade no manejo e no transporte.',
    },
    photo: 'campo-futuro', // TODO(client): replace with a Nelore Mocho photo
  },
  {
    id: 'sindi',
    name: { es: 'Sindi', en: 'Sindi', pt: 'Sindi' },
    text: {
      es: 'Precocidad, fertilidad y habilidad materna. Grandes campeonas nacionales salen de nuestro plantel Sindi.',
      en: 'Precocity, fertility and maternal ability. National grand champions come from our Sindi herd.',
      pt: 'Precocidade, fertilidade e habilidade materna. Grandes campeãs nacionais saem do nosso plantel Sindi.',
    },
    photo: 'expocruz-presente',
  },
];

/** AI results with a single insemination (Hacienda Pesquería). */
export const aiResults = [
  { name: 'Figo FIV Urucú', rgn: 'JNM 6339', pedigree: 'Damasco Matinha × JHVM 16413 Camparino (REM Dheef)', rate: 61.8 },
  { name: 'Fango FIV Urucú', rgn: 'JNM 6493', pedigree: 'Comodoro de CV × Garrucha FIV Camparino (Bronze Camparino)', rate: 57.9 },
  { name: 'Furioso FIV Urucú', rgn: 'JNM 6496', pedigree: 'REM Hermoso × Enquete FIV Camparino (Calibre FIV Camparino)', rate: 63.7 },
];
export const aiTotal = 61.75;

export const awards2026: { event: string; items: L[] }[] = [
  {
    event: 'FexpoSIV 2026 · Sindi',
    items: [
      { es: 'Gran Campeona: 2258 FIV Camparino', en: 'Grand Champion Female: 2258 FIV Camparino', pt: 'Grande Campeã: 2258 FIV Camparino' },
      { es: 'Reservado Gran Campeón: Veleiro FIV Camparino', en: 'Reserve Grand Champion Male: Veleiro FIV Camparino', pt: 'Reservado Grande Campeão: Veleiro FIV Camparino' },
      { es: 'Campeona Vaca Adulta', en: 'Champion Adult Cow', pt: 'Campeã Vaca Adulta' },
      { es: 'Campeón Torete Mayor', en: 'Champion Senior Yearling Bull', pt: 'Campeão Tourinho Maior' },
      { es: 'Reservado Campeón Progenie Padre Adulto', en: 'Reserve Champion Progeny of Sire', pt: 'Reservado Campeão Progênie de Pai' },
      { es: 'Reservada Campeona Vaquilla Menor', en: 'Reserve Champion Junior Heifer', pt: 'Reservada Campeã Novilha Menor' },
      { es: 'Reservado Campeón Toro Joven', en: 'Reserve Champion Young Bull', pt: 'Reservado Campeão Touro Jovem' },
    ],
  },
  {
    event: 'Expocruz 2026 · Sindi',
    items: [
      { es: 'Reservada Gran Campeona: 2258 FIV Camparino', en: 'Reserve Grand Champion Female: 2258 FIV Camparino', pt: 'Reservada Grande Campeã: 2258 FIV Camparino' },
    ],
  },
];

export const partners = ['Fazenda Camparino', 'Estiva', 'ApexGen Bolivia', 'Asocebu Bolivia', 'Sindi Bolivia'];
