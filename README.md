# Haciendas Urucú: website

Multilingual (ES / EN / PT) site for Haciendas Urucú, with a WhatsApp concierge and **Marvin**, an AI assistant.
Built with Astro (static pages and one serverless function) and Tailwind CSS 4. Deployed on Vercel.

See `PLAN.md` for the design and the reasoning behind it.

## Run locally
```bash
npm install
npm run dev            # http://localhost:4321/es/
npm test               # WhatsApp links + translation completeness
npx astro check        # type check
npm run build          # production build (Vercel output)
```
Marvin needs `ANTHROPIC_API_KEY` in your environment. See `.env.example`. Without it, the chat shows a polite error and offers WhatsApp instead.

## Where things live
| What | File |
|---|---|
| UI text in all 3 languages | `src/i18n/ui.ts` |
| Animals (plantel) | `src/data/animals.ts` |
| Auctions & shows (catalogue pages, lots) | `src/data/events.ts` |
| Breeds, AI results, awards, contact info | `src/data/site.ts` |
| Videos & gallery photos | `src/data/videos.ts` |
| WhatsApp number & prefilled messages | `src/lib/wa.ts` |
| Marvin's knowledge (built from the data files above) | `src/lib/marvin-prompt.ts` |
| Marvin API endpoint | `src/pages/api/marvin.ts` |

Edit a data file, and the pages **and Marvin's knowledge** update together on the next deploy.

## Adding an auction (remate)
Each auction gets its own catalogue page at `/es/remates/<slug>/` (also `/en/` and `/pt/`), with a countdown, "add to calendar" links, a WhatsApp button per lot and a share button.
1. In `src/data/events.ts`, add an entry at the top of `events`:
   ```ts
   {
     slug: 'evolucion-genetica-sindi-2027',          // the page address
     name: '5.º Remate Evolución Genética Sindi',
     kind: 'auction',
     date: '2027-03-06T11:00:00-04:00',               // Bolivia time
     hours: 5,                                        // optional, default 4
     venue: 'Salón Guaraní · Fexpocruz',
     stream: 'https://…',                             // optional live-stream link
     catalogue: 'https://…/catalogo.pdf',             // optional PDF
     lots: [
       { lot: 3, animal: 'Galáctico FIV Urucú', slug: 'galactico-fiv-urucu' },  // an animal from animals.ts: photo, pedigree… filled in
       { lot: 8, animal: 'Ternera 512', breed: 'sindi', sex: 'f', born: '2025-09-01', pedigree: 'Sire × Dam (MGS)', photo: 'ternera-512' },
     ],
   },
   ```
2. Deploy. The home page, the Remates list and Marvin pick it up. "Next auction" switches over by itself once the date has passed.

## Adding media
1. Put the original file in `assets/instagram/` using the name format `NN-short-name-<postId>.jpg|mp4`.
2. Run `npm run media`. This needs ffmpeg. Photos go to `src/assets/photos/`; videos and posters go to `public/media/`.
3. Reference it by its short name in the data files (for example `photo: 'short-name'`).

## Deploy (Vercel)
1. Import the repo in Vercel. The framework preset is detected as Astro.
2. Under Settings → Environment Variables, add `ANTHROPIC_API_KEY`. Optionally add `MARVIN_MODEL`: the default is `claude-opus-5-5`, and `claude-haiku-5-5` is far cheaper for a chat widget.
3. Set a monthly spend limit in the Anthropic Console.
4. Turn on Vercel Web Analytics to see `wa_click` (by intent) and `marvin_open` events.
