import type { L } from '../i18n/ui';
import type { Intent } from '../lib/wa';

// The WhatsApp funnel: four short steps that build a ready-to-send message for the team.
// Every string is in all three languages (the L type enforces it).

export type Service = { id: string; intent: Intent; emoji: string; title: L; sub: L; visit?: boolean };

export const services: Service[] = [
  { id: 'bulls', intent: 'animal', emoji: '🐂', title: { es: 'Toros reproductores', en: 'Herd sires', pt: 'Touros reprodutores' }, sub: { es: 'Para cría a campo o programas de IA', en: 'For range breeding or AI programs', pt: 'Para cria a campo ou programas de IA' } },
  { id: 'females', intent: 'animal', emoji: '🐄', title: { es: 'Hembras y vaquillas', en: 'Females and heifers', pt: 'Fêmeas e novilhas' }, sub: { es: 'Matrices precoces y fértiles', en: 'Early, fertile breeding females', pt: 'Matrizes precoces e férteis' } },
  { id: 'semen', intent: 'genetics', emoji: '🧬', title: { es: 'Semen', en: 'Semen', pt: 'Sêmen' }, sub: { es: 'Toros Urucú en central de colecta', en: 'Urucú bulls at a collection centre', pt: 'Touros Urucú em central de coleta' } },
  { id: 'fiv', intent: 'genetics', emoji: '🔬', title: { es: 'Donantes y embriones FIV', en: 'Donors and IVF embryos', pt: 'Doadoras e embriões FIV' }, sub: { es: 'Genética de élite por fertilización in vitro', en: 'Elite genetics through in-vitro fertilisation', pt: 'Genética de elite por fertilização in vitro' } },
  { id: 'lots', intent: 'lot', emoji: '🔨', title: { es: 'Lotes de remate', en: 'Auction lots', pt: 'Lotes de leilão' }, sub: { es: 'Catálogo y aviso del próximo remate', en: 'Catalogue and next-auction alert', pt: 'Catálogo e aviso do próximo leilão' } },
  { id: 'visit', intent: 'visit', emoji: '🏡', visit: true, title: { es: 'Visita a Pesquería', en: 'Visit Pesquería', pt: 'Visita à Pesquería' }, sub: { es: 'Jornada de campo en San Matías', en: 'A field day in San Matías', pt: 'Dia de campo em San Matías' } },
  { id: 'advice', intent: 'genetics', emoji: '🎯', title: { es: 'Asesoría genética', en: 'Genetics advice', pt: 'Assessoria genética' }, sub: { es: 'Qué genética encaja con tu sistema', en: 'Which genetics fit your system', pt: 'Qual genética combina com seu sistema' } },
  { id: 'other', intent: 'general', emoji: '💬', title: { es: 'Otra consulta', en: 'Something else', pt: 'Outra consulta' }, sub: { es: 'Cuéntanos y te orientamos', en: 'Tell us and we will point you right', pt: 'Conte para nós e orientamos você' } },
];

const o = (es: string, en: string, pt: string): L => ({ es, en, pt });

/** Chip groups. `for` limits a group to some services (by id); `not` hides it for them. */
export const chips: { id: string; emoji: string; label: L; options: L[]; for?: string[]; not?: string[] }[] = [
  { id: 'breed', emoji: '🧬', label: o('Raza', 'Breed', 'Raça'), not: ['visit', 'other'],
    options: [o('Nelore', 'Nelore', 'Nelore'), o('Nelore Mocho', 'Polled Nelore', 'Nelore Mocho'), o('Sindi', 'Sindi', 'Sindi'), o('Abierto a sugerencias', 'Open to suggestions', 'Aberto a sugestões')] },
  { id: 'qty', emoji: '🔢', label: o('Cantidad', 'Quantity', 'Quantidade'), for: ['bulls', 'females', 'fiv', 'lots'],
    options: [o('1', '1', '1'), o('2 a 5', '2 to 5', '2 a 5'), o('6 a 20', '6 to 20', '6 a 20'), o('Más de 20', 'More than 20', 'Mais de 20')] },
  { id: 'doses', emoji: '🧪', label: o('Dosis', 'Doses', 'Doses'), for: ['semen'],
    options: [o('Hasta 50', 'Up to 50', 'Até 50'), o('50 a 200', '50 to 200', '50 a 200'), o('Más de 200', 'More than 200', 'Mais de 200'), o('No sé aún', 'Not sure yet', 'Ainda não sei')] },
  { id: 'goal', emoji: '🎯', label: o('Objetivo', 'Goal', 'Objetivo'), not: ['visit', 'lots'],
    options: [o('Mejorar mi plantel', 'Improve my herd', 'Melhorar meu plantel'), o('Iniciar un proyecto', 'Start a new project', 'Iniciar um projeto'), o('Reposición de toros', 'Replace bulls', 'Reposição de touros'), o('Pista y exposiciones', 'Show ring', 'Pista e exposições')] },
  { id: 'when', emoji: '📅', label: o('Para cuándo', 'When', 'Para quando'), not: ['visit'],
    options: [o('Lo antes posible', 'As soon as possible', 'O quanto antes'), o('En 1 a 3 meses', 'In 1 to 3 months', 'Em 1 a 3 meses'), o('Próximo remate', 'Next auction', 'Próximo leilão'), o('Solo explorando', 'Just exploring', 'Só explorando')] },
  { id: 'herd', emoji: '🐃', label: o('Tamaño de tu hato', 'Your herd size', 'Tamanho do seu rebanho'),
    options: [o('Menos de 100 cabezas', 'Under 100 head', 'Menos de 100 cabeças'), o('100 a 500', '100 to 500', '100 a 500'), o('500 a 2.000', '500 to 2,000', '500 a 2.000'), o('Más de 2.000', 'Over 2,000', 'Mais de 2.000'), o('Aún no tengo', 'None yet', 'Ainda não tenho')] },
];

