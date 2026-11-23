import type { MetadataRoute } from "next";
import { nav, siteUrl } from "@/content/company";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = nav.map((n) => ({
    url: `${siteUrl}${n.href === "/" ? "" : n.href}`,
    priority: n.href === "/" ? 1 : 0.8,
  }));
  const projectPages = projects.map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    priority: 0.6,
  }));
  return [...pages, ...projectPages];
}
