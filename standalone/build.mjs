// Builds ONE self-contained HTML file (vanilla HTML/CSS/JS, no framework, no server)
// from the Next.js project's own content files, images, fonts and design tokens.
//
//   npm install          (once - build-time tools only)
//   node build.mjs       -> krishna-builder.html
//   node build.mjs --no-pdf   skip embedding the 5 MB company-profile PDF
//
// What gets inlined:
//   - CSS: src/input.css compiled by Tailwind (the same classes the React app uses)
//   - Data: ../src/content/*.ts, imported directly, so text/figures can never drift
//   - Images: ../public/images/projects/**  (base64)
//   - Fonts: Inter + Manrope latin subsets (base64 woff2)
//   - Icons: lucide-static SVGs
//   - Favicon, company profile PDF (base64, decoded only when downloaded)

import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const noPdf = process.argv.includes("--no-pdf");
const out = join(here, "krishna-builder.html");
const tmp = join(here, ".build");

rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp, { recursive: true });

/* 1. CSS ---------------------------------------------------------------- */
const twBin = join(here, "node_modules", "@tailwindcss", "cli", "dist", "index.mjs");
execFileSync(process.execPath, [twBin, "-i", join(here, "src", "input.css"), "-o", join(tmp, "tw.css"), "--minify"], {
  cwd: here,
  stdio: "inherit",
});
const b64 = (file) => readFileSync(file).toString("base64");
const fontFaces =
  `@font-face{font-family:"Inter";font-style:normal;font-weight:100 900;font-display:swap;src:url(data:font/woff2;base64,${b64(join(here, "fonts", "inter-latin.woff2"))}) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}` +
  `@font-face{font-family:"Manrope";font-style:normal;font-weight:600 800;font-display:swap;src:url(data:font/woff2;base64,${b64(join(here, "fonts", "manrope-latin.woff2"))}) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}`;
const css = fontFaces + readFileSync(join(tmp, "tw.css"), "utf8");

/* 2. Content (imported straight from the app's TypeScript) -------------- */
const contentSrc = join(root, "src", "content");
const contentTmp = join(tmp, "content");
cpSync(contentSrc, contentTmp, { recursive: true });
const projectsTs = join(contentTmp, "projects.ts");
writeFileSync(
  projectsTs,
  readFileSync(projectsTs, "utf8").replace(
    'from "./project-images.json"',
    'from "./project-images.json" with { type: "json" }',
  ),
);
const load = (name) => import(pathToFileURL(join(contentTmp, name)).href);
const [companyMod, clientsMod, financialsMod, machineryMod, servicesMod, projectsMod] = await Promise.all([
  load("company.ts"), load("clients.ts"), load("financials.ts"), load("machinery.ts"), load("services.ts"), load("projects.ts"),
]);

const DATA = {
  company: companyMod.company,
  stats: companyMod.stats,
  particulars: companyMod.particulars,
  teamIntro: companyMod.teamIntro,
  about: companyMod.about,
  vision: companyMod.vision,
  leadership: companyMod.leadership,
  leadershipNote: companyMod.leadershipNote,
  workforceNote: companyMod.workforceNote,
  nav: companyMod.nav,
  clientNames: clientsMod.clientNames,
  clientStrip: clientsMod.clientStrip,
  financials: financialsMod.financials,
  machinery: machineryMod.machinery,
  services: servicesMod.services,
  projects: projectsMod.projects,
  sectors: projectsMod.sectors,
};

/* 3. Images -------------------------------------------------------------- */
const imageMap = JSON.parse(readFileSync(join(contentSrc, "project-images.json"), "utf8"));
const IMAGES = {};
let imageCount = 0;
for (const [slug, paths] of Object.entries(imageMap)) {
  IMAGES[slug] = paths.map((p) => {
    const file = join(root, "public", p);
    if (!existsSync(file)) throw new Error(`Missing image: ${file}`);
    imageCount++;
    return `data:image/jpeg;base64,${b64(file)}`;
  });
}

/* 4. Icons --------------------------------------------------------------- */
const iconDir = join(here, "node_modules", "lucide-static", "icons");
const iconNames = [
  "arrow-right", "arrow-left", "download", "circle-check", "map-pin", "phone", "mail", "message-circle",
  "loader-circle", "menu", "x", "pen-tool", "hard-hat", "construction", "armchair", "zap", "sofa", "ruler", "users",
];
const ICONS = Object.fromEntries(
  iconNames.map((n) => {
    const svg = readFileSync(join(iconDir, `${n}.svg`), "utf8");
    const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>[\s\S]*$/, "").replace(/<!--[\s\S]*?-->/g, "").trim();
    return [n, inner];
  }),
);

/* 5. JSON-LD, favicon, PDF ---------------------------------------------- */
const c = companyMod.company;
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: c.legalName,
  url: companyMod.siteUrl,
  foundingDate: String(c.founded),
  telephone: c.phones.map((p) => `+${p.tel.replace("+", "")}`),
  email: c.emails.general,
  address: {
    "@type": "PostalAddress",
    streetAddress: c.address.lines.slice(0, 2).join(", "),
    addressLocality: "Rohini, New Delhi",
    postalCode: c.address.postalCode,
    addressCountry: "IN",
  },
};
const favicon = `data:image/x-icon;base64,${b64(join(root, "src", "app", "favicon.ico"))}`;
const pdfFile = join(root, "public", "docs", "krishna-builder-profile.pdf");
const pdfScript =
  !noPdf && existsSync(pdfFile)
    ? `<script type="text/plain" id="profile-pdf-b64">${b64(pdfFile)}</script>`
    : "";

/* 6. Assemble ------------------------------------------------------------ */
// "<" is escaped inside JSON so a stray "</script>" in the data can never end the script early.
const safeJson = (v) => JSON.stringify(v).replace(/</g, "\\u003c");
const dataJs =
  `var DATA=${safeJson(DATA)};\nvar IMAGES=${safeJson(IMAGES)};\nvar ICONS=${safeJson(ICONS)};`;

// Function replacers: the payloads contain "$" sequences that String.replace would otherwise interpret.
const html = readFileSync(join(here, "src", "template.html"), "utf8")
  .replace("__FAVICON__", () => favicon)
  .replace("/*__CSS__*/", () => css)
  .replace("/*__JSONLD__*/", () => safeJson(jsonLd))
  .replace("__PDF_SCRIPT__", () => pdfScript)
  .replace("/*__DATA__*/", () => dataJs);

writeFileSync(out, html);
rmSync(tmp, { recursive: true, force: true });
const mb = (readFileSync(out).length / 1048576).toFixed(1);
console.log(`\nWrote ${out}\n  ${mb} MB · ${DATA.projects.length} projects · ${imageCount} images · PDF ${pdfScript ? "embedded" : "not embedded"}`);
