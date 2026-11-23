import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { company, nav } from "@/content/company";

export function Footer() {
  return (
    <footer className="on-dark bg-brand-ink text-white/80">
      <Container className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo variant="light" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">
            {company.nature}. Serving government and private clients across India since{" "}
            {company.founded}.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-2">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Explore
          </h2>
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-9 items-center text-sm transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-5">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Head office
          </h2>
          <address className="space-y-4 not-italic text-sm">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
              <span>{company.address.full}</span>
            </p>
            <p className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
              <span className="flex flex-col">
                {company.phones.map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`} className="hover:text-white">
                    {p.label}
                  </a>
                ))}
              </span>
            </p>
            <p className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
              <span className="flex flex-col">
                <a href={`mailto:${company.emails.general}`} className="hover:text-white">
                  {company.emails.general}
                </a>
                <a href={`mailto:${company.emails.tender}`} className="hover:text-white">
                  {company.emails.tender}{" "}
                  <span className="text-white/60">(tender cell)</span>
                </a>
              </span>
            </p>
          </address>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-white/60 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </p>
          <p>{company.type} · Est. {company.founded}</p>
        </Container>
      </div>
    </footer>
  );
}
