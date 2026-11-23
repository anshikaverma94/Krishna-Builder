# Third-party UI, fonts and assets

Record of everything adopted from outside the project (Master UI §9, §19).

## Packages (all MIT/Apache/OFL-style open source)
| Package | Use |
|---|---|
| next, react, react-dom | Framework |
| tailwindcss | Styling |
| motion | The only animation engine (`motion/react`) |
| lucide-react | The only icon family |
| react-hook-form, zod, @hookform/resolvers | Enquiry form + validation |
| resend | Enquiry email delivery |
| unpdf, sharp (dev) | One-off extraction of placeholder images from the business profile PDF |

## Fonts (self-hosted via `next/font/google`, SIL Open Font License)
- Inter (body) · Manrope (headings, weights 600/700/800)

## Images
| Asset | Source | Licence | Status |
|---|---|---|---|
| Project photos (48 images, all 30 projects) | Extracted from the client's Business Profile PDF with `node scripts/extract-pdf-images.mjs source/profile-large.pdf` | Client-owned | Resolution is whatever is embedded in the PDF (mostly 1000–1300px wide; a few are ~500–650px). Several are **architect renders, not site photos** (IIT Kharagpur, ESIC Kalol & Duburi, CCB Himachal, Ghaziabad Sports Complex, Alder Grove, Espace Premier, IDBI Goregaon). SVSU Package 18 reuses the SVSU Academic Blocks photos. IIS Kanpur photo 1 has a GPS-stamp overlay. Gole Market shows the building *before* restoration. Replace with the client's originals. |
| Hero slideshow | The first photo of five projects (IIM Nagpur, Ravindra Bhawan, NIT Delhi, Science Academy, IIIT Nagpur) | Client-owned | Same as above. Add licensed stock only if the client wants it, and never label it as a Krishna Builder project. |
| Profile PDF download | `public/docs/krishna-builder-profile.pdf` (copy of the client's profile) | Client-owned | Replace if a newer profile is issued. |
| KB logo | Vector recreation in `src/components/ui/Logo.tsx` | Client trademark | Replace with the client's official vector. |
| Client / PMC names | Text only (`src/content/clients.ts`) | n/a | Logos only with the client's permission. |
