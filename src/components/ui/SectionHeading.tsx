import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "light",
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
}) {
  const dark = tone === "dark";
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <p
          className={`mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] ${
            dark ? "text-gold" : "text-gold-deep"
          } ${align === "center" ? "justify-center" : ""}`}
        >
          <span className="h-px w-8 bg-gold" aria-hidden />
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl font-extrabold sm:text-4xl lg:text-5xl ${
          dark ? "text-white" : "text-brand-ink"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${
            dark ? "text-white/80" : "text-muted-foreground"
          }`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
