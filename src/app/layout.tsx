import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { company, siteUrl } from "@/content/company";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} — EPC Contractors & Developers, New Delhi`,
    template: `%s | ${company.name}`,
  },
  description:
    "Krishna Builder is an EPC contractor with 30+ years of experience delivering institutional, healthcare, residential and commercial projects across India.",
  openGraph: {
    type: "website",
    siteName: company.name,
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#4a2370",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: company.legalName,
  url: siteUrl,
  foundingDate: String(company.founded),
  telephone: company.phones.map((p) => `+${p.tel.replace("+", "")}`),
  email: company.emails.general,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.lines.slice(0, 2).join(", "),
    addressLocality: "Rohini, New Delhi",
    postalCode: company.address.postalCode,
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Providers>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
