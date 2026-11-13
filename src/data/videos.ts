import type { L } from '../i18n/ui';

export type Video = { id: string; title: L; series?: 'explains'; credit?: string; landscape?: boolean };

export const videos: Video[] = [
  { id: 'rusticidad-explica', series: 'explains', title: { es: 'Rusticidad: genética que se adapta al campo', en: 'Hardiness: genetics that adapt to the land', pt: 'Rusticidade: genética que se adapta ao campo' } },
  { id: 'expocruz-sindi-reel', title: { es: 'Expocruz 2026 con la raza Sindi', en: 'Expocruz 2026 with the Sindi breed', pt: 'Expocruz 2026 com a raça Sindi' } },
  { id: 'toros-reproductores', title: { es: 'Nuestros toros reproductores', en: 'Our herd sires', pt: 'Nossos touros reprodutores' } },
  { id: 'genetica-resultados', title: { es: 'Genética que se mide en resultados', en: 'Genetics measured in results', pt: 'Genética que se mede em resultados' } },
  { id: 'pasturas-pesqueria', credit: '@gramaseed.srl', title: { es: 'Pasturas en Hacienda Pesquería: 25 t/ha', en: 'Pastures at Hacienda Pesquería: 25 t/ha', pt: 'Pastagens na Hacienda Pesquería: 25 t/ha' } },
  { id: 'camparino-terneros', credit: '@fazcamparino', title: { es: 'Destete 2025: progenie Camparino en Pesquería', en: '2025 weaning: Camparino progeny at Pesquería', pt: 'Desmama 2025: progênie Camparino na Pesquería' } },
  { id: 'gran-campeona-fexposiv-reel', credit: '@asocebu_bolivia', title: { es: 'Gran Campeona Sindi · FexpoSIV 2026', en: 'Grand Champion Sindi · FexpoSIV 2026', pt: 'Grande Campeã Sindi · FexpoSIV 2026' } },
  { id: 'remate-nueva-generacion', credit: '@melhora_mais', title: { es: '6.º Remate Nueva Generación', en: '6th New Generation Auction', pt: '6º Leilão Nova Geração' } },
];

export const galleryPhotos: { id: string; alt: L }[] = [
  { id: 'campo-futuro', alt: { es: 'Jinetes al atardecer en el campo', en: 'Riders at sunset on the ranch', pt: 'Cavaleiros ao pôr do sol no campo' } },
  { id: 'expocruz-presente', alt: { es: 'Dos hembras Sindi con cabezadas Urucú', en: 'Two Sindi females in Urucú halters', pt: 'Duas fêmeas Sindi com cabrestos Urucú' } },
  { id: 'gran-campeona-ternera', alt: { es: 'Gran Campeona con su ternera y escarapela', en: 'Grand Champion with her calf and rosette', pt: 'Grande Campeã com sua bezerra e roseta' } },
  { id: '2258-camparino-reservada', alt: { es: '2258 FIV Camparino en pista', en: '2258 FIV Camparino in the ring', pt: '2258 FIV Camparino na pista' } },
  { id: 'otima-fiv', alt: { es: 'Otima FIV OT con su cría', en: 'Otima FIV OT with her calf', pt: 'Otima FIV OT com sua cria' } },
  { id: 'perene-expocruz', alt: { es: 'Perene FIV en Expocruz 2026', en: 'Perene FIV at Expocruz 2026', pt: 'Perene FIV na Expocruz 2026' } },
  { id: 'visita-pesqueria', alt: { es: 'Jornada de campo en Hacienda Pesquería', en: 'Field day at Hacienda Pesquería', pt: 'Dia de campo na Hacienda Pesquería' } },
  { id: 'fexposiv-podio', alt: { es: 'Premiación FexpoSIV 2026', en: 'FexpoSIV 2026 award ceremony', pt: 'Premiação FexpoSIV 2026' } },
  { id: 'otima-donante', alt: { es: 'Otima FIV OT, donante Sindi', en: 'Otima FIV OT, Sindi donor', pt: 'Otima FIV OT, doadora Sindi' } },
  { id: 'sindi-repost', alt: { es: 'Fila de animales Sindi en el galpón', en: 'Row of Sindi cattle in the barn', pt: 'Fila de animais Sindi no galpão' } },
];
