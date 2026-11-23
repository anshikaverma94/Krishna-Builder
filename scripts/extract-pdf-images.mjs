// One-off: pull the photos out of the Business Profile PDF.
//
//   node scripts/extract-pdf-images.mjs source/profile-large.pdf
//
// Writes:
//   public/images/projects/<slug>/NN.jpg   + src/content/project-images.json
//   public/images/brand/logo-profile.png   (the KB logo, p.43)
// Page → slug mapping is read from `slug` / `profilePage` in src/content/projects.ts.
// Images are the resolution embedded in the PDF; replace with the client's originals when available.

import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { extractImages, getDocumentProxy } from "unpdf";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pdfPath = process.argv[2];
if (!pdfPath) {
  console.error("Usage: node scripts/extract-pdf-images.mjs <path-to-business-profile.pdf>");
  process.exit(1);
}

const MIN_WIDTH = 320; // skip icons, bullets and slide ornaments
const MIN_HEIGHT = 200;
const DUP_THRESHOLD = 14; // mean abs diff (0–255) on a 24×24 greyscale thumbnail

const pdf = await getDocumentProxy(new Uint8Array(await readFile(pdfPath)));

const channelsOf = (img) => Math.round(img.data.length / (img.width * img.height));
const toSharp = (img) =>
  sharp(Buffer.from(img.data), {
    raw: { width: img.width, height: img.height, channels: channelsOf(img) },
  }).flatten({ background: "#ffffff" });

async function thumb(img) {
  return toSharp(img).resize(24, 24, { fit: "fill" }).greyscale().raw().toBuffer();
}

const diff = (a, b) => {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += Math.abs(a[i] - b[i]);
  return s / a.length;
};

/** Usable photos on a page: large, colour, largest first, near-duplicates removed. */
async function photosOnPage(page) {
  const all = (await extractImages(pdf, page))
    .filter((i) => i.width >= MIN_WIDTH && i.height >= MIN_HEIGHT && channelsOf(i) >= 3)
    .sort((a, b) => b.width * b.height - a.width * a.height);
  const kept = [];
  for (const img of all) {
    // Skip flat/blank images (soft masks, placeholders).
    const { channels: stats } = await toSharp(img)
      .extract({
        left: Math.floor(img.width * 0.2),
        top: Math.floor(img.height * 0.2),
        width: Math.floor(img.width * 0.6),
        height: Math.floor(img.height * 0.6),
      })
      .stats();
    if (stats.every((c) => c.stdev < 8)) continue; // flat
    // Pure greyscale (R=G=B) = a soft mask / stipple placeholder, not a colour photo.
    if (Math.abs(stats[0].mean - stats[1].mean) < 1 && Math.abs(stats[1].mean - stats[2].mean) < 1) continue;
    const t = await thumb(img);
    if (kept.some((k) => diff(k.t, t) < DUP_THRESHOLD)) continue;
    kept.push({ img, t });
  }
  return kept.map((k) => k.img);
}

// Images the PDF stores sideways: "<slug>/<NN>" -> clockwise degrees to rotate.
function hasWhiteCorners(img) {
  const ch = channelsOf(img);
  const at = (x, y) => {
    const i = (y * img.width + x) * ch;
    return Math.min(img.data[i], img.data[i + 1], img.data[i + 2]);
  };
  const m = 3;
  const pts = [[m, m], [img.width - 1 - m, m], [m, img.height - 1 - m], [img.width - 1 - m, img.height - 1 - m]];
  return pts.every(([x, y]) => at(x, y) > 225);
}

const ROTATE = { "iiit-nagpur-campus/01": 270 };

async function writeJpegs(images, dir, urlBase) {
  await rm(dir, { recursive: true, force: true });
  await mkdir(dir, { recursive: true });
  const urls = [];
  for (const [n, img] of images.entries()) {
    const file = `${String(n + 1).padStart(2, "0")}.jpg`;
    const rot = ROTATE[`${path.basename(dir)}/${file.replace(".jpg", "")}`] ?? 0;
    let pipeline = toSharp(img).rotate(rot);
    if (hasWhiteCorners(img)) {
      const dx = Math.round(img.width * 0.06);
      const dy = Math.round(img.height * 0.06);
      pipeline = toSharp(img)
        .extract({ left: dx, top: dy, width: img.width - 2 * dx, height: img.height - 2 * dy })
        .rotate(rot);
    }
    await pipeline.jpeg({ quality: 90, mozjpeg: true }).toFile(path.join(dir, file));
    urls.push(`${urlBase}/${file}`);
  }
  return urls;
}

// ---- Projects --------------------------------------------------------------
const src = await readFile(path.join(root, "src/content/projects.ts"), "utf8");
const pageToSlug = new Map();
for (const block of src.split(/\n  \{\n/).slice(1)) {
  const slug = block.match(/slug:\s*"([^"]+)"/)?.[1];
  const page = block.match(/profilePage:\s*(\d+)/)?.[1];
  if (slug && page) pageToSlug.set(Number(page), slug);
}

const projectImages = {};
for (const [page, slug] of [...pageToSlug].sort((a, b) => a[0] - b[0])) {
  const images = await photosOnPage(page);
  if (images.length === 0) {
    console.warn(`p.${page} ${slug}: NO usable images`);
    continue;
  }
  projectImages[slug] = await writeJpegs(
    images,
    path.join(root, "public/images/projects", slug),
    `/images/projects/${slug}`,
  );
  console.log(
    `p.${page} ${slug}: ${images.length} image(s) [${images.map((i) => `${i.width}x${i.height}`).join(", ")}]`,
  );
}
await writeFile(
  path.join(root, "src/content/project-images.json"),
  JSON.stringify(projectImages, null, 2) + "\n",
);

// ---- Logo (p.43) -----------------------------------------------------------
const logo = (await extractImages(pdf, 43))
  .filter((i) => i.width >= 150 && channelsOf(i) >= 3)
  .sort((a, b) => b.width * b.height - a.width * a.height)[0];
if (logo) {
  await mkdir(path.join(root, "public/images/brand"), { recursive: true });
  await toSharp(logo).png().toFile(path.join(root, "public/images/brand/logo-profile.png"));
  console.log(`p.43 logo: ${logo.width}x${logo.height}`);
}

console.log(`Done: ${Object.keys(projectImages).length}/${pageToSlug.size} projects have images.`);
