"use client";

import { getImageProps } from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { hero, heroParams, site } from "@/content/site";
import { useLeadModal } from "@/components/forms/LeadModal";
import { buttonClass } from "@/components/ui/Button";
import { PillLabel } from "@/components/ui/PillLabel";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { Wordmark } from "./Wordmark";

const heroAlt = "Современный дом с тёмным навесным фасадом и древесными вставками среди сосен";

// Art direction: 16:9 на планшете и десктопе, вертикальный 4:5 — на телефоне.
const { props: desktopSrc } = getImageProps({
  src: hero.image.desktop,
  alt: heroAlt,
  width: 1920,
  height: 1080,
  quality: 75,
  sizes: "100vw",
});
const {
  props: { srcSet: mobileSrcSet, ...mobileImg },
} = getImageProps({
  src: hero.image.mobile,
  alt: heroAlt,
  width: 1080,
  height: 1350,
  quality: 75,
  sizes: "100vw",
  // Для <picture> с art direction документация Next 16 советует fetchPriority, а не preload
  loading: "eager",
  fetchPriority: "high",
});

/** Интро первого экрана — CSS-анимация со stagger .07 (не ждёт JS, не тормозит LCP). */
const inAt = (i: number) => ({ "--d": `${0.2 + i * 0.07}s` }) as CSSProperties;

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const { open } = useLeadModal();

  // Параллакс фото: scale 1.06 → 1 и лёгкий сдвиг по y при скролле
  useLayoutEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        media.current,
        { scale: 1.06, yPercent: 0 },
        {
          scale: 1,
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      data-hero="dark"
      aria-labelledby="hero-title"
      className="relative isolate h-[calc(100svh-24px)] min-h-[600px] overflow-hidden rounded-[var(--radius-section)] bg-espresso text-on-dark lg:h-[calc(100svh-32px)] lg:min-h-[680px]"
    >
      <div ref={media} className="absolute inset-0 -z-20 origin-center will-change-transform [transform:scale(1.06)] motion-reduce:[transform:none]">
        <picture>
          <source media="(min-width: 768px)" srcSet={desktopSrc.srcSet} sizes="100vw" />
          <source srcSet={mobileSrcSet} sizes="100vw" />
          <img {...mobileImg} alt={heroAlt} className="absolute inset-0 size-full object-cover" />
        </picture>
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            // Общее затемнение + усиленные градиенты сверху и снизу, чтобы светлый текст не сливался с фото
            "linear-gradient(to top, rgba(26,22,19,.72) 0%, rgba(26,22,19,.4) 34%, transparent 60%), linear-gradient(to bottom, rgba(26,22,19,.55) 0%, rgba(26,22,19,.12) 40%, transparent 60%), rgba(26,22,19,.22)",
        }}
      />

      <div className="container-x flex h-full flex-col justify-between px-[var(--section-pad-x)] pb-7 pt-[calc(var(--header-h)+32px)] lg:pb-8 lg:pt-[calc(var(--header-h)+40px)]">
        {/* Верх: штамп, подзаголовок, плашка */}
        <div className="flex max-w-[30rem] flex-col items-start gap-6 lg:gap-5">
          <div className="flex flex-col gap-4 lg:gap-5">
            <p className="anim-in t-mono !text-[12px] text-on-dark/70" style={inAt(0)}>
              {hero.stamp.join(" / ")}
            </p>
            {/* Без анимации: это LCP-элемент мобильного первого экрана */}
            <h1 id="hero-title" className="text-[16px] leading-[1.6] text-on-dark/90">
              <span className="sr-only">{site.name} — </span>
              {hero.subtitle}
            </h1>
          </div>
          <div className="anim-in" style={inAt(2)}>
            <PillLabel>{hero.pill}</PillLabel>
          </div>
        </div>

        {/* Низ: кнопки (до lg), вордмарк, строка параметров, плавающая карточка (xl) */}
        <div className="relative">
          {/* Телефон и планшет: основная кнопка + текстовая ссылка, в столбик — без «слипшихся» кнопок */}
          <div className="anim-in mb-9 flex flex-col items-start gap-4 lg:hidden" style={inAt(3)}>
            <button type="button" onClick={() => open("Герой")} aria-haspopup="dialog" className={buttonClass("light")}>
              {hero.primary}
            </button>
            <Link href="/projects" className="link-underline pb-0.5 text-[15px] font-medium text-on-dark">
              {hero.secondary} →
            </Link>
          </div>
          <div className="anim-in mb-5 hidden lg:flex xl:hidden" style={inAt(4)}>
            <Link href="/projects" className={buttonClass("ghost-dark")}>
              {hero.secondary}
            </Link>
          </div>

          <Wordmark text={site.name} delay={0.15} className="text-on-dark" />

          <ul
            aria-label="Коротко о компании"
            className="anim-in t-mono mt-5 flex flex-wrap gap-x-3 gap-y-2 !text-[12px] text-on-dark/85 sm:!text-[13px] lg:mt-6"
            style={inAt(6)}
          >
            {heroParams.map((p, i) => (
              <li key={p} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden className="text-on-dark/45">·</span>}
                {p}
              </li>
            ))}
          </ul>

          <div
            className={cn(
              "anim-in absolute bottom-[calc(100%-1.5rem)] right-0 hidden w-full max-w-[360px] rounded-[22px] bg-surface p-7 text-ink xl:block",
            )}
            style={inAt(7)}
          >
            <p className="text-[22px] font-medium leading-tight">{hero.card.title}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{hero.card.text}</p>
            <button
              type="button"
              onClick={() => open("Карточка в герое")}
              aria-haspopup="dialog"
              className="link-underline mt-6 pb-1 text-[15px] font-medium"
            >
              {hero.card.link}
            </button>
            <Link href="/projects" className="link-underline ml-6 pb-1 text-[15px] text-ink-muted">
              {hero.secondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
