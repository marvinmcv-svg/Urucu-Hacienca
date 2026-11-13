import type { L } from '../i18n/ui';

// The Instagram story highlights of @haciendasurucu, rebuilt as on-site stories.
// Covers are the real highlight covers; slides use our own media (see assets/instagram/README.md).
// TODO(client): swap in the original highlight clips when available.
export type Slide = { video?: string; photo?: string; text: L; credit?: string };
export type Highlight = { id: string; title: string; text: L; slides: Slide[] };

export const highlights: Highlight[] = [
  {
    id: 'vaquillas-21',
    title: 'Vaquillas ’21',
    text: { es: 'Hembras jóvenes criadas a campo, la base del plantel.', en: 'Young females raised on open range: the base of the herd.', pt: 'Fêmeas jovens criadas a campo: a base do plantel.' },
    slides: [
      { photo: 'otima-fiv', text: { es: 'Otima FIV OT: con 26 meses, ya con su cría al pie.', en: 'Otima FIV OT: 26 months old, already with her calf at foot.', pt: 'Otima FIV OT: com 26 meses, já com sua cria ao pé.' } },
      { video: 'camparino-terneros', credit: '@fazcamparino', text: { es: 'Destete 2025: progenie Camparino en Hacienda Pesquería.', en: '2025 weaning: Camparino progeny at Hacienda Pesquería.', pt: 'Desmama 2025: progênie Camparino na Hacienda Pesquería.' } },
    ],
  },
  {
    id: 'dinastia',
    title: 'Dinastía',
    text: { es: 'Líneas maternas y paternas que se repiten en campeones.', en: 'Dam and sire lines that keep producing champions.', pt: 'Linhas maternas e paternas que se repetem em campeões.' },
    slides: [
      { video: 'galactico-fiv', text: { es: 'Galáctico FIV Urucú · Nelore · MGTe Top 1%.', en: 'Galáctico FIV Urucú · Nelore · MGTe Top 1%.', pt: 'Galáctico FIV Urucú · Nelore · MGTe Top 1%.' } },
      { photo: 'gran-campeona-ternera', text: { es: '2258 FIV Camparino con su ternera, Británica Urucú.', en: '2258 FIV Camparino with her calf, Británica Urucú.', pt: '2258 FIV Camparino com sua bezerra, Británica Urucú.' } },
    ],
  },
  {
    id: 'candelaria',
    title: 'Candelaria',
    text: { es: 'Lotes en remate: genética Urucú en la pista de venta.', en: 'Auction lots: Urucú genetics in the sale ring.', pt: 'Lotes em leilão: genética Urucú na pista de venda.' },
    slides: [
      { video: 'remate-nueva-generacion', credit: '@melhora_mais', text: { es: '6.º Remate Nueva Generación, Fexpocruz.', en: '6th New Generation Auction, Fexpocruz.', pt: '6º Leilão Nova Geração, Fexpocruz.' } },
      { video: 'amira-lote29', credit: '@somosfotorural', text: { es: 'Amira, donante · Lote 29.', en: 'Amira, donor · Lot 29.', pt: 'Amira, doadora · Lote 29.' } },
    ],
  },
  {
    id: 'toros-urucu',
    title: 'Toros Urucú',
    text: { es: 'Reproductores seleccionados por estructura, rusticidad y fertilidad.', en: 'Herd sires selected for structure, hardiness and fertility.', pt: 'Reprodutores selecionados por estrutura, rusticidade e fertilidade.' },
    slides: [
      { video: 'toros-reproductores', text: { es: 'Nuestros toros reproductores, a campo.', en: 'Our herd sires, out on the range.', pt: 'Nossos touros reprodutores, a campo.' } },
      { video: 'genio-semen', credit: '@apexgen.bolivia', text: { es: 'Genio FIV Urucú en central de colecta de semen.', en: 'Genio FIV Urucú at the semen collection centre.', pt: 'Genio FIV Urucú na central de coleta de sêmen.' } },
    ],
  },
  {
    id: 'precosinhas',
    title: 'Precosinhas',
    text: { es: 'Precocidad: vaquillas preñadas a los 14 meses.', en: 'Precocity: heifers in calf at 14 months.', pt: 'Precocidade: novilhas prenhes aos 14 meses.' },
    slides: [
      { video: 'abby-lote42', text: { es: 'Abby, preñada a los 14 meses · Lote 42.', en: 'Abby, in calf at 14 months · Lot 42.', pt: 'Abby, prenhe aos 14 meses · Lote 42.' } },
      { photo: 'perene-expocruz', text: { es: 'Perene FIV en la pista de Expocruz 2026.', en: 'Perene FIV in the Expocruz 2026 ring.', pt: 'Perene FIV na pista da Expocruz 2026.' } },
    ],
  },
  {
    id: 'pesqueria',
    title: 'Pesquería',
    text: { es: 'Hacienda Pesquería, San Matías: donde se cría y se mide todo.', en: 'Hacienda Pesquería, San Matías: where everything is raised and measured.', pt: 'Hacienda Pesquería, San Matías: onde tudo é criado e medido.' },
    slides: [
      { video: 'pasturas-pesqueria', credit: '@gramaseed.srl', text: { es: 'Pasturas de 25 t/ha en Hacienda Pesquería.', en: '25 t/ha pastures at Hacienda Pesquería.', pt: 'Pastagens de 25 t/ha na Hacienda Pesquería.' } },
      { photo: 'visita-pesqueria', text: { es: 'Jornada de campo con familias ganaderas.', en: 'Field day with ranching families.', pt: 'Dia de campo com famílias pecuaristas.' } },
      { photo: 'campo-futuro', text: { es: 'Donde otros ven campo, nosotros vemos futuro.', en: 'Where others see land, we see the future.', pt: 'Onde outros veem campo, nós vemos futuro.' } },
    ],
  },
  {
    id: 'imp-x-kendry',
    title: 'Imp x Kendry',
    text: { es: 'Apareamientos dirigidos: cada cruza tiene un propósito.', en: 'Planned matings: every cross has a purpose.', pt: 'Acasalamentos dirigidos: cada cruzamento tem um propósito.' },
    slides: [
      { video: 'genetica-resultados', text: { es: 'Genética que se mide en resultados.', en: 'Genetics measured in results.', pt: 'Genética que se mede em resultados.' } },
      { video: 'expocruz-sindi-reel', text: { es: 'Expocruz 2026 con la raza Sindi.', en: 'Expocruz 2026 with the Sindi breed.', pt: 'Expocruz 2026 com a raça Sindi.' } },
    ],
  },
];
