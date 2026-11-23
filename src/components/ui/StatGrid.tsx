import { CountUp } from "./CountUp";

type Stat = { value: number; suffix: string; label: string; description?: string };

// Full class names so Tailwind can see them.
const lgCols: Record<number, string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

export function StatGrid({
  stats,
  tone = "dark",
  showDescriptions = false,
}: {
  stats: readonly Stat[];
  tone?: "dark" | "light";
  showDescriptions?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <dl
      className={`grid grid-cols-2 gap-px ${showDescriptions ? "sm:grid-cols-2" : "sm:grid-cols-3"} ${
        lgCols[stats.length] ?? "lg:grid-cols-4"
      }`}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          className={`flex flex-col gap-2 px-5 py-8 ${dark ? "bg-brand" : "bg-surface"}`}
        >
          <dd className="order-1 font-display text-4xl font-extrabold sm:text-5xl">
            <CountUp
              value={s.value}
              suffix={s.suffix}
              className={dark ? "text-gold" : "text-brand"}
            />
          </dd>
          <dt className={`order-2 text-sm font-semibold ${dark ? "text-white" : "text-brand-ink"}`}>
            {s.label}
          </dt>
          {showDescriptions && s.description && (
            <p
              className={`order-3 text-sm leading-relaxed ${
                dark ? "text-white/80" : "text-muted-foreground"
              }`}
            >
              {s.description}
            </p>
          )}
        </div>
      ))}
    </dl>
  );
}
