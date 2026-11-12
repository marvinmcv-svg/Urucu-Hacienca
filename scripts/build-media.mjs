// Turns assets/instagram originals into web-ready media.
//   photos -> src/assets/photos/<id>.jpg (max 2400px; astro:assets makes AVIF/WebP srcsets)
//   videos -> public/media/video/<id>.mp4 (H.264, faststart) + public/media/poster/<id>.jpg
//   hero   -> public/media/video/hero.mp4 (10s muted loop)
// Idempotent: skips outputs that already exist. Requires ffmpeg.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import sharp from 'sharp';

const SRC = 'assets/instagram';
const PHOTO_OUT = 'src/assets/photos';
const VIDEO_OUT = 'public/media/video';
const POSTER_OUT = 'public/media/poster';
[PHOTO_OUT, VIDEO_OUT, POSTER_OUT].forEach((d) => mkdirSync(d, { recursive: true }));

// "05-visita-pesqueria-DeNENfAHYDz.jpg" -> "visita-pesqueria"
const id = (f) => f.replace(/^\d+-/, '').replace(/-[A-Za-z0-9_-]{11}\.\w+$/, '');
const ff = (args) => execFileSync('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: 'inherit' });

for (const f of readdirSync(SRC)) {
  if (!/^\d+-/.test(f)) continue; // skip logo / README
  const name = id(f);
  if (/\.(jpe?g|webp)$/.test(f)) {
    const out = `${PHOTO_OUT}/${name}.jpg`;
    if (existsSync(out)) continue;
    await sharp(`${SRC}/${f}`).rotate().resize(2400, 2400, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true }).toFile(out);
    console.log('photo', out);
  } else if (f.endsWith('.mp4')) {
    const out = `${VIDEO_OUT}/${name}.mp4`;
    if (!existsSync(out)) {
      ff(['-i', `${SRC}/${f}`, '-vf', "scale='min(720,iw)':-2", '-c:v', 'libx264', '-preset', 'slow', '-crf', '29', '-maxrate', '1200k', '-bufsize', '2400k',
        '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', out]);
      console.log('video', out);
    }
    const poster = `${POSTER_OUT}/${name}.jpg`;
    if (!existsSync(poster)) {
      ff(['-ss', '2', '-i', `${SRC}/${f}`, '-frames:v', '1', '-vf', "scale='min(720,iw)':-2", '-q:v', '4', poster]);
    }
  }
}

// Hero loop: golden-dust bulls + rider silhouette.
const hero = `${VIDEO_OUT}/hero.mp4`;
if (!existsSync(hero)) {
  ff(['-ss', '24', '-t', '10', '-i', `${SRC}/13-toros-reproductores-Dc0uQnkTOUU.mp4`, '-an', '-vf', 'scale=720:-2',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '28', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', hero]);
  ff(['-ss', '24', '-i', `${SRC}/13-toros-reproductores-Dc0uQnkTOUU.mp4`, '-frames:v', '1', '-vf', 'scale=720:-2', '-q:v', '4', `${POSTER_OUT}/hero.jpg`]);
  console.log('hero', hero);
}

// Still frame used as the Nelore breed photo.
const neloreStill = `${PHOTO_OUT}/nelore-toro.jpg`;
if (!existsSync(neloreStill)) ff(['-ss', '2', '-i', `${SRC}/16-genetica-resultados-Db8sy1TT1Xx.mp4`, '-frames:v', '1', '-q:v', '2', neloreStill]);
