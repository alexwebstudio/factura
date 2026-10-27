"use client";

import { useLayoutEffect, useRef } from "react";
import { regulations, regulationsSection } from "@/content/regulations";
import { Mono } from "@/components/ui/Mono";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** Таймлайн из пяти шагов: линия прочерчивается по скроллу (scrub). Сроки — моноширинным, сразу на виду. */
export function Regulations({ showLink = true, id }: { showLink?: boolean; id?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo("[data-line-x]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 55%", scrub: true } });
      });
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo("[data-line-y]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 60%", scrub: true } });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <SectionCard tone="surface" id={id} aria-labelledby="reg-title" className="scroll-mt-24">
      <SectionHeader
        id="reg-title"
        eyebrow={regulationsSection.eyebrow}
        lines={regulationsSection.lines}
        lead={regulationsSection.lead}
        aside={showLink ? <TextLink href="/about#process">{regulationsSection.hubLink}</TextLink> : undefined}
      />

      <div ref={root} className="relative mt-14 lg:mt-20">
        {/* Линии таймлайна */}
        <span aria-hidden className="absolute left-0 right-0 top-[27px] hidden h-px bg-line lg:block" />
        <span aria-hidden data-line-x className="absolute left-0 right-0 top-[27px] hidden h-px origin-left bg-espresso lg:block" />
        <span aria-hidden className="absolute bottom-6 left-[7px] top-2 w-px bg-line lg:hidden" />
        <span aria-hidden data-line-y className="absolute bottom-6 left-[7px] top-2 w-px origin-top bg-espresso lg:hidden" />

        <Reveal as="ol" className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
          {regulations.map((r) => (
            <li key={r.index} data-reveal className="relative flex flex-col items-start pl-10 lg:pl-0 lg:pr-4">
              <span aria-hidden className="absolute left-0 top-1.5 size-[15px] rounded-full border border-espresso bg-surface lg:hidden" />
              <Mono className="block !text-[40px] leading-none tracking-tight lg:!text-[48px]">
                <span className="lg:bg-surface lg:pr-3">{r.index}</span>
              </Mono>
              <h3 className="mt-5 text-[18px] font-medium lg:mt-8 lg:text-[19px]">{r.title}</h3>
              <p className="mb-4 mt-2 text-[14px] leading-relaxed text-ink-muted">{r.text}</p>
              <Mono className="inline-flex h-9 lg:mt-auto items-center rounded-full border border-line px-4 !text-[14px]">
                {r.term}
              </Mono>
            </li>
          ))}
        </Reveal>
      </div>
    </SectionCard>
  );
}
