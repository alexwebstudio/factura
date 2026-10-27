"use client";

import { useState } from "react";
import { materials, materialsSection } from "@/content/materials";
import { LeadButton } from "@/components/forms/LeadButton";
import { MaterialCard } from "@/components/ui/MaterialCard";
import { QuestionCard } from "@/components/ui/QuestionCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { Button } from "@/components/ui/Button";
import { ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const FIRST = 3;

export function Materials() {
  const [expanded, setExpanded] = useState(false);
  const rest = materials.length - FIRST;

  return (
    <SectionCard tone="surface-2" aria-labelledby="materials-title">
      <SectionHeader
        id="materials-title"
        eyebrow={materialsSection.eyebrow}
        lines={materialsSection.lines}
        lead={materialsSection.lead}
        aside={
          <div className="flex flex-col items-start gap-5 lg:items-end">
            <LeadButton source="Подбор материала">{materialsSection.button}</LeadButton>
            <TextLink href="/materials">{materialsSection.hubLink}</TextLink>
          </div>
        }
      />

      {/* Один список: на телефоне — горизонтальный snap-скролл со всеми карточками,
          с планшета — сетка, первые три сразу, остальные по кнопке */}
      <Reveal
        as="ul"
        aria-label="Материалы"
        className="scrollbar-none -mx-[var(--section-pad-x)] mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--section-pad-x)] pb-2 sm:mx-0 sm:mt-14 sm:grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-10 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-16 lg:grid-cols-3"
      >
        {materials.map((m, i) => (
          <li
            key={m.slug}
            data-reveal={i < FIRST ? "tilt" : undefined}
            className={cn("w-[80%] shrink-0 snap-start sm:w-auto", !expanded && i >= FIRST && "sm:hidden")}
          >
            <MaterialCard material={m} />
          </li>
        ))}
        {!expanded && (
          <li className="-mt-2 hidden justify-center sm:col-span-2 sm:flex lg:col-span-3">
            <Button
              variant="ghost"
              onClick={() => {
                setExpanded(true);
                requestAnimationFrame(() => ScrollTrigger.refresh());
              }}
            >
              Показать ещё · {rest}
            </Button>
          </li>
        )}
        <li data-reveal="tilt" className="w-[80%] shrink-0 snap-start sm:col-span-2 sm:w-auto lg:col-span-3">
          <QuestionCard />
        </li>
      </Reveal>
    </SectionCard>
  );
}
