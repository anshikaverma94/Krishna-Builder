import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/services/ServiceIcon";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Krishna Builder's eight operations: design build, civil infrastructure, structural steel, interiors, electrical, furniture, billing & measurement and project management.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="on-dark bg-brand-ink py-20 sm:py-28">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="Our operations"
            title="Full-spectrum construction solutions"
            intro="Internal and external infrastructure, waste water treatment facilities, interior works, IT and HVAC, with value engineering and precise architectural coordination on an efficient EPC basis."
          />
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <ol className="grid gap-px bg-border md:grid-cols-2">
            {services.map((s, i) => (
              <li key={s.slug} className="bg-surface">
                <Reveal delay={(i % 2) * 0.08} className="h-full">
                  <article className="flex h-full gap-6 p-8 sm:p-10">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-brand text-gold">
                      <ServiceIcon name={s.icon} className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <h2 className="mt-1 text-xl font-bold text-brand-ink">{s.title}</h2>
                      <p className="mt-3 leading-relaxed text-muted-foreground">{s.summary}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-muted py-16">
        <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <h2 className="max-w-xl text-2xl font-extrabold text-brand-ink sm:text-3xl">
            See these services applied on real projects.
          </h2>
          <Button href="/projects">View projects</Button>
        </Container>
      </section>
    </>
  );
}
