"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export type TimelineEntry = {
  year: number;
  heading: string;
  items: { label: string; href?: string }[];
};

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <ol ref={ref} className="relative ml-3 border-l border-border pl-10 sm:ml-6 sm:pl-14">
      {/* Gold line that draws as you scroll */}
      <motion.span
        aria-hidden
        className="absolute -left-px top-0 h-full w-0.5 origin-top bg-gold"
        style={{ scaleY }}
      />
      {entries.map((e) => (
        <li key={e.year} className="relative pb-12 last:pb-0">
          <span
            aria-hidden
            className="absolute -left-[3.05rem] top-1.5 h-4 w-4 rounded-full border-2 border-gold bg-background sm:-left-[4.05rem]"
          />
          <p className="font-display text-3xl font-extrabold text-brand">{e.year}</p>
          <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-gold-deep">
            {e.heading}
          </p>
          <ul className="mt-3 space-y-1.5 text-foreground/85">
            {e.items.map((it) => (
              <li key={it.label}>
                {it.href ? (
                  <Link href={it.href} className="underline-offset-4 hover:text-brand hover:underline">
                    {it.label}
                  </Link>
                ) : (
                  it.label
                )}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
