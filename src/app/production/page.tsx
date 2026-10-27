import type { Metadata } from "next";
import Image from "next/image";
import { pages, production } from "@/content/pages";
import { regulations } from "@/content/regulations";
import { site } from "@/content/site";
import { WhatWeCalculate } from "@/components/home/WhatWeCalculate";
import { Counter } from "@/components/ui/Counter";
import { CtaBand } from "@/components/ui/CtaBand";
import { Heading } from "@/components/ui/Heading";
import { Mono } from "@/components/ui/Mono";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { buildMetadata } from "@/lib/seo";

const p = pages.production;

export const metadata: Metadata = buildMetadata({ title: p.title, description: p.description, path: "/production" });

const productionTerm = regulations.find((r) => r.index === "03")!.term;

const stats = [
  { value: site.facts.years.value, unit: site.facts.years.unit, label: "проектируем и производим" },
  { value: site.facts.projects.value, unit: "", label: "объектов на своих элементах" },
  { value: String(site.facts.warrantyYears), unit: "лет", label: "гарантия на монтаж" },
];

export default function ProductionPage() {
  return (
    <>
      <PageHero eyebrow={p.eyebrow} lines={p.lines} lead={p.lead} image={p.image} alt={p.alt} crumbs={[{ name: "Производство", path: "/production" }]} />

      <SectionCard tone="surface" aria-labelledby="workshop-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="t-eyebrow mb-5">{production.intro.eyebrow}</p>
            <Heading id="workshop-title" lines={production.intro.lines} cascade />
          </div>
          <Reveal className="flex flex-col gap-5 text-[17px] leading-relaxed lg:col-span-5 lg:col-start-8 lg:pt-12">
            {production.intro.text.map((t) => (
              <p key={t.slice(0, 20)} data-reveal>
                {t}
              </p>
            ))}
          </Reveal>
        </div>

        <Reveal as="ul" className="mt-14 grid gap-3 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-4">
          {stats.map((s) => (
            <li key={s.label} data-reveal="tilt" className="card flex min-h-[200px] flex-col justify-between bg-surface-2 p-6 lg:p-7">
              <p className="flex items-baseline gap-2">
                <Counter value={s.value} className="t-stat" />
                {s.unit && <span className="font-display text-[40px] font-[200] leading-none">{s.unit}</span>}
              </p>
              <p className="text-[15px] text-ink-muted">{s.label}</p>
            </li>
          ))}
          <li data-reveal="tilt" className="card flex min-h-[200px] flex-col justify-between bg-espresso p-6 text-on-dark lg:p-7">
            <Mono className="!text-[clamp(28px,3vw,40px)] leading-none">{productionTerm}</Mono>
            <p className="text-[15px] text-on-dark/80">срок изготовления элементов под объект</p>
          </li>
        </Reveal>
      </SectionCard>

      <Reveal as="div" className="grid gap-[var(--stack-gap)] md:grid-cols-3">
        {production.gallery.map((g) => (
          <div key={g.src} data-reveal="tilt" className="relative aspect-[3/2] overflow-hidden rounded-[var(--radius-section)] md:aspect-[4/5] lg:aspect-[3/2]">
            <Image src={g.src} alt={g.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
          </div>
        ))}
      </Reveal>

      <SectionCard tone="surface-2" aria-labelledby="cap-title">
        <SectionHeader id="cap-title" eyebrow={production.capabilities.eyebrow} lines={production.capabilities.lines} />
        <Reveal as="ul" className="mt-12 border-t border-line lg:mt-16">
          {production.capabilities.items.map((c, i) => (
            <li key={c.title} data-reveal className="grid gap-2 border-b border-line py-6 md:grid-cols-[80px_1fr_1.4fr] md:items-baseline md:gap-6 lg:py-7">
              <Mono className="!text-[13px] text-ink-muted">{String(i + 1).padStart(2, "0")}</Mono>
              <h3 className="t-h3">{c.title}</h3>
              <p className="text-[15px] text-ink-muted">{c.text}</p>
            </li>
          ))}
        </Reveal>
      </SectionCard>

      <WhatWeCalculate detailed />

      <SectionCard tone="surface" aria-labelledby="qc-title">
        <SectionHeader id="qc-title" eyebrow={production.quality.eyebrow} lines={production.quality.lines} />
        <Reveal as="ol" className="hair-grid mt-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {production.quality.steps.map((s, i) => (
            <li key={s.title} data-reveal className="flex min-h-[220px] flex-col gap-3 bg-surface py-8 sm:px-6 lg:px-7">
              <Mono className="!text-[13px] text-ink-muted">{String(i + 1).padStart(2, "0")}</Mono>
              <h3 className="t-h3 mt-auto">{s.title}</h3>
              <p className="text-[15px] text-ink-muted">{s.text}</p>
            </li>
          ))}
        </Reveal>
      </SectionCard>

      <CtaBand source="Страница производства" lines={["Сделаем фасад", "*под размер*"]} />
    </>
  );
}
