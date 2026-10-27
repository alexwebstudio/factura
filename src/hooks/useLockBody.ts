"use client";

import { useEffect } from "react";
import { useLenis } from "@/components/layout/SmoothScroll";

/** Блокирует прокрутку страницы (и Lenis) пока открыт оверлей. */
export function useLockBody(locked: boolean) {
  const lenis = useLenis();

  useEffect(() => {
    if (!locked) return;
    const html = document.documentElement;
    const scrollbar = window.innerWidth - html.clientWidth;
    const prev = { overflow: html.style.overflow, paddingRight: html.style.paddingRight };
    html.style.overflow = "hidden";
    if (scrollbar > 0) html.style.paddingRight = `${scrollbar}px`;
    lenis?.stop();
    return () => {
      html.style.overflow = prev.overflow;
      html.style.paddingRight = prev.paddingRight;
      lenis?.start();
    };
  }, [locked, lenis]);
}
