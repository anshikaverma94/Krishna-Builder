"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Slow crossfade between building photos. With no photos supplied yet it shows a
 * calm architectural pattern instead, so the hero never looks broken.
 */
export function HeroSlideshow({ images }: { images: { src: string; alt: string }[] }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (images.length < 2 || reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 6500);
    return () => clearInterval(id);
  }, [images.length, reduce]);

  if (images.length === 0) {
    return (
      <div className="absolute inset-0 overflow-hidden bg-brand-ink" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="absolute -right-24 top-0 h-full w-1/2 -skew-x-12 bg-brand" />
        <div className="absolute -right-8 top-0 h-full w-24 -skew-x-12 bg-gold" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-brand-ink">
      <AnimatePresence initial={false}>
        <motion.div
          key={images[index].src}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.2 }, scale: { duration: 8, ease: "linear" } }}
        >
          <Image
            src={images[index].src}
            alt={images[index].alt}
            fill
            sizes="100vw"
            priority={index === 0}
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
      {/* Light left-edge fade only, so the headline stays legible while the photo stays fully visible. */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-brand-ink/60 via-brand-ink/15 to-transparent lg:via-transparent"
        aria-hidden
      />
    </div>
  );
}
