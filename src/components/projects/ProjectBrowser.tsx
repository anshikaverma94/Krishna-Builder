"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import type { Sector } from "@/content/projects";
import { ProjectCard, type ProjectCardData } from "./ProjectCard";

type Status = "completed" | "ongoing";

export function ProjectBrowser({
  projects,
  sectors,
}: {
  projects: ProjectCardData[];
  sectors: Sector[];
}) {
  const [status, setStatus] = useState<Status>("completed");
  const [sector, setSector] = useState<Sector | "all">("all");
  const [state, setState] = useState<string>("all");

  const counts = useMemo(
    () => ({
      completed: projects.filter((p) => p.status === "completed").length,
      ongoing: projects.filter((p) => p.status === "ongoing").length,
    }),
    [projects],
  );

  const inTab = useMemo(() => projects.filter((p) => p.status === status), [projects, status]);
  const states = useMemo(() => [...new Set(inTab.map((p) => p.state))].sort(), [inTab]);

  const visible = useMemo(
    () =>
      inTab.filter(
        (p) => (sector === "all" || p.sector === sector) && (state === "all" || p.state === state),
      ),
    [inTab, sector, state],
  );

  function switchTab(next: Status) {
    setStatus(next);
    setSector("all");
    setState("all");
  }

  const tab = (id: Status, label: string) => (
    <button
      type="button"
      role="tab"
      id={`tab-${id}`}
      aria-selected={status === id}
      aria-controls="project-panel"
      onClick={() => switchTab(id)}
      className={`min-h-11 border-b-2 px-5 text-sm font-bold uppercase tracking-wider transition-colors ${
        status === id
          ? "border-gold text-brand"
          : "border-transparent text-muted-foreground hover:text-brand"
      }`}
    >
      {label} <span className="ml-1 text-muted-foreground">({counts[id]})</span>
    </button>
  );

  const chip = (value: Sector | "all", label: string) => (
    <button
      key={value}
      type="button"
      aria-pressed={sector === value}
      onClick={() => setSector(value)}
      className={`min-h-9 rounded-full border px-4 text-sm transition-colors ${
        sector === value
          ? "border-brand bg-brand text-white"
          : "border-border bg-surface text-foreground hover:border-brand"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <div role="tablist" aria-label="Project status" className="flex border-b border-border">
        {tab("completed", "Completed")}
        {tab("ongoing", "Ongoing")}
      </div>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by sector">
          {chip("all", "All sectors")}
          {sectors.map((s) => chip(s, s))}
        </div>
        <label className="flex items-center gap-3 text-sm">
          <span className="font-semibold text-brand-ink">State</span>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="min-h-11 rounded-sm border border-input bg-surface px-3 text-sm"
          >
            <option value="all">All states</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
        Showing {visible.length} of {inTab.length} {status} projects
      </p>

      <div
        id="project-panel"
        role="tabpanel"
        aria-labelledby={`tab-${status}`}
        className="mt-6"
      >
        {visible.length === 0 ? (
          <p className="border border-dashed border-border p-10 text-center text-muted-foreground">
            No projects match these filters.
          </p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((p) => (
                <motion.li
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ProjectCard project={p} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </div>
  );
}
