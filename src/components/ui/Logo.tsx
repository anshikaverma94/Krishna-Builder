// Vector recreation of the Krishna Builder "KB" mark (gold frame + K).
// Replace with the client's official vector file when supplied.

type LogoProps = {
  /** "colour": purple K for light backgrounds. "light": white K for dark backgrounds. */
  variant?: "colour" | "light";
  withWordmark?: boolean;
  className?: string;
};

export function LogoMark({
  variant = "colour",
  className,
}: Pick<LogoProps, "variant" | "className">) {
  const k = variant === "light" ? "#ffffff" : "#4a2370";
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Krishna Builder"
    >
      <g fill="#d9b95e">
        <rect x="4" y="4" width="92" height="8" />
        <rect x="4" y="4" width="8" height="92" />
        <rect x="88" y="4" width="8" height="44" />
        <rect x="48" y="44" width="48" height="8" />
        <rect x="88" y="44" width="8" height="52" />
        <rect x="4" y="88" width="92" height="8" />
      </g>
      <g fill={k}>
        <rect x="22" y="24" width="10" height="52" />
        <polygon points="32,50 64,24 78,24 40,54" />
        <polygon points="40,46 78,76 64,76 32,56" />
      </g>
    </svg>
  );
}

export function Logo({ variant = "colour", withWordmark = true, className }: LogoProps) {
  const text = variant === "light" ? "text-white" : "text-brand";
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <LogoMark variant={variant} className="h-10 w-10 shrink-0" />
      {withWordmark && (
        <span
          className={`font-display text-lg font-extrabold uppercase leading-none tracking-wide ${text}`}
        >
          Krishna Builder
        </span>
      )}
    </span>
  );
}
