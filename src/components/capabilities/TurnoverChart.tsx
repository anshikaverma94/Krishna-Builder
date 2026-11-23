"use client";

import { motion } from "motion/react";
import { financials } from "@/content/financials";

const MAX = 35000; // axis ceiling, as in the profile chart
const ticks = [0, 10000, 20000, 30000];
const nf = new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const nfInt = new Intl.NumberFormat("en-IN");

export function TurnoverChart() {
  return (
    <figure>
      <div
        role="img"
        aria-label={`Bar chart of annual turnover in INR lakhs: ${financials
          .map((f) => `${f.year} ${nf.format(f.lakhs)}${f.projected ? " (projected)" : ""}`)
          .join(", ")}.`}
        className="relative"
      >
        <div className="relative ml-14 h-72 sm:h-80">
          {/* Gridlines + axis labels */}
          {ticks.map((t) => (
            <div
              key={t}
              className="absolute inset-x-0 border-t border-border"
              style={{ bottom: `${(t / MAX) * 100}%` }}
            >
              <span className="absolute -left-14 -translate-y-1/2 text-xs text-muted-foreground">
                {nfInt.format(t)}
              </span>
            </div>
          ))}

          <div className="absolute inset-0 flex items-end justify-around gap-3 px-2 sm:gap-6">
            {financials.map((f, i) => (
              <div key={f.year} className="relative flex h-full flex-1 flex-col justify-end">
                <motion.div
                  className={`relative w-full ${
                    f.projected
                      ? "border-2 border-dashed border-brand bg-[repeating-linear-gradient(45deg,#e9dff3,#e9dff3_6px,#ffffff_6px,#ffffff_12px)]"
                      : "bg-brand"
                  }`}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${(f.lakhs / MAX) * 100}%` }}
                  viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold text-brand-ink sm:text-sm">
                    {nf.format(f.lakhs)}
                  </span>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <div className="ml-14 mt-3 flex justify-around gap-3 px-2 sm:gap-6">
          {financials.map((f) => (
            <div key={f.year} className="flex-1 text-center">
              <p className="text-xs font-semibold text-brand-ink sm:text-sm">{f.year}</p>
              {f.projected && (
                <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-gold-deep">
                  Projected
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-6 text-sm text-muted-foreground">
        Annual turnover, figures in INR Lakhs. 2026-27 is a projection.
      </figcaption>
    </figure>
  );
}
