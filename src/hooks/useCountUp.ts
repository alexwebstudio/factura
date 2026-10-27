"use client";

import { useLayoutEffect, type RefObject } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Набор числа при входе в экран, один раз. В разметке сразу стоит итоговое значение
 * («240+») — для SEO и на случай выключенного JS; анимация берёт из него число и суффикс.
 *
 * Меняем `nodeValue` текстового узла, который создал React, а не `textContent`:
 * textContent подменяет узел, и React падает с «insertBefore/removeChild: not a child of this node».
 */
export function useCountUp(ref: RefObject<HTMLElement | null>, value: string, duration = 1.4) {
  useLayoutEffect(() => {
    const el = ref.current;
    const text = el?.firstChild;
    if (!el || !text || text.nodeType !== Node.TEXT_NODE || prefersReducedMotion()) return;
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) return;
    const target = Number(match[1]);
    const suffix = match[2] ?? "";
    const counter = { n: 0 };

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        n: target,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
        onStart: () => {
          text.nodeValue = `0${suffix}`;
        },
        onUpdate: () => {
          text.nodeValue = `${Math.round(counter.n)}${suffix}`;
        },
      });
    });
    return () => {
      ctx.revert();
      text.nodeValue = value;
    };
  }, [ref, value, duration]);
}
