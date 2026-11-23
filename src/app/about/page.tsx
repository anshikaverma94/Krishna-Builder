import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatGrid } from "@/components/ui/StatGrid";
import { Timeline, type TimelineEntry } from "@/components/about/Timeline";
import {
  about,
  company,
  leadership,
  leadershipNote,
  particulars,
  stats,
  teamIntro,
  vision,
  workforceNote,
} from "@/content/company";
import { projects } from "@/content/projects";
import { yearOf } from "@/lib/format";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Krishna Builder began operations in 1996 and has grown into a premier EPC contractor serving NBCC, CPWD, IITs, IIMs and other government departments.",
  alternates: { canonical: "/about" },
};

// Only real dates from the profile: founding year + each completed project's completion year.
function buildTimeline(): TimelineEntry[] {
  const byYear = new Map<number, TimelineEntry["items"]>();
  for (const p of projects) {
    if (!p.completedOn) continue;
    const y = yearOf(p.completedOn);
    byYear.set(y, [...(byYear.get(y) ?? []), { label: p.shortTitle, href: `/projects/${p.slug}` }]);
  }
  return [
    {
      year: company.founded,
      heading: "Operations commence",
      items: [{ label: "M/s Krishna Builder begins operations as a building contractor." }],
    },
    ...[...byYear.entries()]
      .sort(([a], [b]) => a - b)
      .map(([year, items]) => ({ year, heading: "Projects completed", items })),
  ];
}

export default function AboutPage() {
  const timeline = buildTimeline();
  return (
    <>
      <section className="on-dark bg-brand-ink py-20 sm:py-28">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="About us"
            title="Thirty years of building across India"
            intro={about.paragraphs[1]}
          />
        </Container>
      </section>

      <section className="border-b border-border bg-surface py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Company profile" title="Krishna Builder at a glance" />
          <Reveal>
            <dl className="mt-10 divide-y divide-border border-y border-border">
              {particulars.map((row) => (
                <div key={row.label} className="grid gap-1 py-4 sm:grid-cols-12 sm:gap-6">
                  <dt className="text-sm font-semibold uppercase tracking-wider text-gold-deep sm:col-span-3">
                    {row.label}
                  </dt>
                  <dd className="text-foreground/90 sm:col-span-9">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Our story" title="Since 1996" />
          </div>
          <Reveal className="space-y-5 text-lg leading-relaxed text-foreground/85 lg:col-span-7">
            <p>{about.paragraphs[0]}</p>
            <p>{about.paragraphs[2]}</p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-muted py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Vision & strategy" title="How we deliver" />
          <ul className="mt-12 grid gap-px bg-border md:grid-cols-2">
            {vision.map((v, i) => (
              <li key={v} className={`bg-surface p-7 ${i === vision.length - 1 ? "md:col-span-2" : ""}`}>
                <Reveal className="flex gap-4">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-gold-deep" aria-hidden />
                  <p className="text-foreground/90">{v}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Leadership" title="Krishna Builder: Our Team" intro={teamIntro} />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {leadership.map((person, i) => (
              <li key={person.name}>
                <Reveal delay={i * 0.08} className="h-full">
                  <div className="h-full border border-border bg-surface p-8">
                    <div
                      aria-hidden
                      className="flex h-16 w-16 items-center justify-center bg-brand font-display text-xl font-extrabold text-gold"
                    >
                      {person.name
                        .replace("Mr. ", "")
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-brand-ink">{person.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-gold-deep">{person.role}</p>
                    {person.bio && (
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{person.bio}</p>
                    )}
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal>
            <p className="mt-10 max-w-4xl leading-relaxed text-muted-foreground">{leadershipNote}</p>
          </Reveal>
        </Container>
      </section>

      <section className="on-dark bg-brand-ink py-20 text-white sm:py-28">
        <Container>
          <SectionHeading tone="dark" eyebrow="Workforce" title="A team of 300+ professionals" intro={workforceNote} />
          <div className="mt-12">
            <StatGrid stats={stats.filter((s) => s.label !== "Years of experience")} showDescriptions />
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Our journey"
              title="Milestones"
              intro="Founding year and completed projects, as recorded in our business profile."
            />
          </div>
          <div className="lg:col-span-8">
            <Timeline entries={timeline} />
          </div>
        </Container>
      </section>
    </>
  );
}
