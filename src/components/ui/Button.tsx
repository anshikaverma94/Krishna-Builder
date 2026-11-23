import Link from "next/link";

type Variant = "primary" | "gold" | "outline" | "outline-light";

const styles: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-ink",
  gold: "bg-gold text-brand-ink hover:bg-[#e6c872]",
  outline: "border border-brand text-brand hover:bg-brand hover:text-white",
  "outline-light": "border border-white/70 text-white hover:bg-white hover:text-brand-ink",
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

type Common = { variant?: Variant; className?: string; children: React.ReactNode };

export function Button({
  href,
  variant = "primary",
  className = "",
  children,
  ...rest
}: Common &
  (
    | ({ href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">)
    | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  )) {
  const cls = `${base} ${styles[variant]} ${className}`;
  if (href !== undefined) {
    // External / non-route links (tel:, mailto:, wa.me, PDF) use a plain anchor.
    if (/^(https?:|tel:|mailto:)/.test(href) || href.endsWith(".pdf")) {
      return (
        <a
          href={href}
          className={cls}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...(rest as object)}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
