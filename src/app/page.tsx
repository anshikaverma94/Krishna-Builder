import { existsSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatGrid } from "@/components/ui/StatGrid";
import { HeroSlideshow } from "@/components/home/HeroSlideshow";
import { ServiceIcon } from "@/components/services/ServiceIcon";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { about, company, stats } from "@/content/company";
import { services } from "@/content/services";
import { featuredProjects, getProject, getProjectImages, withCover } from "@/content/projects";
import { clientStrip } from "@/content/clients";

const PROFILE_PDF = "/docs/krishna-builder-profile.pdf";

// Hero: Krishna Builder's own project photos from the business profile (first photo of each project).
const heroSlugs = [
  "iim-nagpur-phase-2-3",
  "ravindra-bhawan-goa",
  "nit-delhi-admin-block",
  "science-academy-jajpur",
  "iiit-nagpur-campus",
];
const heroImages = heroSlugs.flatMap((slug) => {
  const src = getProjectImages(slug)[0];
  const project = getProject(slug);
  return src && project ? [{ src, alt: project.shortTitle }] : [];
});

export default function HomePage() {
  const hasProfile = existsSync(path.join(process.cwd(), "public", PROFILE_PDF));

  return (
    <>
      {/* Hero */}
      <section className="on-dark relative isolate overflow-hidden text-white">
        <HeroSlideshow images={heroImages} />
        <Container className="relative flex min-h-[82vh] flex-col justify-center py-24">
          <Reveal className="max-w-3xl [text-shadow:0_2px_16px_rgb(0_0_0/0.55)]">
            <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              <span className="h-px w-10 bg-gold" aria-hidden />
              EPC Contractors · Since {company.founded}
            </p>
            <h1 className="text-5xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl">
              Building dreams through <span className="text-gold">Construction</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85">
              Over 30 years delivering universities, hospitals, residential townships and
              institutional buildings for government and private clients across India.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/projects" variant="gold">
                View our projects <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/contact" variant="outline-light">
                Get in touch
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Stats */}
      <section aria-label="Krishna Builder at a glance" className="bg-brand-ink">
        <Container>
          <StatGrid stats={stats} />
        </Container>
      </section>

      {/* About teaser */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Who we are" title="A premier contractor, trusted since 1996" />
          </div>
          <Reveal className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-foreground/85">{about.paragraphs[1]}</p>
            <p className="mt-5 leading-relaxed text-muted-foreground">{about.paragraphs[0]}</p>
            <Link
              href="/about"
              className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-brand hover:text-brand-ink"
            >
              About Krishna Builder <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* Services */}
      <section className="bg-muted py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="Eight operations, one accountable contractor"
            intro="From design and civil works to electrical, interiors and project management, delivered on an efficient EPC basis."
          />
          <ul className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <li key={s.slug} className="bg-surface">
                <Reveal delay={(i % 4) * 0.06} className="h-full">
                  <Link
                    href="/services"
                    className="group flex h-full flex-col gap-4 p-7 transition-colors hover:bg-brand"
                  >
                    <ServiceIcon
                      name={s.icon}
                      className="h-7 w-7 text-brand group-hover:text-gold"
                    />
                    <h3 className="text-lg font-bold text-brand-ink group-hover:text-white">
                      {s.title}
                    </h3>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Featured projects */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Selected work" title="Featured projects" />
            <Link
              href="/projects"
              className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand hover:text-brand-ink"
            >
              All 30 projects <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={withCover(p)} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Clients */}
      <section className="border-y border-border bg-surface py-14">
        <Container>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Trusted by government departments and institutions
          </p>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {clientStrip.map((c) => (
              <li key={c} className="font-display text-xl font-extrabold text-brand/70">
                {c}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* CTA */}
      <section className="on-dark bg-brand py-20 text-white">
        <Container className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Planning a project? Let’s talk.
            </h2>
            <p className="mt-4 text-white/85">
              Send us your requirement or tender enquiry and our team will respond.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button href="/contact" variant="gold">
              Contact us
            </Button>
            {hasProfile && (
              <Button href={PROFILE_PDF} variant="outline-light" download>
                <Download className="h-4 w-4" aria-hidden /> Company profile (PDF)
              </Button>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
