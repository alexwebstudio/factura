import type { Metadata } from "next";
import { about, pages } from "@/content/pages";
import { Documents } from "@/components/home/Documents";
import { Faq } from "@/components/home/Faq";
import { Regulations } from "@/components/home/Regulations";
import { CtaBand } from "@/components/ui/CtaBand";
import { Heading } from "@/components/ui/Heading";
import { Mono } from "@/components/ui/Mono";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { buildMetadata } from "@/lib/seo";

const p = pages.about;

export const metadata: Metadata = buildMetadata({ title: p.title, description: p.description, path: "/about" });

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={p.eyebrow} lines={p.lines} lead={p.lead} image={p.image} alt={p.alt} crumbs={[{ name: "О компании", path: "/about" }]} />

      <SectionCard tone="surface" aria-labelledby="approach-title" className="lg:!py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="t-eyebrow mb-5">{about.intro.eyebrow}</p>
            <Heading id="approach-title" lines={about.intro.lines} cascade />
          </div>
          <Reveal className="flex flex-col gap-5 text-[17px] leading-relaxed lg:col-span-5 lg:col-start-8 lg:pt-12">
            {about.intro.text.map((t) => (
              <p key={t.slice(0, 20)} data-reveal>
                {t}
              </p>
            ))}
          </Reveal>
        </div>
      </SectionCard>

      <SectionCard tone="surface-2" id="advantages" aria-labelledby="adv-title" className="scroll-mt-24">
        <SectionHeader id="adv-title" eyebrow={about.advantages.eyebrow} lines={about.advantages.lines} />
        <Reveal as="ul" className="hair-grid mt-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {about.advantages.items.map((a, i) => (
            <li key={a.title} data-reveal className="flex min-h-[200px] flex-col gap-3 bg-surface-2 py-8 sm:px-6 lg:px-7">
              <Mono className="!text-[13px] text-ink-muted">{String(i + 1).padStart(2, "0")}</Mono>
              <h3 className="t-h3 mt-auto">{a.title}</h3>
              <p className="text-[15px] text-ink-muted">{a.text}</p>
            </li>
          ))}
        </Reveal>
      </SectionCard>

      <Regulations id="process" showLink={false} />
      <Documents id="documents" />
      <Faq />
      <CtaBand source="Страница о компании" />
    </>
  );
}
