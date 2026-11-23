import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Krishna Builder at Ring Road Mall, Rohini, New Delhi. Send an enquiry, call us, or reach the tender cell.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&output=embed`;
  return (
    <>
      <section className="on-dark bg-brand-ink py-20 sm:py-28">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="Contact"
            title="Let’s talk about your project"
            intro="Send an enquiry, call us, or write to our tender cell for bids and empanelment."
          />
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="mb-8 text-2xl font-extrabold text-brand-ink sm:text-3xl">Send an enquiry</h2>
            <EnquiryForm />
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <h2 className="mb-8 text-2xl font-extrabold text-brand-ink sm:text-3xl">Head office</h2>
            <address className="space-y-6 not-italic">
              <p className="flex gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold-deep" aria-hidden />
                <span>
                  {company.address.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </span>
              </p>
              <p className="flex gap-4">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-gold-deep" aria-hidden />
                <span className="flex flex-col">
                  {company.phones.map((p) => (
                    <a key={p.tel} href={`tel:${p.tel}`} className="min-h-8 hover:text-brand">
                      {p.label}
                    </a>
                  ))}
                </span>
              </p>
              <p className="flex gap-4">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-gold-deep" aria-hidden />
                <span className="flex flex-col">
                  <a href={`mailto:${company.emails.general}`} className="min-h-8 hover:text-brand">
                    {company.emails.general}
                  </a>
                  <a href={`mailto:${company.emails.proprietor}`} className="min-h-8 hover:text-brand">
                    {company.emails.proprietor}
                  </a>
                </span>
              </p>
            </address>

            <div className="mt-8 border-l-4 border-gold bg-muted p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">Tender cell</p>
              <a
                href={`mailto:${company.emails.tender}`}
                className="mt-2 block font-display text-lg font-bold text-brand hover:text-brand-ink"
              >
                {company.emails.tender}
              </a>
              <p className="mt-1 text-sm text-muted-foreground">For tenders, bids and empanelment.</p>
            </div>

            <a
              href={`https://wa.me/${company.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-brand hover:text-brand-ink"
            >
              <MessageCircle className="h-5 w-5" aria-hidden /> Message us on WhatsApp
            </a>
          </Reveal>
        </Container>
      </section>

      <section aria-label="Map">
        <iframe
          title="Krishna Builder head office on Google Maps"
          src={mapSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-96 w-full border-0 grayscale"
        />
      </section>
    </>
  );
}
