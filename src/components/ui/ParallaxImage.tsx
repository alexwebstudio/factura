"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** Фото, заполняющее родителя, с лёгким параллаксом при скролле. */
export function ParallaxImage({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  const wrap = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = wrap.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrap} className="absolute -inset-y-[6%] inset-x-0">
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}
