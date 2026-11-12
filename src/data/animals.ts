import type { L } from '../i18n/ui';

export type Breed = 'nelore' | 'nelore-mocho' | 'sindi';
export type Animal = {
  slug: string;
  name: string;
  rgn?: string;
  breed: Breed;
  sex: 'f' | 'm';
  role: 'donor' | 'bull' | 'heifer' | 'calf';
  born?: string; // ISO date (only when published exactly)
  pedigree: string; // Sire × Dam (Maternal grandsire)
  photo?: string; // key in src/assets/photos
  video?: string; // key in public/media/video
  credit?: string; // third-party author of the media
  awards?: L[];
  status?: L;
  text: L;
  featured?: boolean;
};

// Source: @haciendasurucu captions (2026). TODO(client): verify every field before launch.
export const animals: Animal[] = [
  {
    slug: '2258-fiv-camparino',
    name: '2258 FIV Camparino',
    breed: 'sindi', sex: 'f', role: 'donor', born: '2023-01-10',
    pedigree: 'Jundu da Estiva × 1667 Camparino (Heroi Bompasto)',
    photo: 'gran-campeona-ternera', video: 'gran-campeona-fexposiv-reel', credit: '@asocebu_bolivia',
    awards: [
      { es: 'Gran Campeona Sindi · FexpoSIV 2026', en: 'Grand Champion Sindi · FexpoSIV 2026', pt: 'Grande Campeã Sindi · FexpoSIV 2026' },
      { es: 'Reservada Gran Campeona · Expocruz 2026', en: 'Reserve Grand Champion · Expocruz 2026', pt: 'Reservada Grande Campeã · Expocruz 2026' },
      { es: 'Bi-Gran Campeona Nacional', en: 'Two-time National Grand Champion', pt: 'Bi-Grande Campeã Nacional' },
    ],
    text: {
      es: 'Matriz consolidada del plantel Urucú y madre de una nueva generación de campeonas. Aquí con su ternera al pie, Británica Urucú.',
      en: 'A proven dam of the Urucú herd and mother of a new generation of champions. Pictured with her calf at foot, Británica Urucú.',
      pt: 'Matriz consolidada do plantel Urucú e mãe de uma nova geração de campeãs. Aqui com sua bezerra ao pé, Británica Urucú.',
    },
    featured: true,
  },
  {
    slug: 'otima-fiv-ot',
    name: 'Otima FIV OT',
    breed: 'sindi', sex: 'f', role: 'donor',
    pedigree: 'Mogli FIV Estiva × Gloria FIV OT-2 (Xilon da Estiva)',
    photo: 'otima-fiv',
    text: {
      es: 'Con apenas 26 meses ya demuestra lo que buscamos en una hembra Sindi: precocidad, fertilidad, funcionalidad y habilidad materna. Se incorpora al plantel de donantes.',
      en: 'At just 26 months she already shows what we look for in a Sindi female: precocity, fertility, functionality and maternal ability. Now part of our donor herd.',
      pt: 'Com apenas 26 meses já demonstra o que buscamos numa fêmea Sindi: precocidade, fertilidade, funcionalidade e habilidade materna. Integra o plantel de doadoras.',
    },
    featured: true,
  },
  {
    slug: 'galactico-fiv-urucu',
    name: 'Galáctico FIV Urucú',
    rgn: 'JNM 6519',
    breed: 'nelore', sex: 'm', role: 'bull',
    pedigree: 'REM Passaporte × Cerimonia FIV Camparino',
    video: 'galactico-fiv',
    awards: [{ es: 'MGTe Top 1%, positivo en todas las características', en: 'MGTe Top 1%, positive for every trait', pt: 'MGTe Top 1%, positivo em todas as características' }],
    text: {
      es: 'Lo mejor de la genética Urucú en el Nelore Futuro. Reproductor con excelentes evaluaciones genéticas, hijo de la gran Cerimonia FIV Camparino.',
      en: 'The best of Urucú genetics in Nelore Futuro. A sire with outstanding genetic evaluations, out of the great Cerimonia FIV Camparino.',
      pt: 'O melhor da genética Urucú no Nelore Futuro. Reprodutor com excelentes avaliações genéticas, filho da grande Cerimonia FIV Camparino.',
    },
    featured: true,
  },
  {
    slug: 'genio-fiv-urucu',
    name: 'Genio FIV Urucú',
    rgn: 'JNM 6520',
    breed: 'nelore', sex: 'm', role: 'bull',
    pedigree: 'Diplomata da Agronova × Garota FIV Urucú',
    video: 'genio-semen', credit: '@apexgen.bolivia',
    status: { es: 'Contratado para colecta de semen · CE 40 cm', en: 'Contracted for semen collection · SC 40 cm', pt: 'Contratado para coleta de sêmen · CE 40 cm' },
    text: {
      es: 'Toro joven Urucú contratado por ApexGen para colecta de semen: genética Urucú disponible para inseminación.',
      en: 'A young Urucú bull contracted by ApexGen for semen collection: Urucú genetics available for AI.',
      pt: 'Touro jovem Urucú contratado pela ApexGen para coleta de sêmen: genética Urucú disponível para IA.',
    },
    featured: true,
  },
  {
    slug: 'perene-fiv',
    name: 'Perene FIV',
    breed: 'sindi', sex: 'f', role: 'heifer',
    pedigree: 'Jundu da Estiva × Tanga FIV Camp (Querente da Estiva)',
    photo: 'perene-expocruz',
    text: {
      es: 'Luciéndose en las pistas de juzgamiento de Expocruz 2026 con 23 meses de edad.',
      en: 'Shining in the Expocruz 2026 judging ring at 23 months of age.',
      pt: 'Brilhando nas pistas de julgamento da Expocruz 2026 aos 23 meses de idade.',
    },
  },
  {
    slug: 'amira-de-rincon-del-urucu',
    name: 'Amira de Rincón del Urucú',
    breed: 'sindi', sex: 'f', role: 'donor',
    pedigree: 'Plantel Rincón del Urucú', // TODO(client): full pedigree
    video: 'amira-lote29', credit: '@somosfotorural',
    status: { es: 'Lote 29 · 4.º Remate Evolución Genética Sindi', en: 'Lot 29 · 4th Sindi Genetic Evolution Auction', pt: 'Lote 29 · 4º Leilão Evolução Genética Sindi' },
    text: {
      es: 'Joven donante de nuestra nueva generación Sindi: precocidad reproductiva y una genealogía con valiosas posibilidades para nuevos proyectos genéticos.',
      en: 'A young donor from our new Sindi generation: reproductive precocity and a pedigree with valuable potential for new genetic programs.',
      pt: 'Jovem doadora da nossa nova geração Sindi: precocidade reprodutiva e uma genealogia com valiosas possibilidades para novos projetos genéticos.',
    },
  },
  {
    slug: 'abby-de-rincon-del-urucu',
    name: 'Abby de Rincón del Urucú',
    rgn: 'JNMS 08',
    breed: 'sindi', sex: 'f', role: 'heifer', born: '2025-03-12',
    pedigree: 'Elaborado FIV OT × 2258 FIV Camparino (Jundu da Estiva)',
    video: 'abby-lote42',
    status: { es: 'Preñada a los 14 meses', en: 'Bred at 14 months', pt: 'Prenhe aos 14 meses' },
    text: {
      es: 'Hija de 2258 Camparino, dos veces Gran Campeona. Preñada a los 14 meses: precocidad sexual, una de las características de mayor impacto económico.',
      en: 'Daughter of two-time Grand Champion 2258 Camparino. Bred at 14 months: sexual precocity, one of the traits with the highest economic impact.',
      pt: 'Filha da 2258 Camparino, duas vezes Grande Campeã. Prenhe aos 14 meses: precocidade sexual, uma das características de maior impacto econômico.',
    },
  },
  {
    slug: 'britanica-urucu',
    name: 'Británica Urucú',
    rgn: 'JNMS 37',
    breed: 'sindi', sex: 'f', role: 'calf', born: '2026-03-13',
    pedigree: 'Elaborado OT × 2258 FIV Camparino (Jundu da Estiva)',
    photo: 'gran-campeona-ternera',
    text: {
      es: 'La nueva generación: ternera al pie de la Gran Campeona 2258 FIV Camparino.',
      en: 'The next generation: calf at foot of Grand Champion 2258 FIV Camparino.',
      pt: 'A nova geração: bezerra ao pé da Grande Campeã 2258 FIV Camparino.',
    },
  },
];

export const animalBySlug = (slug: string) => animals.find((a) => a.slug === slug);
