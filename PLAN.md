# Haciendas Urucú: Website Plan

> Status: **Phases 1–7 built** on branch `claude/modest-dirac-1lrpq6` (see README). Remaining items are content from the client, listed in §8. Written with the Karpathy guidelines: state assumptions, keep it simple, define checks for "done".
> Media source: `assets/instagram/` (22 files: 9 photos, 13 videos). See `assets/instagram/README.md`.

---

## 1. What the business is (from Instagram)

**Haciendas Urucú: "Genética con propósito" · "El Cebú Productivo de Bolivia"**

- **What they do:** breed and sell zebu genetics in three breeds: **Nelore, Nelore Mocho, Sindi**. This covers selection, production and results.
- **Places:** **Hacienda Pesquería** (San Matías / Ascensión de la Frontera, Santa Cruz) and **Cabaña Rincón del Urucú** (the stud prefix seen in animal names).
- **Products and services:**
  - Breeding bulls and heifers (sold at auctions and privately)
  - Donor cows and FIV/IVF programs
  - Semen from Urucú bulls (for example Genio FIV Urucú, collected with ApexGen)
  - Field days and farm visits
- **Proof points:**
  - 2258 FIV Camparino: **Gran Campeona Sindi, FexpoSIV 2026**, and **Reservada Gran Campeona, Expocruz 2026** (described as Bi-Gran Campeona Nacional)
  - **61.75% pregnancy rate** from a single AI with young Urucú bulls (Figo 61.8%, Fango 57.9%, Furioso 63.7%)
  - Galáctico FIV Urucú: MGTe **Top 1%**
  - Pastures at Pesquería: 25 t/ha
- **Philosophy:** rusticity, functionality, adaptation, fertility, sexual precocity (for example heifers pregnant at 14 months). Animals are raised on open range.
- **Partners:** Fazenda Camparino and Estiva (Brazil), ApexGen, Asocebu, Sindi Bolivia.
- **Events:** remates (Gala de Excelencia, Evolución Genética Sindi, Nueva Generación, Nelore Futuro) at Salón Guaraní, Fexpocruz.
- **Content series:** "Urucú Te Explica" (short educational videos).
- **Audience:** about 5,550 followers. Ranchers in Bolivia, Brazil and Paraguay; buyers at auctions; partners.

**The website has one job:** turn a rancher's interest into a **WhatsApp conversation** with Urucú, and back that up with credibility (champions, data, pedigree, video).

---

## 2. Assumptions (please confirm or correct)

| # | Assumption | Why it matters |
|---|---|---|
| A1 | Languages: **Spanish (default), English, Portuguese (BR)** | PT because the genetics partners and buyers are Brazilian |
| A2 | "Ordering/booking" means: ask about an animal or semen, ask about an auction lot, **book a farm visit**, or a general contact. All of these go to **WhatsApp +591 77165787**. No online payment and no booking database. | Keeps the build small. The sale happens in conversation, the way this industry works |
| A3 | No prices are shown on the site | Prices are negotiated or set at auction |
| A4 | Marvin runs on the **Claude API** (Haiku 5.5: fast and cheap) through one serverless endpoint. **This needs an Anthropic API key.** | |
| A5 | Hosting on **Vercel**, with a domain such as `haciendasurucu.com` (to be confirmed) | Already connected to this workspace |
| A6 | The animal list (plantel) and events are edited as plain files in the repo for now. A CMS comes later only if staff need to edit without a developer. | Simplicity first |
| A7 | Photos credited to third parties (fotorural, Camparino, Asocebu, etc.) are used only with permission and a visible credit | Legal and relationship risk |

---

## 3. Sitemap (7 pages × 3 languages)

URL pattern: `/es/...` (default, also served at `/`), `/en/...`, `/pt/...`

