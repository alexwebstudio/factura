import { calculateSection, calculations } from "@/content/calculate";
import { Mono } from "@/components/ui/Mono";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";

/** Ядро отстройки: шесть расчётов, сетка на хэйрлайнах — как таблица в смете. */
export function WhatWeCalculate({ detailed = false }: { detailed?: boolean }) {
  return (
    <SectionCard tone="surface" id="calculate" aria-labelledby="calc-title" className="scroll-mt-24 lg:!py-28">
      <SectionHeader
        id="calc-title"
        eyebrow={calculateSection.eyebrow}
        lines={calculateSection.lines}
        lead={detailed ? undefined : calculateSection.lead}
        aside={detailed ? undefined : <TextLink href="/production#calculate">{calculateSection.hubLink}</TextLink>}
      />

      <Reveal as="ol" stagger={0.06} className="hair-grid mt-14 grid-cols-1 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
        {calculations.map((c) => (
          <li key={c.index} data-reveal className="flex min-h-[220px] flex-col gap-4 bg-surface py-8 md:px-6 lg:min-h-[260px] lg:px-8 lg:py-10 lg:first:pl-0 lg:[&:nth-child(3n+1)]:pl-0 lg:[&:nth-child(3n)]:pr-0 md:max-lg:[&:nth-child(odd)]:pl-0 md:max-lg:[&:nth-child(even)]:pr-0">
            <Mono className="!text-[13px] text-ink-muted">{c.index}</Mono>
            <h3 className="t-h3 mt-auto">{c.title}</h3>
            <p className="max-w-sm text-[14px] leading-relaxed text-ink-muted lg:text-[15px]">{c.text}</p>
            {detailed && <p className="max-w-md border-t border-line pt-4 text-[15px] leading-relaxed">{c.details}</p>}
          </li>
        ))}
      </Reveal>

      <Reveal self className="mt-10 lg:mt-14">
        <p className="text-[17px] font-medium">{calculateSection.conclusion}</p>
      </Reveal>
    </SectionCard>
  );
}
