"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import { useLenis } from "./SmoothScroll";

const MIN_THUMB = 40;
const IDLE_MS = 1200;

/**
 * Свой скроллбар акцентного цвета (--color-accent) — одинаковый на десктопе и телефоне,
 * где нативную полосу не покрасить. Нативная полоса скрыта в globals.css, прокрутка колесом,
 * клавиатурой и тачем работает как обычно; этот бегунок можно ещё и тянуть мышью.
 * Пока страница не скроллится, бегунок притушен (на тач-экранах — скрыт).
 */
export function CustomScrollbar() {
  const lenis = useLenis();
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const geom = useRef({ thumbH: 0, maxTop: 0, maxScroll: 0 });

  useEffect(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) return;
    let raf = 0;
    let idle: number | undefined;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const H = document.documentElement.scrollHeight;
      const maxScroll = H - vh;
      track.dataset.empty = String(maxScroll <= 1);
      if (maxScroll <= 1) return;
      const trackH = track.clientHeight;
      const thumbH = Math.max(MIN_THUMB, (trackH * vh) / H);
      const maxTop = trackH - thumbH;
      geom.current = { thumbH, maxTop, maxScroll };
      thumb.style.height = `${thumbH}px`;
      thumb.style.transform = `translate3d(0, ${(Math.min(window.scrollY, maxScroll) / maxScroll) * maxTop}px, 0)`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onScroll = () => {
      schedule();
      track.dataset.active = "true";
      window.clearTimeout(idle);
      idle = window.setTimeout(() => (track.dataset.active = "false"), IDLE_MS);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(document.body);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(idle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
    };
  }, []);

  const scrollTo = (y: number) => {
    if (lenis) lenis.scrollTo(y, { immediate: true });
    else window.scrollTo(0, y);
  };

  // Перетаскивание бегунка
  const onThumbDown = (e: PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const startY = e.clientY;
    const startScroll = window.scrollY;
    const { maxTop, maxScroll } = geom.current;
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);
    trackRef.current!.dataset.dragging = "true";
    const move = (ev: globalThis.PointerEvent) => {
      if (maxTop <= 0) return;
      scrollTo(startScroll + ((ev.clientY - startY) / maxTop) * maxScroll);
    };
    const up = () => {
      trackRef.current!.dataset.dragging = "false";
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
  };

  // Клик по дорожке — плавный переход к этому месту
  const onTrackDown = (e: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const { thumbH, maxTop, maxScroll } = geom.current;
    const ratio = Math.min(1, Math.max(0, (e.clientY - rect.top - thumbH / 2) / maxTop));
    if (lenis) lenis.scrollTo(ratio * maxScroll);
    else window.scrollTo({ top: ratio * maxScroll, behavior: "smooth" });
  };

  return (
    <div ref={trackRef} aria-hidden className="cscroll" data-active="false" onPointerDown={onTrackDown}>
      <div ref={thumbRef} className="cscroll__thumb" onPointerDown={onThumbDown} />
    </div>
  );
}
