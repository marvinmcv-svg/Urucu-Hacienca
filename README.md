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
| Auctions & shows | `src/data/events.ts` |
| Breeds, AI results, awards, contact info | `src/data/site.ts` |
| Videos & gallery photos | `src/data/videos.ts` |
| WhatsApp number & prefilled messages | `src/lib/wa.ts` |
| Marvin's knowledge (built from the data files above) | `src/lib/marvin-prompt.ts` |
| Marvin API endpoint | `src/pages/api/marvin.ts` |

Edit a data file, and the pages **and Marvin's knowledge** update together on the next deploy.

## Adding media
1. Put the original file in `assets/instagram/` using the name format `NN-short-name-<postId>.jpg|mp4`.
2. Run `npm run media`. This needs ffmpeg. Photos go to `src/assets/photos/`; videos and posters go to `public/media/`.
3. Reference it by its short name in the data files (for example `photo: 'short-name'`).

## Deploy (Vercel)
1. Import the repo in Vercel. The framework preset is detected as Astro.
2. Under Settings → Environment Variables, add `ANTHROPIC_API_KEY`. Optionally add `MARVIN_MODEL`: the default is `claude-opus-5-5`, and `claude-haiku-5-5` is far cheaper for a chat widget.
3. Set a monthly spend limit in the Anthropic Console.
4. Turn on Vercel Web Analytics to see `wa_click` (by intent) and `marvin_open` events.
