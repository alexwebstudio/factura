import { manifesto } from "@/content/site";
import { Heading } from "@/components/ui/Heading";
import { Mono } from "@/components/ui/Mono";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";

/** Смысловой якорь сайта: только типографика, много воздуха. */
export function Manifesto() {
  return (
    <SectionCard tone="surface" aria-labelledby="manifesto-title" className="lg:!py-32">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <Reveal self className="lg:col-span-2">
          <Mono className="!text-[13px] text-ink-muted">{manifesto.index}</Mono>
        </Reveal>
        <div className="lg:col-span-10">
          <Heading id="manifesto-title" lines={manifesto.lines} cascade />
          <Reveal delay={0.15} className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-10">
            <p data-reveal className="text-[17px] leading-relaxed lg:col-span-6 lg:col-start-3 lg:text-[19px]">
              {manifesto.text}
            </p>
            <p data-reveal className="t-caption text-ink-muted lg:col-span-6 lg:col-start-3">
              — {manifesto.signature}
            </p>
          </Reveal>
        </div>
      </div>
    </SectionCard>
  );
}
