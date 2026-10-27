"use client";

import { useLayoutEffect, type RefObject } from "react";
import { EASE, gsap, prefersReducedMotion } from "@/lib/gsap";

export type RevealOptions = {
  /** Цели внутри контейнера. По умолчанию — `[data-reveal]`, либо сам контейнер. */
  selector?: string;
  stagger?: number;
  delay?: number;
  start?: string;
  duration?: number;
  /** Не анимировать (элемент появляется CSS-анимацией первого экрана). */
  disabled?: boolean;
};

/**
 * Появление по скроллу: opacity 0 → 1, y 28 → 0. Начальное состояние задаёт CSS
 * (`.js [data-reveal]`), поэтому здесь только `.to()`.
 *
 * Проигрывается один раз: `toggleActions: "play none none none"`. НЕ `once: true` — у ScrollTrigger
 * триггер с once, созданный уже ниже своей точки старта (перезагрузка посреди страницы), убивает себя
 * прямо в refresh и роняет страницу ошибкой «reading 'end'».
 */
export function useReveal(ref: RefObject<HTMLElement | null>, options: RevealOptions = {}) {
  const { selector = "[data-reveal]", stagger = 0.07, delay = 0, start = "top 82%", duration = 0.8, disabled } = options;

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || disabled) return;
    const found = Array.from(root.querySelectorAll<HTMLElement>(selector));
    const targets = found.length ? found : root.matches(selector) ? [root] : [];
    if (!targets.length) return;

    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1, transform: "none" });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay,
        scrollTrigger: { trigger: root, start, toggleActions: "play none none none" },
      });
      targets.forEach((el, i) => {
        const at = i * stagger;
        if (el.dataset.reveal === "tilt") {
          // 3D Tilt In (адаптация aw-flow «tilt-in»): подъём из наклона назад вокруг нижней грани,
          // перспектива 1200px, opacity за 60% длительности. В конце — явный transform: none:
          // если просто стереть inline-стиль, вернётся стартовый наклон из CSS и карточка «упадёт».
          tl.fromTo(
            el,
            { y: 60, rotationX: 35, transformPerspective: 1200, transformOrigin: "50% 100%" },
            {
              y: 0,
              rotationX: 0,
              duration: 1,
              ease: "expo.out",
              onComplete: () => {
                el.style.transform = "none";
              },
            },
            at,
          ).fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "none" }, at);
        } else {
          tl.to(el, { opacity: 1, y: 0, duration, ease: EASE }, at);
        }
      });
    }, root);
    return () => ctx.revert();
  }, [ref, selector, stagger, delay, start, duration, disabled]);
}
