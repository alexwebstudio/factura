"use client";

import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Гигантский вордмарк: буквы распределены от левого до правого края (flex justify-between),
 * при нехватке ширины кегль ужимается. Появление — по буквам, clip-path снизу вверх, stagger .05
 * (CSS-анимация: вордмарк на первом экране, ждать JS нельзя).
 */
export function Wordmark({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      el.style.fontSize = "";
      const letters = Array.from(el.children) as HTMLElement[];
      const natural = letters.reduce((sum, l) => sum + l.getBoundingClientRect().width, 0);
      // Минимальный воздух между буквами — 6% ширины, иначе ужимаем кегль. Нижняя граница 44px:
      // на телефоне 76px из шкалы ТЗ не помещаются (ФАКТУРА ≈ 395px), а Petale разрешён от 38px.
      const maxNatural = el.clientWidth * 0.94;
      if (natural > maxNatural) {
        const size = parseFloat(getComputedStyle(el).fontSize);
        el.style.fontSize = `${Math.max(44, size * (maxNatural / natural))}px`;
      }
    };

    // Пересчитываем только при смене ширины: смена кегля меняет высоту блока, и без этой проверки
    // ResizeObserver срабатывал на собственную правку — бесконечный цикл перерасчёта layout.
    let lastWidth = -1;
    const onResize = () => {
      const w = el.clientWidth;
      if (w === lastWidth) return;
      lastWidth = w;
      fit();
    };

    onResize();
    const ro = new ResizeObserver(onResize);
    ro.observe(el);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, []);

  return (
    <p ref={ref} aria-hidden className={cn("t-hero flex w-full justify-between", className)}>
      {Array.from(text).map((ch, i) => (
        <span key={i} className="anim-letter inline-block" style={{ "--d": `${delay + i * 0.05}s` } as CSSProperties}>
          {ch}
        </span>
      ))}
    </p>
  );
}
