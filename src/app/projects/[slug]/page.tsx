import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectImage } from "@/components/projects/ProjectImage";
import { getProject, getProjectImages, projects } from "@/content/projects";
import { formatDate, formatLakhs, formatCrore } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.shortTitle,
    description: `${project.title} Client: ${project.client}. Location: ${project.location}.`,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const images = getProjectImages(project.slug);
  const index = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const ongoing = project.status === "ongoing";

  // Only rows the profile actually provides are shown.
  const specs: [string, string][] = (
    [
      ["Location", project.location],
      ["Client", project.client],
      ["P.M.C.", project.pmc],
      ["Start date", project.startDate && formatDate(project.startDate)],
      ["Date of completion", project.completedOn && formatDate(project.completedOn)],
      [
        "Stipulated date of completion",
        project.stipulatedCompletion && formatDate(project.stipulatedCompletion),
      ],
      ["Likely date of completion", project.likelyCompletion && formatDate(project.likelyCompletion)],
      ["Built-up area", project.builtUpArea],
      ["Maximum height of any building", project.maxHeight],
      ["Maximum number of storeys", project.storeys],
      [ongoing ? "Contract value" : "Cost of work on completion", formatLakhs(project.valueLakhs)],
    ] as [string, string | undefined][]
  ).filter((row): row is [string, string] => Boolean(row[1]));

  return (
    <>
      <section className="border-b border-border bg-surface py-10 sm:py-14">
        <Container>
          <Link
            href="/projects"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand hover:text-brand-ink"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> All projects
          </Link>
          <Reveal>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span
                className={`rounded-sm px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                  ongoing ? "bg-gold text-brand-ink" : "bg-brand text-white"
                }`}
              >
                {project.status}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">
                {project.sector}
              </span>
            </div>
            <h1 className="mt-4 max-w-4xl text-3xl font-extrabold text-brand-ink sm:text-4xl lg:text-5xl">
              {project.shortTitle}
            </h1>
            <p className="mt-5 max-w-3xl text-base text-muted-foreground sm:text-lg">
              {project.title}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="grid gap-4">
              {images.length === 0 ? (
                <div className="relative aspect-[16/10] overflow-hidden">
                  <ProjectImage
                    alt={project.shortTitle}
                    label={`${project.sector} · photos to be supplied`}
                    sizes="(min-width: 1024px) 58vw, 100vw"
                  />
                </div>
              ) : (
                images.map((src, i) => {
                  const caption = project.imageCaptions?.[i];
                  return (
                    <figure key={src}>
                      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                        <ProjectImage
                          src={src}
                          alt={
                            caption
                              ? `${project.shortTitle} — ${caption}`
                              : `${project.shortTitle} — view ${i + 1}`
                          }
                          sizes="(min-width: 1024px) 58vw, 100vw"
                          priority={i === 0}
                          className={i === 0 ? "" : "object-center"}
                        />
                      </div>
                      {caption && (
                        <figcaption className="mt-2 text-sm font-semibold text-brand-ink">
                          {caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                })
              )}
            </div>
          </div>

          <aside className="lg:col-span-5" aria-label="Project details">
            <div className="border border-border bg-surface p-6 sm:p-8 lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">
                Project details
              </p>
              <p className="mt-2 font-display text-3xl font-extrabold text-brand">
                {formatCrore(project.valueLakhs)}
              </p>
              <dl className="mt-6 divide-y divide-border">
                {specs.map(([label, value]) => (
                  <div key={label} className="grid gap-1 py-3 sm:grid-cols-5 sm:gap-4">
                    <dt className="text-sm text-muted-foreground sm:col-span-2">{label}</dt>
                    <dd className="text-sm font-semibold text-brand-ink sm:col-span-3">{value}</dd>
                  </div>
                ))}
              </dl>
              <Button href="/contact" className="mt-6 w-full">
                Enquire about similar work
              </Button>
            </div>
          </aside>
        </Container>
      </section>

      <nav aria-label="More projects" className="border-t border-border">
        <Container className="grid sm:grid-cols-2">
          <Link
            href={`/projects/${prev.slug}`}
            className="group flex flex-col gap-1 border-b border-border py-8 sm:border-b-0 sm:border-r sm:pr-8"
          >
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <ArrowLeft className="h-4 w-4" aria-hidden /> Previous
            </span>
            <span className="font-display text-lg font-bold text-brand-ink group-hover:text-brand">
              {prev.shortTitle}
            </span>
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="group flex flex-col gap-1 py-8 sm:items-end sm:pl-8 sm:text-right"
          >
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Next <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
            <span className="font-display text-lg font-bold text-brand-ink group-hover:text-brand">
              {next.shortTitle}
            </span>
          </Link>
        </Container>
      </nav>
    </>
  );
}
