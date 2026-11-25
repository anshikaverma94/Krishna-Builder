import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Project } from "@/content/projects";
import { yearOf } from "@/lib/format";
import { ProjectImage } from "./ProjectImage";

export type ProjectCardData = Project & { image?: string };

export function ProjectCard({ project }: { project: ProjectCardData }) {
  const year = project.completedOn
    ? `Completed ${yearOf(project.completedOn)}`
    : project.stipulatedCompletion
      ? `Due ${yearOf(project.stipulatedCompletion)}`
      : null;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block h-full overflow-hidden rounded-sm border border-border bg-surface transition-colors hover:border-brand"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <ProjectImage
          src={project.image}
          alt={project.shortTitle}
          label={project.sector}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <span
          className={`absolute left-3 top-3 rounded-sm px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
            project.status === "ongoing"
              ? "bg-gold text-brand-ink"
              : "bg-white text-brand-ink"
          }`}
        >
          {project.status}
        </span>
      </div>
      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-deep">
          {project.sector}
        </p>
        <h3 className="mt-2 text-lg font-bold leading-snug text-brand-ink group-hover:text-brand">
          {project.shortTitle}
        </h3>
        <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {project.location}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm">
          {/* Visual button only: the whole card is already the link. */}
          <span className="inline-flex items-center gap-1.5 rounded-sm border border-brand px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
            View details
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
          {year && <span className="text-muted-foreground">{year}</span>}
        </div>
      </div>
    </Link>
  );
}