| Page | Purpose | Key sections | Main CTA (WhatsApp intent) |
|---|---|---|---|
| **Inicio** `/` | Show who they are in 10 seconds | Muted hero video loop (bulls in golden dust, file 13). Tagline and two CTAs. Proof strip: Gran Campeona 2026 · 61.75% pregnancy · Top 1% MGTe. Three breed cards. Featured animals. Expocruz reel (09). Philosophy quote. Visit teaser. Next auction. | "Hablar con Urucú" (general) |
| **Nosotros** `/nosotros` | Story and trust | Origin and team (*content needed*). Hacienda Pesquería (gate video 18, riders photo 17). Philosophy: rusticity and adaptation (video 04). Partners. | General |
| **Genética** `/genetica` | What they sell | Nelore / Nelore Mocho / Sindi. Programs: FIV, AI, donors, semen. Results data (pregnancy rates, MGTe). | "Consultar genética / semen" |
| **Plantel** `/plantel` + `/plantel/[slug]` | Animal showcase | Filterable grid (breed, sex, role: donor, bull, heifer). Detail page: photo or video, pedigree (sire × dam (maternal grandsire)), age, awards, lot number if at auction. | "Consultar por {animal}" |
| **Logros** (section on Plantel and Inicio, not its own page) | Credibility | Awards timeline (FexpoSIV, Expocruz) | — |
| **Remates y Eventos** `/remates` | Auctions | Next auction card (date, time, place, lots, map). Past auctions. Reels 03, 23. | "Consultar por lote {n}" |
| **Urucú Te Explica** `/aprende` | Education and SEO | Video series grid. Each video gets a short transcript summary (good for search and for Marvin's knowledge). | General |
| **Visitas y Contacto** `/contacto` | Convert | Visit-request form that **builds a WhatsApp message** (name, ranch, date, number of people, interest). Map. Social links. | "Reservar visita" |

Every page ends with the same "Hablemos" band, and the shared dock (§5) is always visible.

---

## 4. Design system ("ranch-luxury", taken from the logo and the photos)

**Visual idea:** editorial and calm, like a premium stud catalogue. Large photography, generous cream space, serif headlines. No stock photos, no gradients, no "AI-generic" look.

| Token | Value | Source |
|---|---|---|
| `--cream` | `#F5EFE6` (background) | Logo background |
| `--ink` | `#2A1C13` (text, headings) | Logo lettering |
| `--copper` | `#A3522A` (primary, CTAs) | Sindi coat, the "N" in the logo |
| `--pasture` | `#56703D` (secondary accents) | Pasture in the photos |
| `--gold` | `#B98B3E` (awards only) | Rosettes and trophies |
| `--bone` | `#E9E2D6` (cards, dividers) | Nelore white |
| WhatsApp | `#25D366` used only on the WhatsApp button | Brand recognition |

- **Type:** display serif **Fraunces** (or Cormorant Garamond), close to the logo's classic serif. UI and body in **Inter**. Both self-hosted, 2 weights each.
- **Grid:** 12 columns, max width 1280px. Section rhythm 96/64/40px (desktop, tablet, mobile).
- **Motion:** only subtle fade and rise on scroll, and slow Ken Burns on stills. Respect `prefers-reduced-motion`.
- **Photos:** treated like a magazine: full-bleed, 4:5 portrait crops for animals, 16:9 for landscapes.
- **Accessibility:** WCAG AA contrast (copper on cream checked to 4.5:1 for text sizes; use ink for small text). Visible focus states. Captions on all videos (Spanish source, translated).
- **Mobile first:** most ranchers will arrive from Instagram or WhatsApp on a phone.

---

## 5. WhatsApp and Marvin

### 5.1 WhatsApp: one helper, five intents
```
waLink(intent, locale, vars) → https://wa.me/59177165787?text=<url-encoded localized message>
```
| Intent | Example ES text |
|---|---|
| `general` | "Hola Haciendas Urucú, vengo de su sitio web y me gustaría más información." |
| `animal` | "Hola, me interesa {animal} ({rgn}). ¿Podrían darme más información?" |
| `genetics` | "Hola, quisiera consultar por genética / semen de {breed}." |
| `lot` | "Hola, me interesa el Lote {n} del {remate}." |
| `visit` | "Hola, quisiera reservar una visita a Hacienda Pesquería. Nombre: … Fecha: … Personas: …" |

- **Floating dock (bottom right):** a green WhatsApp button. Tapping it opens a small menu of the 5 intents in the current language. Above it sits a smaller "Marvin" chat button, so the two never compete for the same corner.
- An inline CTA on every animal card, auction lot and page footer.
- Every click is tracked as a `wa_click` event with its intent (Vercel Analytics). This is how we measure whether the site works.

### 5.2 Marvin, the AI concierge
- **Persona:** "Marvin, asistente de Haciendas Urucú". Warm, knowledgeable about the ranch, short answers. Replies in the visitor's language (ES/EN/PT, auto-detected).
- **Knows:** only site content. The animals, events, breeds, philosophy and FAQ files are compiled into the system prompt at build time. The content is small enough that no vector database or RAG is needed.
- **Does:** answer questions about breeds, animals, auctions, visits and the genetics programs. When the visitor shows buying or visit intent, it shows a **"Continuar por WhatsApp"** button prefilled with a summary of the conversation.
- **Does not:** quote prices, give veterinary diagnoses, or invent pedigrees. If it doesn't know, it says so and offers WhatsApp.
- **Tech:** `POST /api/marvin` (Vercel function) calls the Anthropic SDK with `claude-haiku-5-5` and streams the reply. Safeguards: per-IP rate limit, a max-tokens cap, and the API key kept server-side only. Chat history stays in the browser session; nothing is stored on the server.
- **Cost guard:** a monthly spend limit set in the Anthropic console.

---

## 6. Tech stack (the simplest thing that is world-class)

| Concern | Choice | Why |
|---|---|---|
| Framework | **Astro 5** (static) + one serverless route | Ships zero JS by default, which makes it fast on rural mobile networks. Built-in i18n routing. |
| Styling | Tailwind CSS 4 with the tokens above | |
| Interactivity | Small "islands" only (Marvin chat, WhatsApp menu, plantel filter, video player) | |
| Content | Astro Content Collections: `animals/*.md`, `events/*.md`, `videos/*.md`, `i18n/{es,en,pt}.json` | Typed, easy to edit, also feeds Marvin |
| Images | `astro:assets`: AVIF/WebP, responsive `srcset`, lazy loading | 4K originals become roughly 150 KB per view |
| Video | ffmpeg: H.264 MP4 plus a poster image. Hero loop cut to 8–10 s, muted, under 2 MB. The rest load on click. | No YouTube embeds, so no third-party weight |
| SEO | `hreflang`, sitemap, Open Graph images per page, JSON-LD (`Organization`, `LocalBusiness`, `Event` for auctions, `VideoObject`) | Auction events can appear in Google |
| Hosting | Vercel (static + 1 function), Vercel Analytics | |

**Deliberately not included:** CMS, database, user accounts, payment, booking engine, RAG. Each one gets added only when a real need shows up.

**Repo layout**
```
src/
  pages/[lang]/{index,nosotros,genetica,plantel/[slug],remates,aprende,contacto}.astro
  pages/api/marvin.ts
  components/{Hero,ProofStrip,BreedCard,AnimalCard,EventCard,VideoCard,WhatsAppDock,MarvinChat,CTABand}.astro|tsx
  content/{animals,events,videos}/  i18n/{es,en,pt}.json
  lib/{wa.ts,marvin-prompt.ts}
public/media/  (optimised outputs)
assets/instagram/  (originals, already downloaded)
```

---

## 7. Build phases, each with a check

1. **Scaffold and design tokens.** Astro, Tailwind, fonts, layout, 3-language routing.
   → check: `/es`, `/en`, `/pt` all render; `hreflang` tags are present; Lighthouse baseline.
2. **Media pipeline.** Script that turns `assets/instagram` into `public/media` (images in several sizes, video MP4 plus poster, the hero loop cut).
   → check: hero loop under 2 MB; no image over 300 KB at its display size.
3. **Content.** Write the animal, event and video files from the Instagram captions (already captured), then translate ES→EN/PT.
   → check: every page has copy in all 3 languages with no missing keys (the build fails if a key is missing).
4. **Pages.** Home, Nosotros, Genética, Plantel and detail page, Remates, Aprende, Contacto.
   → check: Playwright screenshots at 390px and 1440px for each page and language.
5. **WhatsApp.** `wa.ts`, the dock, inline CTAs, the visit form.
   → check: a unit test confirms all 5 intents × 3 languages build a valid `wa.me/59177165787` URL; Playwright clicks each CTA and checks the link.
6. **Marvin.** API route, chat UI, prompt built from content, WhatsApp handoff.
   → check: a scripted set of about 15 questions (ES/EN/PT; one price question; one "unknown" question). Marvin must answer in the right language, never invent a price, and offer WhatsApp when it should.
7. **SEO, analytics, launch.** JSON-LD, sitemap, OG images, `wa_click` events, domain.
   → check: Lighthouse mobile ≥ 90 performance and ≥ 95 accessibility, best practices and SEO on Home and Plantel; Rich Results test passes for `Event`.

---

## 8. What I need from you

1. **Languages:** OK with ES / EN / PT?
2. **Vector logo** (SVG/AI/PDF). The Instagram avatar is only 150 px.
3. **Facts the site needs but Instagram doesn't have:** founding year and story, owner or team names and photos, hectares and herd size, exact location for the map, email, office hours, whether semen and embryos are sold directly.
4. **Plantel:** which animals to feature (start with the 8–10 shown on Instagram?), plus RGN numbers.
5. **Next auction:** date and lots (the last one shown was 7 Nov 2026).
6. **Permissions** for the third-party media (see `assets/instagram/README.md`).
7. **Anthropic API key** for Marvin, added in Vercel's environment variables (never pasted in chat).
8. **Domain** you own or want.
