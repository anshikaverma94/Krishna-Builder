import Image from "next/image";
import { LogoMark } from "@/components/ui/Logo";

/**
 * Project photo, or a branded placeholder when no image has been supplied yet.
 * The parent must be `relative` and sized (aspect ratio); this fills it.
 */
export function ProjectImage({
  src,
  alt,
  label,
  sizes,
  priority = false,
  className = "",
}: {
  src?: string;
  alt: string;
  label?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={`${alt} (photo to be supplied)`}
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-brand-ink"
    >
      <LogoMark variant="light" className="h-14 w-14 opacity-90" />
      {label && (
        <span className="px-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
          {label}
        </span>
      )}
    </div>
  );
}
