"use client";

import { useEffect, useState } from "react";

/** Страница прокручена дальше порога. */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > threshold);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [threshold]);

  return scrolled;
}

/**
 * Направление прокрутки для шапки: вниз (дальше `hideAfter`) — прятать, вверх — показывать.
 * `tolerance` гасит дрожание от инерции тачпада и Lenis.
 */
export function useHideOnScroll(hideAfter = 160, tolerance = 6) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - last;
      if (y <= hideAfter) setHidden(false);
      else if (delta > tolerance) setHidden(true);
      else if (delta < -tolerance) setHidden(false);
      if (Math.abs(delta) > tolerance || y <= hideAfter) last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hideAfter, tolerance]);

  return hidden;
}
