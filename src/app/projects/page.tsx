import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectBrowser } from "@/components/projects/ProjectBrowser";
import { projects, sectors, withCover } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Completed and ongoing projects by Krishna Builder: universities, hospitals, residential townships and institutional buildings across India.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <section className="on-dark bg-brand-ink py-20 sm:py-24">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="Our work"
            title="Projects delivered and under construction"
            intro="Universities, hospitals, residential townships and institutional buildings for government departments and private developers across India."
          />
        </Container>
      </section>
      <section className="py-14 sm:py-20">
        <Container>
          <ProjectBrowser projects={projects.map(withCover)} sectors={sectors} />
        </Container>
      </section>
    </>
  );
}