export const ft = {
  eyebrow: o('Arma tu consulta', 'Build your request', 'Monte sua consulta'),
  title1: o('Cuéntanos qué', 'Tell us what', 'Conte o que'),
  title2: o('estás buscando.', 'you’re looking for.', 'você procura.'),
  lead: o('Cuatro pasos y tu mensaje queda listo para WhatsApp. Te responde el equipo de Urucú, no un robot.', 'Four steps and your message is ready for WhatsApp. The Urucú team answers, not a bot.', 'Quatro passos e sua mensagem fica pronta para o WhatsApp. Quem responde é a equipe Urucú, não um robô.'),
  step1: o('Qué buscas', 'What you need', 'O que procura'),
  step2: o('Detalles', 'Details', 'Detalhes'),
  step3: o('Sobre ti', 'About you', 'Sobre você'),
  step4: o('Enviar', 'Send', 'Enviar'),
  choose: o('Elige un servicio', 'Choose a service', 'Escolha um serviço'),
  date: o('Fecha preferida', 'Preferred date', 'Data preferida'),
  people: o('Personas', 'People', 'Pessoas'),
  note: o('Algo más (opcional)', 'Anything else (optional)', 'Algo mais (opcional)'),
  notePh: o('Ej.: busco toros jóvenes para 300 vacas en Beni', 'E.g. young bulls for 300 cows in Beni', 'Ex.: procuro touros jovens para 300 vacas no Beni'),
  name: o('Nombre', 'Name', 'Nome'),
  ranch: o('Hacienda o empresa', 'Ranch or company', 'Fazenda ou empresa'),
  place: o('Ubicación', 'Location', 'Localização'),
  placePh: o('Ej.: San Ignacio, Santa Cruz', 'E.g. San Ignacio, Santa Cruz', 'Ex.: Cáceres, Mato Grosso'),
  optional: o('opcional', 'optional', 'opcional'),
  back: o('Atrás', 'Back', 'Voltar'),
  next: o('Continuar', 'Continue', 'Continuar'),
  send: o('Abrir WhatsApp', 'Open WhatsApp', 'Abrir WhatsApp'),
  ready: o('Tu mensaje está listo', 'Your message is ready', 'Sua mensagem está pronta'),
  readyLead: o('Revisa la vista previa. Al tocar el botón se abre WhatsApp con el texto escrito: solo tienes que enviarlo.', 'Check the preview. The button opens WhatsApp with the text filled in: just tap send.', 'Confira a prévia. O botão abre o WhatsApp com o texto pronto: é só enviar.'),
  needName: o('Escribe tu nombre para continuar.', 'Add your name to continue.', 'Escreva seu nome para continuar.'),
  online: o('en línea', 'online', 'online'),
  greet: o('¡Hola! 👋 Somos Haciendas Urucú. Cuéntanos qué buscas y te respondemos personalmente.', 'Hi! 👋 This is Haciendas Urucú. Tell us what you need and we will answer personally.', 'Olá! 👋 Somos a Haciendas Urucú. Conte o que procura e respondemos pessoalmente.'),
  msgHi: o('Hola Haciendas Urucú 👋', 'Hello Haciendas Urucú 👋', 'Olá Haciendas Urucú 👋'),
  msgIntro: o('Vengo del sitio web y quiero consultar', 'I found you on your website and want to ask about', 'Vim pelo site e quero consultar sobre'),
  msgService: o('Busco', 'Looking for', 'Procuro'),
  msgNote: o('Nota', 'Note', 'Nota'),
  msgThanks: o('¡Gracias!', 'Thank you!', 'Obrigado!'),
  msgPh: o('Mensaje', 'Message', 'Mensagem'),
  footnote: o('WhatsApp se abre con este mensaje listo. Solo toca enviar.', 'WhatsApp opens with this message ready. Just tap send.', 'O WhatsApp abre com esta mensagem pronta. É só tocar em enviar.'),
};
