"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import { PRELOADER_DONE_EVENT, PRELOADER_SAFETY } from "@/lib/preloader";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

/** Lenis, синхронизированный с тикером GSAP. При prefers-reduced-motion — нативный скролл. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    // lerp: чем меньше, тем дольше и мягче «доезжает» скролл. 0.075 — плавно, но без задержки отклика
    const instance = new Lenis({ lerp: 0.075, smoothWheel: true, anchors: { offset: -96 } });
    const tick = (time: number) => instance.raf(time * 1000);
    instance.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);

    // Пока висит прелоадер, страница не скроллится
    const html = document.documentElement;
    const resume = () => instance.start();
    if (html.classList.contains("is-loading")) {
      instance.stop();
      window.addEventListener(PRELOADER_DONE_EVENT, resume, { once: true });
      // Страховка инлайн-скрипта может снять is-loading без события
      window.setTimeout(resume, PRELOADER_SAFETY);
    }

    return () => {
      window.removeEventListener(PRELOADER_DONE_EVENT, resume);
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  // Смена роута: наверх (или к якорю) и пересчёт триггеров после отрисовки новой страницы.
  useEffect(() => {
    const hash = window.location.hash;
    const target = hash ? document.querySelector<HTMLElement>(decodeURIComponent(hash)) : null;
    if (target) lenis?.scrollTo(target, { immediate: true, offset: -96 });
    else lenis?.scrollTo(0, { immediate: true });
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [pathname, lenis]);

  // Шрифты меняют высоту блоков — пересчитываем триггеры после загрузки.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
